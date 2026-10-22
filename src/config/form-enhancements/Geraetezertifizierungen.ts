// Auto-generated. Per-entity form-enhancements config for "Gerätezertifizierungen".
// Written by the backend form polish (app/services/form_polish.py) from the
// generator's manifest; scripts/parse-formulas.mjs expands the formula strings.
// Schema: see ./types.ts.

import type { FormEnhancements } from './types';

export const formEnhancements: FormEnhancements = {
  fieldOrder: ["pruefgeraet", {"row": ["pruefdatum", "ergebnis"], "cols": "1fr 1fr"}, "zertifikatsnummer", "hinweise"],
  defaults: {
    'pruefdatum': { kind: 'today' },
  },
  computed: {},
};

export const computedDeps: Record<string, string[]> = {};
export const computedApplookupRefs: Record<string, {lookupKey: string}[]> = {};
