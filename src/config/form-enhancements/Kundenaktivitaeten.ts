// Auto-generated. Per-entity form-enhancements config for "Kundenaktivitäten".
// Written by the backend form polish (app/services/form_polish.py) from the
// generator's manifest; scripts/parse-formulas.mjs expands the formula strings.
// Schema: see ./types.ts.

import type { FormEnhancements } from './types';

export const formEnhancements: FormEnhancements = {
  fieldOrder: ["betreff", {"row": ["kunde", "kontakt"], "cols": "1fr 1fr"}, {"row": ["aktivitaetsart", "zeitpunkt"], "cols": "1fr 1fr"}, "notizen"],
  defaults: {
    'zeitpunkt': { kind: 'today', withTime: true },
  },
  computed: {},
};

export const computedDeps: Record<string, string[]> = {};
export const computedApplookupRefs: Record<string, {lookupKey: string}[]> = {};
