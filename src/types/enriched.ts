import type { Anmeldungen, Anwenderzertifizierungen, Geraetezertifizierungen, Kontakte, Kundenaktivitaeten, Pruefgeraete } from './app';

export type EnrichedKontakte = Kontakte & {
  kundeName: string;
};

export type EnrichedKundenaktivitaeten = Kundenaktivitaeten & {
  kundeName: string;
  kontaktName: string;
};

export type EnrichedPruefgeraete = Pruefgeraete & {
  kundeName: string;
};

export type EnrichedGeraetezertifizierungen = Geraetezertifizierungen & {
  pruefgeraetName: string;
};

export type EnrichedAnmeldungen = Anmeldungen & {
  veranstaltungName: string;
  kontaktName: string;
};

export type EnrichedAnwenderzertifizierungen = Anwenderzertifizierungen & {
  anwenderName: string;
};
