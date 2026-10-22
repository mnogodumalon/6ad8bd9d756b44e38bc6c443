import { lookupLabel } from '@/i18n';

// AUTOMATICALLY GENERATED TYPES - DO NOT EDIT

export type LookupValue = { key: string; label: string };
/** A raw record URL (applookup reference). NEVER render this directly
 *  in JSX — it is a URL, not a display value. Show the enriched `*Name`
 *  field or resolve it via the entity map instead. Assignable to/from
 *  string everywhere; the `& {}` keeps the alias NAME visible in tsc
 *  error messages (a plain primitive alias gets normalized away). */
export type RecordUrl = string & {};
export type GeoLocation = { lat: number; long: number; info?: string };

export type AttachmentType = 'file' | 'note' | 'url' | 'json';
export interface Attachment {
  id: string;
  type: AttachmentType;
  label: string | null;
  value: string | null;
  active: boolean;
  createdat?: string | null;
  updatedat?: string | null;
}

export interface AttachmentInput {
  type: AttachmentType;
  label?: string;
  value: string;
  active?: boolean;
}

export interface Kunden {
  record_id: string;
  /** The API field. */
  created_at: string;
  updated_at: string | null;
  /** Alias of created_at, filled by the read helpers. The API sends
   *  snake_case only — reading `createdat` off a raw record yields
   *  undefined, which type-checks and then crashes at runtime. */
  createdat: string;
  updatedat: string | null;
  fields: {
    firmenname?: string;
    kundentyp?: LookupValue;
    branche?: string;
    strasse?: string;
    hausnummer?: string;
    plz?: string;
    ort?: string;
    telefon?: string;
    email?: string;
    webseite?: string;
  };
}

export interface Kontakte {
  record_id: string;
  /** The API field. */
  created_at: string;
  updated_at: string | null;
  /** Alias of created_at, filled by the read helpers. The API sends
   *  snake_case only — reading `createdat` off a raw record yields
   *  undefined, which type-checks and then crashes at runtime. */
  createdat: string;
  updatedat: string | null;
  fields: {
    foto?: string;
    kunde?: RecordUrl; // applookup -> URL zu 'Kunden' Record
    vorname?: string;
    nachname?: string;
    position?: string;
    email?: string;
    telefon?: string;
    mobil?: string;
    ist_anwender?: boolean;
  };
}

export interface Veranstaltungen {
  record_id: string;
  /** The API field. */
  created_at: string;
  updated_at: string | null;
  /** Alias of created_at, filled by the read helpers. The API sends
   *  snake_case only — reading `createdat` off a raw record yields
   *  undefined, which type-checks and then crashes at runtime. */
  createdat: string;
  updatedat: string | null;
  fields: {
    titel?: string;
    termin?: string; // Format: YYYY-MM-DD oder ISO String
    ort?: string;
    beschreibung?: string;
    max_teilnehmer?: number;
    status?: LookupValue;
  };
}

export interface Kundenaktivitaeten {
  record_id: string;
  /** The API field. */
  created_at: string;
  updated_at: string | null;
  /** Alias of created_at, filled by the read helpers. The API sends
   *  snake_case only — reading `createdat` off a raw record yields
   *  undefined, which type-checks and then crashes at runtime. */
  createdat: string;
  updatedat: string | null;
  fields: {
    kunde?: RecordUrl; // applookup -> URL zu 'Kunden' Record
    kontakt?: RecordUrl; // applookup -> URL zu 'Kontakte' Record
    aktivitaetsart?: LookupValue;
    zeitpunkt?: string; // Format: YYYY-MM-DD oder ISO String
    betreff?: string;
    notizen?: string;
  };
}

export interface Pruefgeraete {
  record_id: string;
  /** The API field. */
  created_at: string;
  updated_at: string | null;
  /** Alias of created_at, filled by the read helpers. The API sends
   *  snake_case only — reading `createdat` off a raw record yields
   *  undefined, which type-checks and then crashes at runtime. */
  createdat: string;
  updatedat: string | null;
  fields: {
    bezeichnung?: string;
    hersteller?: string;
    typ?: string;
    seriennummer?: string;
    kunde?: RecordUrl; // applookup -> URL zu 'Kunden' Record
    kaufdatum?: string; // Format: YYYY-MM-DD oder ISO String
    preis?: number;
    zertifizierungsintervall?: number;
  };
}

export interface Geraetezertifizierungen {
  record_id: string;
  /** The API field. */
  created_at: string;
  updated_at: string | null;
  /** Alias of created_at, filled by the read helpers. The API sends
   *  snake_case only — reading `createdat` off a raw record yields
   *  undefined, which type-checks and then crashes at runtime. */
  createdat: string;
  updatedat: string | null;
  fields: {
    pruefgeraet?: RecordUrl; // applookup -> URL zu 'Pruefgeraete' Record
    pruefdatum?: string; // Format: YYYY-MM-DD oder ISO String
    ergebnis?: LookupValue;
    zertifikatsnummer?: string;
    zertifikat?: string;
    hinweise?: string;
  };
}

