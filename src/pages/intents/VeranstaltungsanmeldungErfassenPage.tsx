/**
 * Anmeldung zu Veranstaltung erfassen — 3-Schritt-Wizard.
 * Steps: 1) Veranstaltung auswählen → 2) Bestehenden Kontakt wählen oder Teilnehmerdaten eingeben → 3) Prüfen & speichern.
 * Reads: veranstaltungen, kontakte. Writes: anmeldungen (über den Flow-Hook useVeranstaltungsanmeldungErfassenFlow).
 * Composes: IntentWizardShell, EntitySelectStep, Bound, StepNav, SummaryStep, SuccessStep.
 */
import { useState } from 'react';
import { IntentWizardShell, WizardStep } from '@/components/blocks/IntentWizardShell';
import { EntitySelectStep } from '@/components/blocks/EntitySelectStep';
import { Bound } from '@/components/blocks/Bound';
import { StepNav } from '@/components/blocks/StepNav';
import { SummaryStep } from '@/components/blocks/SummaryStep';
import { SuccessStep } from '@/components/blocks/SuccessStep';
import { fieldText, fieldDate } from '@/lib/journey';
import { useVeranstaltungsanmeldungErfassenFlow } from '@/lib/journey/flows/VeranstaltungsanmeldungErfassen';
import { tx } from '@/i18n';

export default function VeranstaltungsanmeldungErfassenPage() {
  const [step, setStep] = useState(1);
  const flow = useVeranstaltungsanmeldungErfassenFlow({
    steps: {
      veranstaltung: 1,
      kontakt: 2,
      teilnehmer_vorname: 2,
      teilnehmer_nachname: 2,
      teilnehmer_email: 2,
      teilnehmer_telefon: 2,
      firma: 2,
      bemerkung: 2,
    },
    items: {
      veranstaltung: r => {
        const termin = fieldDate(r, 'termin');
        const ort = fieldText(r, 'ort');
        return {
          id: r.id,
          title: fieldText(r, 'titel'),
          subtitle: [termin ? termin.replace('T', ' ') : '', ort].filter(Boolean).join(' · '),
        };
      },
      kontakt: r => ({
        id: r.id,
        title: `${fieldText(r, 'vorname')} ${fieldText(r, 'nachname')}`.trim(),
        subtitle: fieldText(r, 'email'),
      }),
    },
  });
  const f = flow.forms.anmeldungen;

  // Ein gewählter Kontakt füllt leere Teilnehmerfelder vor — der Nutzer kann sie weiter anpassen.
  const adoptKontakt = (id: string) => {
    const pick = flow.pick('kontakt');
    pick.onSelect(id);
    const rec = flow.picks.kontakt.recordOf(id);
    if (!rec) return;
    const prefill: Array<[string, string]> = [
      ['teilnehmer_vorname', fieldText(rec, 'vorname')],
      ['teilnehmer_nachname', fieldText(rec, 'nachname')],
      ['teilnehmer_email', fieldText(rec, 'email')],
      ['teilnehmer_telefon', fieldText(rec, 'telefon')],
    ];
    prefill.forEach(([key, value]) => {
      if (value && !f.get(key)) f.set(key, value);
    });
  };

  return (
    <IntentWizardShell
      title={tx('Anmeldung zu Veranstaltung erfassen')}
      currentStep={step}
      onStepChange={setStep}
      forms={flow.formList}
      draftKey={flow.draftKey}
      intro={{
        description: tx('Einen Teilnehmer für eine Veranstaltung anmelden.'),
        needs: [tx('Name und E-Mail des Teilnehmers'), tx('Optional: ein bestehender Kontakt')],
      }}
    >
      <WizardStep label={tx('Veranstaltung')} heading={tx('Veranstaltung auswählen')} description={tx('Für welche Veranstaltung wird angemeldet?')}>
        <EntitySelectStep
          {...flow.picks.veranstaltung.select}
          {...flow.pick('veranstaltung')}
          avatar="none"
          searchPlaceholder={tx('Titel oder Ort suchen …')}
        />
      </WizardStep>
      <WizardStep
        label={tx('Teilnehmer')}
        needs={['veranstaltung']}
        description={tx('Wähle einen bestehenden Kontakt oder gib die Teilnehmerdaten selbst ein.')}
      >
        <div className="space-y-6">
          <EntitySelectStep
            {...flow.picks.kontakt.select}
            {...flow.pick('kontakt')}
            onSelect={adoptKontakt}
            avatar="initials"
            searchPlaceholder={tx('Name oder E-Mail suchen …')}
          />
          <div className="space-y-4">
            <Bound form={f} name="teilnehmer_vorname" />
            <Bound form={f} name="teilnehmer_nachname" />
            <Bound form={f} name="teilnehmer_email" />
            <Bound form={f} name="teilnehmer_telefon" />
            <Bound form={f} name="firma" />
            <Bound form={f} name="bemerkung" rows={3} />
          </div>
          <StepNav
            onBack={() => setStep(1)}
            onNext={() => flow.validateStep(2)}
            nextStepLabel={tx('Prüfen')}
          />
        </div>
      </WizardStep>
      <WizardStep label={tx('Prüfen')}>
        {!flow.submit.done && (
          <SummaryStep
            forms={flow.formList}
            submit={flow.submit}
            whatHappensNext={tx('Die Anmeldung wird gespeichert und der Veranstaltung zugeordnet.')}
          />
        )}
      </WizardStep>
      {flow.submit.result && (
        <SuccessStep
          result={flow.submit.result}
          forms={flow.formList}
          submit={flow.submit}
          restartLabel={tx('Weitere Anmeldung erfassen')}
          next={[
            { label: tx('Weitere Anmeldung erfassen'), onClick: () => { flow.reset(); setStep(1); } },
            { label: tx('Kundenaktivität erfassen'), href: '#/intents/kundenaktivitaet-erfassen' },
            { label: tx('Gerätezertifizierung erfassen'), href: '#/intents/geraetezertifizierung-erfassen' },
            { label: tx('Zum Dashboard'), href: '#/' },
          ]}
        />
      )}
    </IntentWizardShell>
  );
}
