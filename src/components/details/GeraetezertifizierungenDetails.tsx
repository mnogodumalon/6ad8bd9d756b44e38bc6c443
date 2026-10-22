import type { Geraetezertifizierungen, Pruefgeraete } from '@/types/app';
import { APP_IDS } from '@/types/app';
import { extractRecordId } from '@/services/livingAppsService';
import {
  RecordSection, RecordField, RecordRelation, RecordAttachments,
} from '@/components/widgets/RecordView';
import { t, appLabel, fieldLabel } from '@/i18n';
import { MediaThumbnail } from '@/components/widgets/MediaViewer';
import { usePermissions } from '@/lib/permissions';

export interface GeraetezertifizierungenDetailsProps {
  /** Der Record — enriched oder roh; alle Felder werden hier gerendert. */
  record: Geraetezertifizierungen;
  /** N:1-Ziel „Pruefgeraete": volle Liste (Hook-Array) — der Block löst Name + Schlüsselfelder selbst auf. */
  pruefgeraeteList: Pruefgeraete[];
  /** Klick auf die Pruefgeraete-Relation → overlay.push auf dessen Detail. */
  onOpenPruefgeraete?: (record: Pruefgeraete) => void;
}

export function GeraetezertifizierungenDetails({
  record,
  pruefgeraeteList,
  onOpenPruefgeraete,
}: GeraetezertifizierungenDetailsProps) {
  // attachments are a write to this record — read-only without the platform right
  const perms = usePermissions();
  const pruefgeraetTarget = pruefgeraeteList.find(r => r.record_id === extractRecordId(record.fields.pruefgeraet));
  return (
    <>
      <RecordSection title={t('details')} cols={2}>
        <RecordField label={fieldLabel('geraetezertifizierungen', 'pruefdatum')} value={record.fields.pruefdatum} format="date" />
        <RecordField label={fieldLabel('geraetezertifizierungen', 'ergebnis')} value={record.fields.ergebnis} format="pill" />
        <RecordField label={fieldLabel('geraetezertifizierungen', 'zertifikatsnummer')} value={record.fields.zertifikatsnummer} format="text" />
        <RecordField label={fieldLabel('geraetezertifizierungen', 'zertifikat')} className="md:col-span-2">
          {record.fields.zertifikat ? (
            <MediaThumbnail src={record.fields.zertifikat as string} fit="contain" className="max-h-64 w-full rounded-lg" />
          ) : '—'}
        </RecordField>
        <RecordField label={fieldLabel('geraetezertifizierungen', 'hinweise')} value={record.fields.hinweise} format="longtext" className="md:col-span-2" />
      </RecordSection>

      {/* N:1 — verknüpfte Records: IMMER klickbar, nie eine Text-Sackgasse. */}
      <RecordSection title={t('relations')} cols={1}>
        <RecordRelation
          label={fieldLabel('geraetezertifizierungen', 'pruefgeraet')}
          name={pruefgeraetTarget?.fields.bezeichnung ?? '—'}
          meta={[pruefgeraetTarget?.fields.hersteller, pruefgeraetTarget?.fields.typ].filter(Boolean).join(' · ') || undefined}
          onClick={pruefgeraetTarget && onOpenPruefgeraete ? () => onOpenPruefgeraete!(pruefgeraetTarget!) : undefined}
        />
      </RecordSection>

      <RecordAttachments appId={APP_IDS.GERAETEZERTIFIZIERUNGEN} recordId={record.record_id} readOnly={!perms.canWrite('geraetezertifizierungen')} />
    </>
  );
}
