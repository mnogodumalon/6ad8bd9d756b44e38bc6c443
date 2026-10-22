/**
 * Field rules — GENERATED from the app metadata. Do not edit.
 *
 * The mechanical truth about every field: what kind it is, whether the
 * platform's base view marks it required, which lookup keys exist, where an
 * applookup points, what the label is. `useStepForm` validates against these
 * rules and phrases its messages with the real labels; `toWirePayload` uses
 * them to shape the create payload; `SHAPES` tells a page which input FORM
 * fits the data (a date pair wants a calendar, not two fields) — it is a
 * signal, not a gate.
 */
import { appLabel, fieldLabel, lookupLabel } from '@/i18n';
import { policyLabel } from './policy';
import { LOOKUP_OPTIONS } from '@/types/app';

export type EntityKey = 'kunden' | 'kontakte' | 'veranstaltungen' | 'kundenaktivitaeten' | 'pruefgeraete' | 'geraetezertifizierungen' | 'anmeldungen' | 'anwenderzertifizierungen';

/** The text fields of each entity — what a search may run over (generated;
 *  `never` for an entity without text of its own, e.g. a link table). */
export interface StringFields {
  "kunden": "firmenname" | "branche" | "strasse" | "hausnummer" | "plz" | "ort" | "telefon" | "email" | "webseite";
  "kontakte": "vorname" | "nachname" | "position" | "email" | "telefon" | "mobil";
  "veranstaltungen": "titel" | "ort" | "beschreibung";
  "kundenaktivitaeten": "betreff" | "notizen";
  "pruefgeraete": "bezeichnung" | "hersteller" | "typ" | "seriennummer";
  "geraetezertifizierungen": "zertifikatsnummer" | "hinweise";
  "anmeldungen": "teilnehmer_telefon" | "firma" | "bemerkung" | "teilnehmer_vorname" | "teilnehmer_nachname" | "teilnehmer_email";
  "anwenderzertifizierungen": "schulungsart";
}
export type StringFieldKey<E extends EntityKey> = E extends keyof StringFields ? StringFields[E] : never;

/** The applookup fields of each entity (generated). A pick stored through
 *  `form.set` on one of these must carry its display name — at compile time
 *  (`StepForm.set`), because the review would otherwise show the id. */
export interface RecordFields {
  "kunden": never;
  "kontakte": "kunde";
  "veranstaltungen": never;
  "kundenaktivitaeten": "kunde" | "kontakt";
  "pruefgeraete": "kunde";
  "geraetezertifizierungen": "pruefgeraet";
  "anmeldungen": "veranstaltung" | "kontakt";
  "anwenderzertifizierungen": "anwender";
}
export type RecordFieldKey<E extends EntityKey> = E extends keyof RecordFields ? RecordFields[E] : never;

export type FieldKind =
  | 'text'
  | 'textarea'
  | 'email'
  | 'tel'
  | 'url'
  | 'number'
  | 'bool'
  | 'date'
  | 'datetime'
  | 'lookup'
  | 'multilookup'
  | 'record'
  | 'multirecord'
  | 'file'
  | 'geo';

export interface FieldRule {
  key: string;
  fulltype: string;
  kind: FieldKind;
  /** From the app's base view. A public page may override this per field. */
  required: boolean;
  /** Build-time label — `labelOf()` prefers the runtime i18n bundle. */
  label: string;
  /** Whether a journey may write it (`file` is upload-only, never via a journey). */
  writable: boolean;
  maxLength?: number;
  /** lookup / multilookup: the ONLY valid write values. */
  options?: string[];
  /** record / multirecord: the target app (always) and its entity key (when inside this appgroup). */
  targetAppId?: string;
  targetEntity?: EntityKey;
  format?: 'currency';
  /** HTML autocomplete token derived from the field name (given-name, email, tel, …). */
  autoComplete?: string;
}

