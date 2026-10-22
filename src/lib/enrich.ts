import type { EnrichedAnmeldungen, EnrichedAnwenderzertifizierungen, EnrichedGeraetezertifizierungen, EnrichedKontakte, EnrichedKundenaktivitaeten, EnrichedPruefgeraete } from '@/types/enriched';
import type { Anmeldungen, Anwenderzertifizierungen, Geraetezertifizierungen, Kontakte, Kunden, Kundenaktivitaeten, Pruefgeraete, Veranstaltungen } from '@/types/app';
import { extractRecordId } from '@/services/livingAppsService';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveDisplay(url: unknown, map: Map<string, any>, ...fields: string[]): string {
  if (!url) return '';
  const id = extractRecordId(url);
  if (!id) return '';
  const r = map.get(id);
  if (!r) return '';
  return fields.map(f => String(r.fields[f] ?? '')).join(' ').trim();
}

interface KontakteMaps {
  kundenMap: Map<string, Kunden>;
}

export function enrichKontakte(
  kontakte: Kontakte[],
  maps: KontakteMaps
): EnrichedKontakte[] {
  return kontakte.map(r => ({
    ...r,
    kundeName: resolveDisplay(r.fields.kunde, maps.kundenMap, 'firmenname'),
  }));
}

interface KundenaktivitaetenMaps {
  kundenMap: Map<string, Kunden>;
  kontakteMap: Map<string, Kontakte>;
}

export function enrichKundenaktivitaeten(
  kundenaktivitaeten: Kundenaktivitaeten[],
  maps: KundenaktivitaetenMaps
): EnrichedKundenaktivitaeten[] {
  return kundenaktivitaeten.map(r => ({
    ...r,
    kundeName: resolveDisplay(r.fields.kunde, maps.kundenMap, 'firmenname'),
    kontaktName: resolveDisplay(r.fields.kontakt, maps.kontakteMap, 'vorname', 'nachname'),
  }));
}

interface PruefgeraeteMaps {
  kundenMap: Map<string, Kunden>;
}

export function enrichPruefgeraete(
  pruefgeraete: Pruefgeraete[],
  maps: PruefgeraeteMaps
): EnrichedPruefgeraete[] {
  return pruefgeraete.map(r => ({
    ...r,
    kundeName: resolveDisplay(r.fields.kunde, maps.kundenMap, 'firmenname'),
  }));
}

interface GeraetezertifizierungenMaps {
  pruefgeraeteMap: Map<string, Pruefgeraete>;
}

export function enrichGeraetezertifizierungen(
  geraetezertifizierungen: Geraetezertifizierungen[],
  maps: GeraetezertifizierungenMaps
): EnrichedGeraetezertifizierungen[] {
  return geraetezertifizierungen.map(r => ({
    ...r,
    pruefgeraetName: resolveDisplay(r.fields.pruefgeraet, maps.pruefgeraeteMap, 'bezeichnung'),
  }));
}

interface AnmeldungenMaps {
  veranstaltungenMap: Map<string, Veranstaltungen>;
  kontakteMap: Map<string, Kontakte>;
}

export function enrichAnmeldungen(
  anmeldungen: Anmeldungen[],
  maps: AnmeldungenMaps
): EnrichedAnmeldungen[] {
  return anmeldungen.map(r => ({
    ...r,
    veranstaltungName: resolveDisplay(r.fields.veranstaltung, maps.veranstaltungenMap, 'titel'),
    kontaktName: resolveDisplay(r.fields.kontakt, maps.kontakteMap, 'vorname', 'nachname'),
  }));
}

interface AnwenderzertifizierungenMaps {
  kontakteMap: Map<string, Kontakte>;
}

export function enrichAnwenderzertifizierungen(
  anwenderzertifizierungen: Anwenderzertifizierungen[],
  maps: AnwenderzertifizierungenMaps
): EnrichedAnwenderzertifizierungen[] {
  return anwenderzertifizierungen.map(r => ({
    ...r,
    anwenderName: resolveDisplay(r.fields.anwender, maps.kontakteMap, 'vorname', 'nachname'),
  }));
}
