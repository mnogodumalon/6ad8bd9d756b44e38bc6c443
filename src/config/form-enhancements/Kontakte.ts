// Auto-generated. Per-entity form-enhancements config for "Kontakte".
// Written by the backend form polish (app/services/form_polish.py) from the
// generator's manifest; scripts/parse-formulas.mjs expands the formula strings.
// Schema: see ./types.ts.

import type { FormEnhancements } from './types';

export const formEnhancements: FormEnhancements = {
  fieldOrder: ["kunde", {"row": ["vorname", "nachname"]}, "position", "email", {"row": ["telefon", "mobil"], "cols": "1fr 1fr"}, "ist_anwender"],
  defaults: {},
  computed: {},
};

export const computedDeps: Record<string, string[]> = {};
export const computedApplookupRefs: Record<string, {lookupKey: string}[]> = {};