export interface EntityInfo {
  key: EntityKey;
  appId: string;
  label: string;
  /** PascalCase plural — `get<pascal>()` on the service. */
  pascal: string;
  /** The single-record suffix — `create<single>()` on the service. */
  single: string;
}

/** Input-form signals per entity: which data shape each field (pair) has.
 *  `range`  — two date fields that form a stay/period → AvailabilityRangePicker
 *  `choice` — a lookup with few options → ChoiceGroup pills instead of a select
 *  `record` — an applookup → EntitySelectStep with search, never a raw id field
 *  `stock`  — a quantity that has a stock/capacity counterpart → show it, warn on overshoot */
export type Shape =
  | { kind: 'range'; from: string; to: string }
  | { kind: 'choice'; field: string; count: number }
  | { kind: 'record'; field: string; targetEntity?: EntityKey }
  | { kind: 'stock'; field: string };

export const ENTITIES: Record<EntityKey, EntityInfo> = {
  "kunden": {
    "key": "kunden",
    "appId": "6ad8bd1def35950565ceee13",
    "label": "Kunden",
    "pascal": "Kunden",
    "single": "KundenEntry"
  },
  "kontakte": {
    "key": "kontakte",
    "appId": "6ad8bd3bcc73221019927010",
    "label": "Kontakte",
    "pascal": "Kontakte",
    "single": "KontakteEntry"
  },
  "veranstaltungen": {
    "key": "veranstaltungen",
    "appId": "6ad8bd499276de5ff978778f",
    "label": "Veranstaltungen",
    "pascal": "Veranstaltungen",
    "single": "VeranstaltungenEntry"
  },
  "kundenaktivitaeten": {
    "key": "kundenaktivitaeten",
    "appId": "6ad8bd5c9c1927aa3dac4aed",
    "label": "Kundenaktivitäten",
    "pascal": "Kundenaktivitaeten",
    "single": "KundenaktivitaetenEntry"
  },
  "pruefgeraete": {
    "key": "pruefgeraete",
    "appId": "6ad8bd41b0c4ef90873d2277",
    "label": "Prüfgeräte",
    "pascal": "Pruefgeraete",
    "single": "PruefgeraeteEntry"
  },
  "geraetezertifizierungen": {
    "key": "geraetezertifizierungen",
    "appId": "6ad8bd6752e290cacf61b60c",
    "label": "Gerätezertifizierungen",
    "pascal": "Geraetezertifizierungen",
    "single": "GeraetezertifizierungenEntry"
  },
  "anmeldungen": {
    "key": "anmeldungen",
    "appId": "6ad8bd529a435ee60774bcaf",
    "label": "Anmeldungen",
    "pascal": "Anmeldungen",
    "single": "AnmeldungenEntry"
  },
  "anwenderzertifizierungen": {
    "key": "anwenderzertifizierungen",
    "appId": "6ad8bd67ea1c012882f5cab5",
    "label": "Anwenderzertifizierungen",
    "pascal": "Anwenderzertifizierungen",
    "single": "AnwenderzertifizierungenEntry"
  }
};

