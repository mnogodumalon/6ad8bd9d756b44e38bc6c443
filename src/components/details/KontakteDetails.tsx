import type { Kontakte, Kunden, Kundenaktivitaeten, Anmeldungen, Anwenderzertifizierungen } from '@/types/app';
import { APP_IDS } from '@/types/app';
import { extractRecordId } from '@/services/livingAppsService';
import {
  RecordSection, RecordField, RecordRelation, RecordAttachments,
} from '@/components/widgets/RecordView';
import { t, appLabel, fieldLabel } from '@/i18n';
import { MediaThumbnail } from '@/components/widgets/MediaViewer';
import { SatelliteSection } from '@/components/SatelliteSection';
import { usePermissions } from '@/lib/permissions';

export interface KontakteDetailsProps {
  /** Der Record — enriched oder roh; alle Felder werden hier gerendert. */
  record: Kontakte;
  /** N:1-Ziel „Kunden": volle Liste (Hook-Array) — der Block löst Name + Schlüsselfelder selbst auf. */
  kundenList: Kunden[];
  /** Klick auf die Kunden-Relation → overlay.push auf dessen Detail. */
  onOpenKunden?: (record: Kunden) => void;
  /** 1:N „Kundenaktivitäten" (kontakt): VOLLE Liste — der Block filtert auf diesen Record. */
  kundenaktivitaetenList: Kundenaktivitaeten[];
  /** Zeilen-Klick → overlay.push auf das Kundenaktivitaeten-Detail (nie der Edit-Dialog). */
  onOpenKundenaktivitaeten: (record: Kundenaktivitaeten) => void;
  /** Kontextuelles „+": öffnet den Kundenaktivitaeten-Dialog mit diesem Record vorgesetzt. */
  onAddKundenaktivitaeten?: () => void;
  /** 1:N „Anmeldungen" (kontakt): VOLLE Liste — der Block filtert auf diesen Record. */
  anmeldungenList: Anmeldungen[];
  /** Zeilen-Klick → overlay.push auf das Anmeldungen-Detail (nie der Edit-Dialog). */
  onOpenAnmeldungen: (record: Anmeldungen) => void;
  /** Kontextuelles „+": öffnet den Anmeldungen-Dialog mit diesem Record vorgesetzt. */
  onAddAnmeldungen?: () => void;
  /** 1:N „Anwenderzertifizierungen" (anwender): VOLLE Liste — der Block filtert auf diesen Record. */
  anwenderzertifizierungenList: Anwenderzertifizierungen[];
  /** Zeilen-Klick → overlay.push auf das Anwenderzertifizierungen-Detail (nie der Edit-Dialog). */
  onOpenAnwenderzertifizierungen: (record: Anwenderzertifizierungen) => void;
  /** Kontextuelles „+": öffnet den Anwenderzertifizierungen-Dialog mit diesem Record vorgesetzt. */
  onAddAnwenderzertifizierungen?: () => void;
}

export function KontakteDetails({
  record,
  kundenList,
  onOpenKunden,
  kundenaktivitaetenList,
  onOpenKundenaktivitaeten,
  onAddKundenaktivitaeten,
  anmeldungenList,
  onOpenAnmeldungen,
  onAddAnmeldungen,
  anwenderzertifizierungenList,
  onOpenAnwenderzertifizierungen,
  onAddAnwenderzertifizierungen,
}: KontakteDetailsProps) {
  // attachments are a write to this record — read-only without the platform right
  const perms = usePermissions();
  const kundeTarget = kundenList.find(r => r.record_id === extractRecordId(record.fields.kunde));
  return (
    <>
      <RecordSection title={t('details')} cols={2}>
        <RecordField label={fieldLabel('kontakte', 'foto')} className="md:col-span-2">
          {record.fields.foto ? (
            <MediaThumbnail src={record.fields.foto as string} fit="contain" className="max-h-64 w-full rounded-lg" />
          ) : '—'}
        </RecordField>
        <RecordField label={fieldLabel('kontakte', 'vorname')} value={record.fields.vorname} format="text" />
        <RecordField label={fieldLabel('kontakte', 'nachname')} value={record.fields.nachname} format="text" />
        <RecordField label={fieldLabel('kontakte', 'position')} value={record.fields.position} format="text" />
        <RecordField label={fieldLabel('kontakte', 'email')} value={record.fields.email} format="email" />
        <RecordField label={fieldLabel('kontakte', 'telefon')} value={record.fields.telefon} format="text" />
        <RecordField label={fieldLabel('kontakte', 'mobil')} value={record.fields.mobil} format="text" />
        <RecordField label={fieldLabel('kontakte', 'ist_anwender')} value={record.fields.ist_anwender} format="bool" />
      </RecordSection>

      {/* N:1 — verknüpfte Records: IMMER klickbar, nie eine Text-Sackgasse. */}
      <RecordSection title={t('relations')} cols={1}>
        <RecordRelation
          label={fieldLabel('kontakte', 'kunde')}
          name={kundeTarget?.fields.firmenname ?? '—'}
          meta={[kundeTarget?.fields.telefon, kundeTarget?.fields.email].filter(Boolean).join(' · ') || undefined}
          onClick={kundeTarget && onOpenKunden ? () => onOpenKunden!(kundeTarget!) : undefined}
        />
      </RecordSection>

      <SatelliteSection
        title={appLabel('kundenaktivitaeten')}
        items={kundenaktivitaetenList.filter(r => extractRecordId(r.fields.kontakt) === record.record_id)}
        map={r => ({ name: r.fields.betreff ?? appLabel('kundenaktivitaeten'), meta: r.fields.zeitpunkt })}
        onOpen={onOpenKundenaktivitaeten}
        onAdd={onAddKundenaktivitaeten}
        getKey={r => r.record_id}
      />

      <SatelliteSection
        title={appLabel('anmeldungen')}
        items={anmeldungenList.filter(r => extractRecordId(r.fields.kontakt) === record.record_id)}
        map={r => ({ name: r.fields.firma ?? appLabel('anmeldungen'), meta: undefined })}
        onOpen={onOpenAnmeldungen}
        onAdd={onAddAnmeldungen}
        getKey={r => r.record_id}
      />

      <SatelliteSection
        title={appLabel('anwenderzertifizierungen')}
        items={anwenderzertifizierungenList.filter(r => extractRecordId(r.fields.anwender) === record.record_id)}
        map={r => ({ name: r.fields.schulungsart ?? appLabel('anwenderzertifizierungen'), meta: r.fields.schulungsdatum })}
        onOpen={onOpenAnwenderzertifizierungen}
        onAdd={onAddAnwenderzertifizierungen}
        getKey={r => r.record_id}
      />

      <RecordAttachments appId={APP_IDS.KONTAKTE} recordId={record.record_id} readOnly={!perms.canWrite('kontakte')} />
    </>
  );
}
