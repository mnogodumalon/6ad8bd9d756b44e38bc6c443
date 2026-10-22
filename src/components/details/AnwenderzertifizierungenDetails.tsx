import type { Anwenderzertifizierungen, Kontakte } from '@/types/app';
import { APP_IDS } from '@/types/app';
import { extractRecordId } from '@/services/livingAppsService';
import {
  RecordSection, RecordField, RecordRelation, RecordAttachments,
} from '@/components/widgets/RecordView';
import { t, appLabel, fieldLabel } from '@/i18n';
import { MediaThumbnail } from '@/components/widgets/MediaViewer';
import { usePermissions } from '@/lib/permissions';

export interface AnwenderzertifizierungenDetailsProps {
  /** Der Record — enriched oder roh; alle Felder werden hier gerendert. */
  record: Anwenderzertifizierungen;
  /** N:1-Ziel „Kontakte": volle Liste (Hook-Array) — der Block löst Name + Schlüsselfelder selbst auf. */
  kontakteList: Kontakte[];
  /** Klick auf die Kontakte-Relation → overlay.push auf dessen Detail. */
  onOpenKontakte?: (record: Kontakte) => void;
}

export function AnwenderzertifizierungenDetails({
  record,
  kontakteList,
  onOpenKontakte,
}: AnwenderzertifizierungenDetailsProps) {
  // attachments are a write to this record — read-only without the platform right
  const perms = usePermissions();
  const anwenderTarget = kontakteList.find(r => r.record_id === extractRecordId(record.fields.anwender));
  return (
    <>
      <RecordSection title={t('details')} cols={2}>
        <RecordField label={fieldLabel('anwenderzertifizierungen', 'schulungsart')} value={record.fields.schulungsart} format="text" />
        <RecordField label={fieldLabel('anwenderzertifizierungen', 'schulungsdatum')} value={record.fields.schulungsdatum} format="date" />
        <RecordField label={fieldLabel('anwenderzertifizierungen', 'ergebnis')} value={record.fields.ergebnis} format="pill" />
        <RecordField label={fieldLabel('anwenderzertifizierungen', 'zertifikat')} className="md:col-span-2">
          {record.fields.zertifikat ? (
            <MediaThumbnail src={record.fields.zertifikat as string} fit="contain" className="max-h-64 w-full rounded-lg" />
          ) : '—'}
        </RecordField>
        <RecordField label={fieldLabel('anwenderzertifizierungen', 'gueltig_bis')} value={record.fields.gueltig_bis} format="date" />
      </RecordSection>

      {/* N:1 — verknüpfte Records: IMMER klickbar, nie eine Text-Sackgasse. */}
      <RecordSection title={t('relations')} cols={1}>
        <RecordRelation
          label={fieldLabel('anwenderzertifizierungen', 'anwender')}
          name={anwenderTarget?.fields.vorname ?? '—'}
          meta={[anwenderTarget?.fields.email, anwenderTarget?.fields.telefon].filter(Boolean).join(' · ') || undefined}
          onClick={anwenderTarget && onOpenKontakte ? () => onOpenKontakte!(anwenderTarget!) : undefined}
        />
      </RecordSection>

      <RecordAttachments appId={APP_IDS.ANWENDERZERTIFIZIERUNGEN} recordId={record.record_id} readOnly={!perms.canWrite('anwenderzertifizierungen')} />
    </>
  );
}