export const FIELD_RULES: Record<EntityKey, Record<string, FieldRule>> = {
  "kunden": {
    "firmenname": {
      "key": "firmenname",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Firmenname",
      "writable": true,
      "maxLength": 4000
    },
    "kundentyp": {
      "key": "kundentyp",
      "fulltype": "lookup/radio",
      "kind": "lookup",
      "required": false,
      "label": "Kundentyp",
      "writable": true,
      "options": [
        "interessent",
        "kunde"
      ]
    },
    "branche": {
      "key": "branche",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Branche",
      "writable": true,
      "maxLength": 4000
    },
    "strasse": {
      "key": "strasse",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Straße",
      "writable": true,
      "maxLength": 4000,
      "autoComplete": "address-line1"
    },
    "hausnummer": {
      "key": "hausnummer",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Hausnummer",
      "writable": true,
      "maxLength": 4000
    },
    "plz": {
      "key": "plz",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Postleitzahl",
      "writable": true,
      "maxLength": 4000,
      "autoComplete": "postal-code"
    },
    "ort": {
      "key": "ort",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Ort",
      "writable": true,
      "maxLength": 4000,
      "autoComplete": "address-level2"
    },
    "telefon": {
      "key": "telefon",
      "fulltype": "string/tel",
      "kind": "tel",
      "required": false,
      "label": "Telefon",
      "writable": true,
      "autoComplete": "tel"
    },
    "email": {
      "key": "email",
      "fulltype": "string/email",
      "kind": "email",
      "required": false,
      "label": "E-Mail",
      "writable": true,
      "autoComplete": "email"
    },
    "webseite": {
      "key": "webseite",
      "fulltype": "string/url",
      "kind": "url",
      "required": false,
      "label": "Webseite",
      "writable": true,
      "autoComplete": "url"
    }
  },
  "kontakte": {
    "foto": {
      "key": "foto",
      "fulltype": "file",
      "kind": "file",
      "required": false,
      "label": "Foto",
      "writable": false
    },
    "kunde": {
      "key": "kunde",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": true,
      "label": "Kunde",
      "writable": true,
      "targetAppId": "6ad8bd1def35950565ceee13",
      "targetEntity": "kunden"
    },
    "vorname": {
      "key": "vorname",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Vorname",
      "writable": true,
      "maxLength": 4000,
      "autoComplete": "given-name"
    },
    "nachname": {
      "key": "nachname",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Nachname",
      "writable": true,
      "maxLength": 4000,
      "autoComplete": "family-name"
    },
    "position": {
      "key": "position",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Position",
      "writable": true,
      "maxLength": 4000
    },
    "email": {
      "key": "email",
      "fulltype": "string/email",
      "kind": "email",
      "required": false,
      "label": "E-Mail",
      "writable": true,
      "autoComplete": "email"
    },
    "telefon": {
      "key": "telefon",
      "fulltype": "string/tel",
      "kind": "tel",
      "required": false,
      "label": "Telefon",
      "writable": true,
      "autoComplete": "tel"
    },
    "mobil": {
      "key": "mobil",
      "fulltype": "string/tel",
      "kind": "tel",
      "required": false,
      "label": "Mobilnummer",
      "writable": true,
      "autoComplete": "tel"
    },
    "ist_anwender": {
      "key": "ist_anwender",
      "fulltype": "bool",
      "kind": "bool",
      "required": false,
      "label": "Anwender von Prüfgeräten",
      "writable": true
    }
  },
  "veranstaltungen": {
    "titel": {
      "key": "titel",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Titel",
      "writable": true,
      "maxLength": 4000
    },
    "termin": {
      "key": "termin",
      "fulltype": "date/datetimeminute",
      "kind": "datetime",
      "required": true,
      "label": "Termin",
      "writable": true
    },
    "ort": {
      "key": "ort",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Ort",
      "writable": true,
      "maxLength": 4000,
      "autoComplete": "address-level2"
    },
    "beschreibung": {
      "key": "beschreibung",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Beschreibung",
      "writable": true
    },
    "max_teilnehmer": {
      "key": "max_teilnehmer",
      "fulltype": "number",
      "kind": "number",
      "required": false,
      "label": "Maximale Teilnehmerzahl",
      "writable": true
    },
    "status": {
      "key": "status",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Status",
      "writable": true,
      "options": [
        "geplant",
        "anmeldung_offen",
        "ausgebucht",
        "durchgefuehrt",
        "abgesagt"
      ]
    }
  },
  "kundenaktivitaeten": {
    "kunde": {
      "key": "kunde",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": true,
      "label": "Kunde",
      "writable": true,
      "targetAppId": "6ad8bd1def35950565ceee13",
      "targetEntity": "kunden"
    },
    "kontakt": {
      "key": "kontakt",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": false,
      "label": "Kontakt",
      "writable": true,
      "targetAppId": "6ad8bd3bcc73221019927010",
      "targetEntity": "kontakte"
    },
    "aktivitaetsart": {
      "key": "aktivitaetsart",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": true,
      "label": "Art der Aktivität",
      "writable": true,
      "options": [
        "anruf",
        "besuch",
        "angebot",
        "folgetermin"
      ]
    },
    "zeitpunkt": {
      "key": "zeitpunkt",
      "fulltype": "date/datetimeminute",
      "kind": "datetime",
      "required": false,
      "label": "Datum und Uhrzeit",
      "writable": true
    },
    "betreff": {
      "key": "betreff",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Betreff",
      "writable": true,
      "maxLength": 4000
    },
    "notizen": {
      "key": "notizen",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Notizen",
      "writable": true
    }
  },
  "pruefgeraete": {
    "bezeichnung": {
      "key": "bezeichnung",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Bezeichnung",
      "writable": true,
      "maxLength": 4000
    },
    "hersteller": {
      "key": "hersteller",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Hersteller",
      "writable": true,
      "maxLength": 4000
    },
    "typ": {
      "key": "typ",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Typ",
      "writable": true,
      "maxLength": 4000
    },
    "seriennummer": {
      "key": "seriennummer",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Seriennummer",
      "writable": true,
      "maxLength": 4000
    },
    "kunde": {
      "key": "kunde",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": false,
      "label": "Kunde",
      "writable": true,
      "targetAppId": "6ad8bd1def35950565ceee13",
      "targetEntity": "kunden"
    },
    "kaufdatum": {
      "key": "kaufdatum",
      "fulltype": "date/date",
      "kind": "date",
      "required": false,
      "label": "Kaufdatum",
      "writable": true
    },
    "preis": {
      "key": "preis",
      "fulltype": "number",
      "kind": "number",
      "required": false,
      "label": "Preis in Euro",
      "writable": true,
      "format": "currency"
    },
    "zertifizierungsintervall": {
      "key": "zertifizierungsintervall",
      "fulltype": "number",
      "kind": "number",
      "required": false,
      "label": "Zertifizierungsintervall in Monaten",
      "writable": true
    }
  },
  "geraetezertifizierungen": {
    "pruefgeraet": {
      "key": "pruefgeraet",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": true,
      "label": "Prüfgerät",
      "writable": true,
      "targetAppId": "6ad8bd41b0c4ef90873d2277",
      "targetEntity": "pruefgeraete"
    },
    "pruefdatum": {
      "key": "pruefdatum",
      "fulltype": "date/date",
      "kind": "date",
      "required": true,
      "label": "Prüfdatum",
      "writable": true
    },
    "ergebnis": {
      "key": "ergebnis",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Ergebnis",
      "writable": true,
      "options": [
        "bestanden",
        "bestanden_mit_auflagen",
        "nicht_bestanden"
      ]
    },
    "zertifikatsnummer": {
      "key": "zertifikatsnummer",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Zertifikatsnummer",
      "writable": true,
      "maxLength": 4000
    },
    "zertifikat": {
      "key": "zertifikat",
      "fulltype": "file",
      "kind": "file",
      "required": false,
      "label": "Zertifikat",
      "writable": false
    },
    "hinweise": {
      "key": "hinweise",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Besondere Hinweise",
      "writable": true
    }
  },
  "anmeldungen": {
    "teilnehmer_telefon": {
      "key": "teilnehmer_telefon",
      "fulltype": "string/tel",
      "kind": "tel",
      "required": false,
      "label": "Telefon",
      "writable": true,
      "autoComplete": "tel"
    },
    "firma": {
      "key": "firma",
      "fulltype": "string/text",
      "kind": "text",
      "required": false,
      "label": "Firma",
      "writable": true,
      "maxLength": 4000,
      "autoComplete": "organization"
    },
    "bemerkung": {
      "key": "bemerkung",
      "fulltype": "string/textarea",
      "kind": "textarea",
      "required": false,
      "label": "Bemerkung",
      "writable": true
    },
    "veranstaltung": {
      "key": "veranstaltung",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": true,
      "label": "Veranstaltung",
      "writable": true,
      "targetAppId": "6ad8bd499276de5ff978778f",
      "targetEntity": "veranstaltungen"
    },
    "kontakt": {
      "key": "kontakt",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": false,
      "label": "Bestehender Kontakt",
      "writable": true,
      "targetAppId": "6ad8bd3bcc73221019927010",
      "targetEntity": "kontakte"
    },
    "teilnehmer_vorname": {
      "key": "teilnehmer_vorname",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Vorname",
      "writable": true,
      "maxLength": 4000,
      "autoComplete": "given-name"
    },
    "teilnehmer_nachname": {
      "key": "teilnehmer_nachname",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Nachname",
      "writable": true,
      "maxLength": 4000,
      "autoComplete": "family-name"
    },
    "teilnehmer_email": {
      "key": "teilnehmer_email",
      "fulltype": "string/email",
      "kind": "email",
      "required": true,
      "label": "E-Mail",
      "writable": true,
      "autoComplete": "email"
    }
  },
  "anwenderzertifizierungen": {
    "anwender": {
      "key": "anwender",
      "fulltype": "applookup/select",
      "kind": "record",
      "required": true,
      "label": "Anwender",
      "writable": true,
      "targetAppId": "6ad8bd3bcc73221019927010",
      "targetEntity": "kontakte"
    },
    "schulungsart": {
      "key": "schulungsart",
      "fulltype": "string/text",
      "kind": "text",
      "required": true,
      "label": "Schulungsart",
      "writable": true,
      "maxLength": 4000
    },
    "schulungsdatum": {
      "key": "schulungsdatum",
      "fulltype": "date/date",
      "kind": "date",
      "required": true,
      "label": "Datum",
      "writable": true
    },
    "ergebnis": {
      "key": "ergebnis",
      "fulltype": "lookup/select",
      "kind": "lookup",
      "required": false,
      "label": "Ergebnis",
      "writable": true,
      "options": [
        "bestanden",
        "nicht_bestanden",
        "teilgenommen"
      ]
    },
    "zertifikat": {
      "key": "zertifikat",
      "fulltype": "file",
      "kind": "file",
      "required": false,
      "label": "Zertifikat",
      "writable": false
    },
    "gueltig_bis": {
      "key": "gueltig_bis",
      "fulltype": "date/date",
      "kind": "date",
      "required": false,
      "label": "Gültig bis",
      "writable": true
    }
  }
};

