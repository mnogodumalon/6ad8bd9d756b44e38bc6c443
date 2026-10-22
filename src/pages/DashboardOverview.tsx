import { useMemo } from 'react';
import { addMonths, differenceInCalendarDays, format, parseISO, startOfDay } from 'date-fns';
import { IconCalendarEvent, IconPlus, IconTool, IconHistory, IconUsers } from '@tabler/icons-react';
import type { DashboardData } from '@/hooks/useDashboardData';
import { useEntityCrud } from '@/components/EntityCrud';
import { LivingAppsService, extractRecordId } from '@/services/livingAppsService';
import { lookupOption } from '@/types/app';
import { formatDate } from '@/lib/formatters';
import { dateFnsLocale, tx, appLabel } from '@/i18n';
import { useClock, gruss, namen, undoToast } from '@/lib/polish';
import { DashboardGrid } from '@/components/DashboardGrid';
import { WorkList } from '@/components/WorkList';
import { StatStrip, StatStripItem } from '@/components/StatCard';
import { Button } from '@/components/ui/button';
import { CalendarWidget, useCalendar, type CalendarEvent, type CalendarTone } from '@/components/widgets/CalendarWidget';

// layout: split — the calendar is the primary surface, the aside carries two different axes (devices / activities)

const NEXT_STATUS: Record<string, string> = {
  geplant: 'anmeldung_offen',
  anmeldung_offen: 'durchgefuehrt',
};