export interface Anmeldungen {
  record_id: string;
  /** The API field. */
  created_at: string;
  updated_at: string | null;
  /** Alias of created_at, filled by the read helpers. The API sends
   *  snake_case only — reading `createdat` off a raw record yields
   *  undefined, which type-checks and then crashes at runtime. */
  createdat: string;
  updatedat: string | null;
  fields: {
    teilnehmer_telefon?: string;
    firma?: string;
    bemerkung?: string;
    veranstaltung?: RecordUrl; // applookup -> URL zu 'Veranstaltungen' Record
    kontakt?: RecordUrl; // applookup -> URL zu 'Kontakte' Record
    teilnehmer_vorname?: string;
    teilnehmer_nachname?: string;
    teilnehmer_email?: string;
  };
}

export interface Anwenderzertifizierungen {
  record_id: string;
  /** The API field. */
  created_at: string;
  updated_at: string | null;
  /** Alias of created_at, filled by the read helpers. The API sends
   *  snake_case only — reading `createdat` off a raw record yields
   *  undefined, which type-checks and then crashes at runtime. */
  createdat: string;
  updatedat: string | null;
  fields: {
    anwender?: RecordUrl; // applookup -> URL zu 'Kontakte' Record
    schulungsart?: string;
    schulungsdatum?: string; // Format: YYYY-MM-DD oder ISO String
    ergebnis?: LookupValue;
    zertifikat?: string;
    gueltig_bis?: string; // Format: YYYY-MM-DD oder ISO String
  };
}

export const APP_IDS = {
  KUNDEN: '6ad8bd1def35950565ceee13',
  KONTAKTE: '6ad8bd3bcc73221019927010',
  VERANSTALTUNGEN: '6ad8bd499276de5ff978778f',
  KUNDENAKTIVITAETEN: '6ad8bd5c9c1927aa3dac4aed',
  PRUEFGERAETE: '6ad8bd41b0c4ef90873d2277',
  GERAETEZERTIFIZIERUNGEN: '6ad8bd6752e290cacf61b60c',
  ANMELDUNGEN: '6ad8bd529a435ee60774bcaf',
  ANWENDERZERTIFIZIERUNGEN: '6ad8bd67ea1c012882f5cab5',
} as const;


export const LOOKUP_OPTIONS: Record<string, Record<string, {key: string, label: string}[]>> = {
  'kunden': {
    kundentyp: [{ key: "interessent", get label() { return lookupLabel('kunden', 'kundentyp', "interessent") ?? "Interessent"; } }, { key: "kunde", get label() { return lookupLabel('kunden', 'kundentyp', "kunde") ?? "Kunde"; } }],
  },
  'veranstaltungen': {
    status: [{ key: "geplant", get label() { return lookupLabel('veranstaltungen', 'status', "geplant") ?? "Geplant"; } }, { key: "anmeldung_offen", get label() { return lookupLabel('veranstaltungen', 'status', "anmeldung_offen") ?? "Anmeldung offen"; } }, { key: "ausgebucht", get label() { return lookupLabel('veranstaltungen', 'status', "ausgebucht") ?? "Ausgebucht"; } }, { key: "durchgefuehrt", get label() { return lookupLabel('veranstaltungen', 'status', "durchgefuehrt") ?? "Durchgeführt"; } }, { key: "abgesagt", get label() { return lookupLabel('veranstaltungen', 'status', "abgesagt") ?? "Abgesagt"; } }],
  },
  'kundenaktivitaeten': {
    aktivitaetsart: [{ key: "anruf", get label() { return lookupLabel('kundenaktivitaeten', 'aktivitaetsart', "anruf") ?? "Anruf"; } }, { key: "besuch", get label() { return lookupLabel('kundenaktivitaeten', 'aktivitaetsart', "besuch") ?? "Besuch"; } }, { key: "angebot", get label() { return lookupLabel('kundenaktivitaeten', 'aktivitaetsart', "angebot") ?? "Angebot"; } }, { key: "folgetermin", get label() { return lookupLabel('kundenaktivitaeten', 'aktivitaetsart', "folgetermin") ?? "Folgetermin"; } }],
  },
  'geraetezertifizierungen': {
    ergebnis: [{ key: "bestanden", get label() { return lookupLabel('geraetezertifizierungen', 'ergebnis', "bestanden") ?? "Bestanden"; } }, { key: "bestanden_mit_auflagen", get label() { return lookupLabel('geraetezertifizierungen', 'ergebnis', "bestanden_mit_auflagen") ?? "Bestanden mit Auflagen"; } }, { key: "nicht_bestanden", get label() { return lookupLabel('geraetezertifizierungen', 'ergebnis', "nicht_bestanden") ?? "Nicht bestanden"; } }],
  },
  'anwenderzertifizierungen': {
    ergebnis: [{ key: "bestanden", get label() { return lookupLabel('anwenderzertifizierungen', 'ergebnis', "bestanden") ?? "Bestanden"; } }, { key: "nicht_bestanden", get label() { return lookupLabel('anwenderzertifizierungen', 'ergebnis', "nicht_bestanden") ?? "Nicht bestanden"; } }, { key: "teilgenommen", get label() { return lookupLabel('anwenderzertifizierungen', 'ergebnis', "teilgenommen") ?? "Teilgenommen"; } }],
  },
};