export const SHAPES: Record<EntityKey, Shape[]> = {
  "kunden": [
    {
      "kind": "choice",
      "field": "kundentyp",
      "count": 2
    }
  ],
  "kontakte": [
    {
      "kind": "record",
      "field": "kunde",
      "targetEntity": "kunden"
    }
  ],
  "veranstaltungen": [
    {
      "kind": "choice",
      "field": "status",
      "count": 5
    }
  ],
  "kundenaktivitaeten": [
    {
      "kind": "choice",
      "field": "aktivitaetsart",
      "count": 4
    },
    {
      "kind": "record",
      "field": "kunde",
      "targetEntity": "kunden"
    },
    {
      "kind": "record",
      "field": "kontakt",
      "targetEntity": "kontakte"
    }
  ],
  "pruefgeraete": [
    {
      "kind": "record",
      "field": "kunde",
      "targetEntity": "kunden"
    }
  ],
  "geraetezertifizierungen": [
    {
      "kind": "choice",
      "field": "ergebnis",
      "count": 3
    },
    {
      "kind": "record",
      "field": "pruefgeraet",
      "targetEntity": "pruefgeraete"
    }
  ],
  "anmeldungen": [
    {
      "kind": "record",
      "field": "veranstaltung",
      "targetEntity": "veranstaltungen"
    },
    {
      "kind": "record",
      "field": "kontakt",
      "targetEntity": "kontakte"
    }
  ],
  "anwenderzertifizierungen": [
    {
      "kind": "choice",
      "field": "ergebnis",
      "count": 3
    },
    {
      "kind": "record",
      "field": "anwender",
      "targetEntity": "kontakte"
    }
  ]
};