export default function DashboardOverview({ data }: { data: DashboardData }) {
  const { veranstaltungen, anmeldungen, pruefgeraete, geraetezertifizierungen, fetchAll } = data;
  const clock = useClock();
  const cal = useCalendar({ initialView: 'month' });

  const advanceEvent = async (id: string, from: string) => {
    const to = NEXT_STATUS[from];
    if (!to) return;
    try {
      await LivingAppsService.updateVeranstaltungenEntry(id, { status: to });
      undoToast(tx`Status auf „${lookupOption('veranstaltungen', 'status', to).label}“ gesetzt`, async () => {
        await LivingAppsService.updateVeranstaltungenEntry(id, { status: from });
        fetchAll();
      });
      fetchAll();
    } catch {
      fetchAll();
    }
  };

  const crud = useEntityCrud(data, {
    footer: (top) => {
      if (top.type !== 'veranstaltungen') return undefined;
      const s = top.record.fields.status?.key;
      if (!s || !NEXT_STATUS[s]) return undefined;
      return {
        label: s === 'geplant' ? tx('Anmeldung öffnen') : tx('Als durchgeführt markieren'),
        onClick: () => { void advanceEvent(top.record.record_id, s); },
      };
    },
  });
  const enrichedAktivitaeten = crud.enriched.kundenaktivitaeten;
  const enrichedAnmeldungen = crud.enriched.anmeldungen;

  const today = startOfDay(clock);
  const todayKey = format(clock, 'yyyy-MM-dd');

  const regCount = useMemo(() => {
    const m = new Map<string, number>();
    for (const a of anmeldungen) {
      const id = extractRecordId(a.fields.veranstaltung);
      if (id) m.set(id, (m.get(id) ?? 0) + 1);
    }
    return m;
  }, [anmeldungen]);

  const upcoming = useMemo(
    () =>
      veranstaltungen
        .filter(v => v.fields.termin && v.fields.termin.slice(0, 10) >= todayKey && v.fields.status?.key !== 'abgesagt')
        .sort((a, b) => (a.fields.termin ?? '').localeCompare(b.fields.termin ?? '')),
    [veranstaltungen, todayKey],
  );
  const upcomingRegs = upcoming.reduce((s, v) => s + (regCount.get(v.record_id) ?? 0), 0);

  const events = useMemo<CalendarEvent[]>(
    () =>
      veranstaltungen
        .filter(v => !!v.fields.termin)
        .map(v => {
          const n = regCount.get(v.record_id) ?? 0;
          const max = v.fields.max_teilnehmer;
          const key = v.fields.status?.key;
          const tone: CalendarTone =
            key === 'abgesagt' ? 'destructive' : key === 'ausgebucht' ? 'warning' : key === 'durchgefuehrt' ? 'default' : 'primary';
          return {
            id: `veranstaltungen:${v.record_id}`,
            start: v.fields.termin!,
            allDay: v.fields.termin!.length <= 10,
            title: v.fields.titel ?? '—',
            subtitle: max ? `${n}/${max}` : `${n}`,
            tone,
          };
        }),
    [veranstaltungen, regCount],
  );

  // Geräte: nächste Prüfung = letzte Prüfung (sonst Kaufdatum) + Intervall in Monaten
  const dueDevices = useMemo(() => {
    const last = new Map<string, string>();
    for (const z of geraetezertifizierungen) {
      const id = extractRecordId(z.fields.pruefgeraet);
      const d = z.fields.pruefdatum;
      if (id && d && (!last.has(id) || d > last.get(id)!)) last.set(id, d);
    }
    return crud.enriched.pruefgeraete
      .flatMap(g => {
        const base = last.get(g.record_id) ?? g.fields.kaufdatum;
        if (!base) return [];
        const due = addMonths(parseISO(base.slice(0, 10)), g.fields.zertifizierungsintervall ?? 12);
        return [{ g, due, days: differenceInCalendarDays(due, today), never: !last.has(g.record_id) }];
      })
      .filter(x => x.days <= 60)
      .sort((a, b) => a.days - b.days);
  }, [crud.enriched.pruefgeraete, geraetezertifizierungen, today]);
  const overdue = dueDevices.filter(d => d.days < 0);

  const recent = useMemo(
    () => [...enrichedAktivitaeten].sort((a, b) => (b.fields.zeitpunkt ?? b.createdat).localeCompare(a.fields.zeitpunkt ?? a.createdat)),
    [enrichedAktivitaeten],
  );

  const next = upcoming[0];
  const contextLine = next
    ? tx`Als Nächstes: „${next.fields.titel ?? ''}“ am ${formatDate(next.fields.termin)} mit ${regCount.get(next.record_id) ?? 0} Anmeldungen.`
    : overdue.length > 0
      ? tx`Prüfung überfällig: ${namen(overdue.map(d => d.g.fields.bezeichnung ?? ''))}.`
      : tx`Aktuell sind keine Veranstaltungen geplant.`;

  void enrichedAnmeldungen;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight">{gruss(clock)}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{contextLine}</p>
        </div>
        {crud.veranstaltungen.canWrite && (
          <Button onClick={() => crud.veranstaltungen.openCreate({ status: 'geplant' })}>
            <IconPlus size={16} className="shrink-0" />
            {tx('Neue Veranstaltung')}
          </Button>
        )}
      </div>

      <DashboardGrid
        variant="split"
        kpis={
          <StatStrip>
            <StatStripItem
              title={tx('Anstehende Veranstaltungen')}
              value={upcoming.length}
              icon={<IconCalendarEvent size={18} className="text-muted-foreground" />}
            />
            <StatStripItem
              title={tx('Anmeldungen dafür')}
              value={upcomingRegs}
              icon={<IconUsers size={18} className="text-muted-foreground" />}
            />
            <StatStripItem
              title={tx('Prüfung fällig (60 Tage)')}
              value={dueDevices.length}
              tone={overdue.length > 0 ? 'destructive' : 'default'}
              icon={<IconTool size={18} className="text-muted-foreground" />}
            />
          </StatStrip>
        }
        primary={
          <CalendarWidget
            events={events}
            view={cal.view}
            referenceDate={cal.cursor}
            locale={dateFnsLocale()}
            onViewChange={cal.setView}
            onCursorChange={cal.setCursor}
            onEventClick={ev => {
              const rec = veranstaltungen.find(v => v.record_id === ev.id.split(':')[1]);
              if (rec) crud.veranstaltungen.openDetail(rec);
            }}
            onEmptyClick={
              crud.veranstaltungen.canWrite
                ? date => crud.veranstaltungen.openCreate({ status: 'geplant', termin: format(date, "yyyy-MM-dd'T'HH:mm") })
                : undefined
            }
          />
        }
        aside={
          <>
            <WorkList
              title={tx('Prüfgeräte mit anstehender Zertifizierung')}
              icon={<IconTool size={14} />}
              items={dueDevices.map(({ g, due, days, never }) => ({
                id: g.record_id,
                title: g.fields.bezeichnung ?? g.fields.seriennummer ?? '—',
                secondLine: (
                  <>
                    <span className={days < 0 ? 'font-medium text-destructive' : 'font-medium text-amber-600'}>
                      {days < 0 ? tx('Überfällig') : tx('Bald fällig')}
                    </span>
                    <span className="text-muted-foreground">
                      {' · '}{g.kundeName ? `${g.kundeName} · ` : ''}{format(due, 'dd.MM.yyyy', { locale: dateFnsLocale() })}
                      {never ? ` · ${tx('noch nie geprüft')}` : ''}
                    </span>
                  </>
                ),
                action: crud.geraetezertifizierungen.canWrite
                  ? {
                      label: tx('Prüfung erfassen'),
                      onClick: () => crud.geraetezertifizierungen.openCreate({ pruefgeraet: g.record_id, pruefdatum: todayKey }),
                    }
                  : undefined,
              }))}
              onItemClick={id => {
                const rec = pruefgeraete.find(p => p.record_id === id);
                if (rec) crud.pruefgeraete.openDetail(rec);
              }}
              empty={{ text: tx('Keine Prüfung in den nächsten 60 Tagen fällig.') }}
            />
            <WorkList
              title={tx('Letzte Kundenaktivitäten')}
              icon={<IconHistory size={14} />}
              items={recent.map(a => ({
                id: a.record_id,
                title: a.fields.betreff ?? a.kundeName ?? '—',
                secondLine: (
                  <span className="text-muted-foreground">
                    <span className="font-medium text-foreground">{a.fields.aktivitaetsart?.label ?? appLabel('kundenaktivitaeten')}</span>
                    {' · '}{[a.kundeName, a.kontaktName].filter(Boolean).join(' / ')}
                    {a.fields.zeitpunkt ? ` · ${formatDate(a.fields.zeitpunkt)}` : ''}
                  </span>
                ),
              }))}
              max={5}
              onItemClick={id => {
                const rec = data.kundenaktivitaeten.find(r => r.record_id === id);
                if (rec) crud.kundenaktivitaeten.openDetail(rec);
              }}
              empty={{
                text: tx('Noch keine Aktivitäten erfasst.'),
                action: crud.kundenaktivitaeten.canWrite
                  ? { label: tx('Aktivität erfassen'), onClick: () => crud.kundenaktivitaeten.openCreate({}) }
                  : undefined,
              }}
            />
          </>
        }
      />
      {crud.surfaces}
    </div>
  );
}
