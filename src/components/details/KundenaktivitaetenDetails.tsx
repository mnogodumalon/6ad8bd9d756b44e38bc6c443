import type { Kundenaktivitaeten, Kunden, Kontakte } from '@/types/app';
import { APP_IDS } from '@/types/app';
import { extractRecordId } from '@/services/livingAppsService';
import {
  RecordSection, RecordField, RecordRelation, RecordAttachments,
} from '@/components/widgets/RecordView';
import { t, appLabel, fieldLabel } from '@/i18n';
import { usePermissions } from '@/lib/permissions';

export interface KundenaktivitaetenDetailsProps {
  /** Der Record — enriched oder roh; alle Felder werden hier gerendert. */
  record: Kundenaktivitaeten;
  /** N:1-Ziel „Kunden": volle Liste (Hook-Array) — der Block löst Name + Schlüsselfelder selbst auf. */
  kundenList: Kunden[];
  /** Klick auf die Kunden-Relation → overlay.push auf dessen Detail. */
  onOpenKunden?: (record: Kunden) => void;
  /** N:1-Ziel „Kontakte": volle Liste (Hook-Array) — der Block löst Name + Schlüsselfelder selbst auf. */
  kontakteList: Kontakte[];
  /** Klick auf die Kontakte-Relation → overlay.push auf dessen Detail. */
  onOpenKontakte?: (record: Kontakte) => void;
}

export function KundenaktivitaetenDetails({
  record,
  kundenList,
  onOpenKunden,
  kontakteList,
  onOpenKontakte,
}: KundenaktivitaetenDetailsProps) {
  // attachments are a write to this record — read-only without the platform right
  const perms = usePermissions();
  const kundeTarget = kundenList.find(r => r.record_id === extractRecordId(record.fields.kunde));
  const kontaktTarget = kontakteList.find(r => r.record_id === extractRecordId(record.fields.kontakt));
  return (
    <>
      <RecordSection title={t('details')} cols={2}>
        <RecordField label={fieldLabel('kundenaktivitaeten', 'aktivitaetsart')} value={record.fields.aktivitaetsart} format="pill" />
        <RecordField label={fieldLabel('kundenaktivitaeten', 'zeitpunkt')} value={record.fields.zeitpunkt} format="datetime" />
        <RecordField label={fieldLabel('kundenaktivitaeten', 'betreff')} value={record.fields.betreff} format="text" />
        <RecordField label={fieldLabel('kundenaktivitaeten', 'notizen')} value={record.fields.notizen} format="longtext" className="md:col-span-2" />
      </RecordSection>

      {/* N:1 — verknüpfte Records: IMMER klickbar, nie eine Text-Sackgasse. */}
      <RecordSection title={t('relations')} cols={2}>
        <RecordRelation
          label={fieldLabel('kundenaktivitaeten', 'kunde')}
          name={kundeTarget?.fields.firmenname ?? '—'}
          meta={[kundeTarget?.fields.telefon, kundeTarget?.fields.email].filter(Boolean).join(' · ') || undefined}
          onClick={kundeTarget && onOpenKunden ? () => onOpenKunden!(kundeTarget!) : undefined}
        />
        <RecordRelation
          label={fieldLabel('kundenaktivitaeten', 'kontakt')}
          name={kontaktTarget?.fields.vorname ?? '—'}
          meta={[kontaktTarget?.fields.email, kontaktTarget?.fields.telefon].filter(Boolean).join(' · ') || undefined}
          onClick={kontaktTarget && onOpenKontakte ? () => onOpenKontakte!(kontaktTarget!) : undefined}
        />
      </RecordSection>

      <RecordAttachments appId={APP_IDS.KUNDENAKTIVITAETEN} recordId={record.record_id} readOnly={!perms.canWrite('kundenaktivitaeten')} />
    </>
  );
}