/** The fields a record of this entity is recognised by (a person: first and
 *  last name; else its title-like text field) — the same choice the dashboard's
 *  enrichment makes for `<key>Name`. `useRecordSearch` resolves an applookup to
 *  this name (`ctx.ref('gast')` in `toItem`). */
export const DISPLAY_FIELDS: Record<EntityKey, string[]> = {
  "kunden": [
    "firmenname"
  ],
  "kontakte": [
    "vorname",
    "nachname"
  ],
  "veranstaltungen": [
    "titel"
  ],
  "kundenaktivitaeten": [
    "betreff"
  ],
  "pruefgeraete": [
    "bezeichnung"
  ],
  "geraetezertifizierungen": [
    "zertifikatsnummer"
  ],
  "anmeldungen": [
    "teilnehmer_vorname"
  ],
  "anwenderzertifizierungen": [
    "schulungsart"
  ]
};

/** The display name of a record: its display fields joined, else the first
 *  non-empty text value, else ''. */
/** A display-field value as text: strings as they are, a lookup `{ key, label }`
 *  (either door hydrates lookups to objects) by its label — an entity whose
 *  only title-like field is a lookup/select otherwise had no name at all. */
function displayPart(v: unknown): string {
  if (typeof v === 'string') return v.trim();
  if (v && typeof v === 'object' && 'label' in v) {
    const l = (v as { label?: unknown }).label;
    return l === null || l === undefined ? '' : String(l).trim();
  }
  return '';
}

