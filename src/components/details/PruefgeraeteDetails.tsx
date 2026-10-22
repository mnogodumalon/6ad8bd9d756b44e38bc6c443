import type { Pruefgeraete, Kunden, Geraetezertifizierungen } from '@/types/app';
import { APP_IDS } from '@/types/app';
import { extractRecordId } from '@/services/livingAppsService';
import {
  RecordSection, RecordField, RecordRelation, RecordAttachments,
} from '@/components/widgets/RecordView';
import { t, appLabel, fieldLabel } from '@/i18n';
import { SatelliteSection } from '@/components/SatelliteSection';
import { usePermissions } from '@/lib/permissions';

export interface PruefgeraeteDetailsProps {
  /** Der Record — enriched oder roh; alle Felder werden hier gerendert. */
  record: Pruefgeraete;
  /** N:1-Ziel „Kunden": volle Liste (Hook-Array) — der Block löst Name + Schlüsselfelder selbst auf. */
  kundenList: Kunden[];
  /** Klick auf die Kunden-Relation → overlay.push auf dessen Detail. */
  onOpenKunden?: (record: Kunden) => void;
  /** 1:N „Gerätezertifizierungen" (pruefgeraet): VOLLE Liste — der Block filtert auf diesen Record. */
  geraetezertifizierungenList: Geraetezertifizierungen[];
  /** Zeilen-Klick → overlay.push auf das Geraetezertifizierungen-Detail (nie der Edit-Dialog). */
  onOpenGeraetezertifizierungen: (record: Geraetezertifizierungen) => void;
  /** Kontextuelles „+": öffnet den Geraetezertifizierungen-Dialog mit diesem Record vorgesetzt. */
  onAddGeraetezertifizierungen?: () => void;
}

export function PruefgeraeteDetails({
  record,
  kundenList,
  onOpenKunden,
  geraetezertifizierungenList,
  onOpenGeraetezertifizierungen,
  onAddGeraetezertifizierungen,
}: PruefgeraeteDetailsProps) {
  // attachments are a write to this record — read-only without the platform right
  const perms = usePermissions();
  const kundeTarget = kundenList.find(r => r.record_id === extractRecordId(record.fields.kunde));
  return (
    <>
      <RecordSection title={t('details')} cols={2}>
        <RecordField label={fieldLabel('pruefgeraete', 'bezeichnung')} value={record.fields.bezeichnung} format="text" />
        <RecordField label={fieldLabel('pruefgeraete', 'hersteller')} value={record.fields.hersteller} format="text" />
        <RecordField label={fieldLabel('pruefgeraete', 'typ')} value={record.fields.typ} format="text" />
        <RecordField label={fieldLabel('pruefgeraete', 'seriennummer')} value={record.fields.seriennummer} format="text" />
        <RecordField label={fieldLabel('pruefgeraete', 'kaufdatum')} value={record.fields.kaufdatum} format="date" />
        <RecordField label={fieldLabel('pruefgeraete', 'preis')} value={record.fields.preis} format="text" />
        <RecordField label={fieldLabel('pruefgeraete', 'zertifizierungsintervall')} value={record.fields.zertifizierungsintervall} format="text" />
      </RecordSection>

      {/* N:1 — verknüpfte Records: IMMER klickbar, nie eine Text-Sackgasse. */}
      <RecordSection title={t('relations')} cols={1}>
        <RecordRelation
          label={fieldLabel('pruefgeraete', 'kunde')}
          name={kundeTarget?.fields.firmenname ?? '—'}
          meta={[kundeTarget?.fields.telefon, kundeTarget?.fields.email].filter(Boolean).join(' · ') || undefined}
          onClick={kundeTarget && onOpenKunden ? () => onOpenKunden!(kundeTarget!) : undefined}
        />
      </RecordSection>

      <SatelliteSection
        title={appLabel('geraetezertifizierungen')}
        items={geraetezertifizierungenList.filter(r => extractRecordId(r.fields.pruefgeraet) === record.record_id)}
        map={r => ({ name: r.fields.zertifikatsnummer ?? appLabel('geraetezertifizierungen'), meta: r.fields.pruefdatum })}
        onOpen={onOpenGeraetezertifizierungen}
        onAdd={onAddGeraetezertifizierungen}
        getKey={r => r.record_id}
      />

      <RecordAttachments appId={APP_IDS.PRUEFGERAETE} recordId={record.record_id} readOnly={!perms.canWrite('pruefgeraete')} />
    </>
  );
}