// Optimistic LookupValue writes: never re-type a label — resolve the schema
// option instead (its label is a locale-aware getter; falls back to the key).
// WRONG: status: { key: 'offen', label: 'Offen' }   (frozen in one language)
// RIGHT: status: lookupOption('<appKey>', 'status', 'offen')
export function lookupOption(app: string, field: string, key: string): LookupValue {
  return LOOKUP_OPTIONS[app]?.[field]?.find(o => o.key === key) ?? { key, label: key };
}

export const FIELD_TYPES: Record<string, Record<string, string>> = {
  'kunden': {
    'firmenname': 'string/text',
    'kundentyp': 'lookup/radio',
    'branche': 'string/text',
    'strasse': 'string/text',
    'hausnummer': 'string/text',
    'plz': 'string/text',
    'ort': 'string/text',
    'telefon': 'string/tel',
    'email': 'string/email',
    'webseite': 'string/url',
  },
  'kontakte': {
    'foto': 'file',
    'kunde': 'applookup/select',
    'vorname': 'string/text',
    'nachname': 'string/text',
    'position': 'string/text',
    'email': 'string/email',
    'telefon': 'string/tel',
    'mobil': 'string/tel',
    'ist_anwender': 'bool',
  },
  'veranstaltungen': {
    'titel': 'string/text',
    'termin': 'date/datetimeminute',
    'ort': 'string/text',
    'beschreibung': 'string/textarea',
    'max_teilnehmer': 'number',
    'status': 'lookup/select',
  },
  'kundenaktivitaeten': {
    'kunde': 'applookup/select',
    'kontakt': 'applookup/select',
    'aktivitaetsart': 'lookup/select',
    'zeitpunkt': 'date/datetimeminute',
    'betreff': 'string/text',
    'notizen': 'string/textarea',
  },
  'pruefgeraete': {
    'bezeichnung': 'string/text',
    'hersteller': 'string/text',
    'typ': 'string/text',
    'seriennummer': 'string/text',
    'kunde': 'applookup/select',
    'kaufdatum': 'date/date',
    'preis': 'number',
    'zertifizierungsintervall': 'number',
  },
  'geraetezertifizierungen': {
    'pruefgeraet': 'applookup/select',
    'pruefdatum': 'date/date',
    'ergebnis': 'lookup/select',
    'zertifikatsnummer': 'string/text',
    'zertifikat': 'file',
    'hinweise': 'string/textarea',
  },
  'anmeldungen': {
    'teilnehmer_telefon': 'string/tel',
    'firma': 'string/text',
    'bemerkung': 'string/textarea',
    'veranstaltung': 'applookup/select',
    'kontakt': 'applookup/select',
    'teilnehmer_vorname': 'string/text',
    'teilnehmer_nachname': 'string/text',
    'teilnehmer_email': 'string/email',
  },
  'anwenderzertifizierungen': {
    'anwender': 'applookup/select',
    'schulungsart': 'string/text',
    'schulungsdatum': 'date/date',
    'ergebnis': 'lookup/select',
    'zertifikat': 'file',
    'gueltig_bis': 'date/date',
  },
};

export const HUB_TOPOLOGY: Record<string, { field: string; entity: string }[]> = {
  'kunden': [
    { field: 'kunde', entity: 'kontakte' },
    { field: 'kunde', entity: 'kundenaktivitaeten' },
    { field: 'kunde', entity: 'pruefgeraete' },
  ],
  'kontakte': [
    { field: 'kontakt', entity: 'kundenaktivitaeten' },
    { field: 'kontakt', entity: 'anmeldungen' },
    { field: 'anwender', entity: 'anwenderzertifizierungen' },
  ],
};

type StripLookup<T> = {
  [K in keyof T]: T[K] extends LookupValue | undefined ? string | LookupValue | undefined
    : T[K] extends LookupValue[] | undefined ? string[] | LookupValue[] | undefined
    : T[K];
};

// Helper Types for creating new records (lookup fields as plain strings for API)
export type CreateKunden = StripLookup<Kunden['fields']>;
export type CreateKontakte = StripLookup<Kontakte['fields']>;
export type CreateVeranstaltungen = StripLookup<Veranstaltungen['fields']>;
export type CreateKundenaktivitaeten = StripLookup<Kundenaktivitaeten['fields']>;
export type CreatePruefgeraete = StripLookup<Pruefgeraete['fields']>;
export type CreateGeraetezertifizierungen = StripLookup<Geraetezertifizierungen['fields']>;
export type CreateAnmeldungen = StripLookup<Anmeldungen['fields']>;
export type CreateAnwenderzertifizierungen = StripLookup<Anwenderzertifizierungen['fields']>;