export function displayNameOf(entity: EntityKey, fields: Record<string, unknown>): string {
  const parts = (DISPLAY_FIELDS[entity] ?? [])
    .map(k => displayPart(fields[k]))
    .filter(v => v !== '');
  if (parts.length > 0) return parts.join(' ');
  for (const [k, rule] of Object.entries(FIELD_RULES[entity] ?? {})) {
    if (rule.kind !== 'text' && rule.kind !== 'email') continue;
    const v = fields[k];
    if (typeof v === 'string' && v.trim() !== '') return v.trim();
  }
  return '';
}

export function ruleOf(entity: EntityKey, key: string): FieldRule | undefined {
  return FIELD_RULES[entity]?.[key];
}

/** The field label as the user sees it — the owner's policy label first (a
 *  public page's "Felder anpassen"), runtime bundle second, generated label last. */
export function labelOf(entity: EntityKey, key: string): string {
  const own = policyLabel(entity, key);
  if (own) return own;
  const fromBundle = fieldLabel(entity, key);
  if (fromBundle !== key) return fromBundle;
  return ruleOf(entity, key)?.label ?? key;
}

export function entityLabel(entity: EntityKey): string {
  const fromBundle = appLabel(entity);
  if (fromBundle !== entity) return fromBundle;
  return ENTITIES[entity]?.label ?? entity;
}

/** Lookup options with runtime labels — the only legitimate source of `{key,label}` pairs. */
export function optionsOf(entity: EntityKey, key: string): Array<{ key: string; label: string }> {
  const generated = (LOOKUP_OPTIONS as Record<string, Record<string, Array<{ key: string; label: string }>>>)[entity]?.[key];
  if (generated && generated.length) return generated.map(o => ({ key: o.key, label: o.label }));
  const keys = ruleOf(entity, key)?.options ?? [];
  return keys.map(k => ({ key: k, label: lookupLabel(entity, key, k) ?? k }));
}

export function isEmptyValue(v: unknown): boolean {
  if (v === undefined || v === null) return true;
  if (typeof v === 'string') return v.trim() === '';
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === 'object' && 'from' in (v as object) && 'to' in (v as object)) {
    const r = v as { from: unknown; to: unknown };
    return isEmptyValue(r.from) && isEmptyValue(r.to);
  }
  return false;
}
