// Auto-generated. Per-entity form-enhancements config for "Anmeldungen".
// Written by the backend form polish (app/services/form_polish.py) from the
// generator's manifest; scripts/parse-formulas.mjs expands the formula strings.
// Schema: see ./types.ts.

import type { FormEnhancements } from './types';

export const formEnhancements: FormEnhancements = {
  fieldOrder: ["veranstaltung", {"row": ["teilnehmer_vorname", "teilnehmer_nachname"]}, {"row": ["teilnehmer_email", "teilnehmer_telefon"], "cols": "1fr 1fr"}, "firma", "kontakt", "bemerkung"],
  defaults: {},
  computed: {},
};

export const computedDeps: Record<string, string[]> = {};
export const computedApplookupRefs: Record<string, {lookupKey: string}[]> = {};
