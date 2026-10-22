/**
 * Gerätezertifizierung erfassen — 3-Schritt-Wizard.
 * Steps: 1) Prüfgerät auswählen → 2) Prüfdatum, Ergebnis und Zertifikat eingeben → 3) Prüfen & speichern.
 * Reads: pruefgeraete. Writes: geraetezertifizierungen (via useGeraetezertifizierungErfassenFlow).
 * Composes: IntentWizardShell, EntitySelectStep, Bound, StepNav, SummaryStep, SuccessStep.
 */
import { useState } from 'react';
import { IntentWizardShell, WizardStep } from '@/components/blocks/IntentWizardShell';
import { EntitySelectStep } from '@/components/blocks/EntitySelectStep';
import { Bound } from '@/components/blocks/Bound';
import { StepNav } from '@/components/blocks/StepNav';
import { SummaryStep } from '@/components/blocks/SummaryStep';
import { SuccessStep } from '@/components/blocks/SuccessStep';
import { fieldText, todayIso } from '@/lib/journey';
import { useGeraetezertifizierungErfassenFlow } from '@/lib/journey/flows/GeraetezertifizierungErfassen';
import { tx } from '@/i18n';

export default function GeraetezertifizierungErfassenPage() {
  const [step, setStep] = useState(1);
  const flow = useGeraetezertifizierungErfassenFlow({
    steps: { pruefgeraet: 1, pruefdatum: 2, ergebnis: 2, zertifikatsnummer: 2, zertifikat: 2, hinweise: 2 },
    items: {
      pruefgeraet: r => ({
        id: r.id,
        title: fieldText(r, 'bezeichnung'),
        subtitle: [fieldText(r, 'hersteller'), fieldText(r, 'typ'), fieldText(r, 'seriennummer')].filter(Boolean).join(' · '),
      }),
    },
    initial: { pruefdatum: todayIso() },
  });
  const form = flow.forms.geraetezertifizierungen;

  return (
    <IntentWizardShell
      title={tx('Gerätezertifizierung erfassen')}
      currentStep={step}
      onStepChange={setStep}
      forms={flow.formList}
      draftKey={flow.draftKey}
      intro={{
        description: tx('Eine Prüfung eines Prüfgeräts mit Ergebnis und Zertifikat dokumentieren.'),
        needs: [tx('Das geprüfte Gerät'), tx('Prüfdatum und Ergebnis'), tx('Das Zertifikat (Datei)')],
      }}
    >
      <WizardStep label={tx('Prüfgerät')} description={tx('Welches Gerät wurde geprüft?')}>
        <EntitySelectStep
          {...flow.picks.pruefgeraet.select}
          {...flow.pick('pruefgeraet')}
          searchPlaceholder={tx('Bezeichnung, Hersteller oder Seriennummer …')}
        />
      </WizardStep>
      <WizardStep
        label={tx('Prüfung & Zertifikat')}
        description={tx('Datum und Ergebnis der Prüfung festhalten und das Zertifikat anhängen.')}
        needs={['pruefgeraet']}
      >
        <div className="space-y-4">
          <Bound form={form} name="pruefdatum" />
          <Bound form={form} name="ergebnis" />
          <Bound form={form} name="zertifikatsnummer" />
          <Bound form={form} name="zertifikat" />
          <Bound form={form} name="hinweise" rows={3} />
          <StepNav
            onBack={() => setStep(1)}
            onNext={() => flow.validateStep(2)}
            nextStepLabel={tx('Prüfen')}
          />
        </div>
      </WizardStep>
      <WizardStep label={tx('Prüfen')} description={tx('Alles richtig? Dann speichern.')}>
        {!flow.submit.done && (
          <SummaryStep
            forms={flow.formList}
            submit={flow.submit}
            whatHappensNext={tx('Die Zertifizierung wird beim Prüfgerät dokumentiert.')}
          />
        )}
      </WizardStep>
      {flow.submit.result && (
        <SuccessStep
          result={flow.submit.result}
          forms={flow.formList}
          submit={flow.submit}
          next={[
            { label: tx('Anmeldung zu Veranstaltung erfassen'), href: '#/intents/veranstaltungsanmeldung-erfassen' },
            { label: tx('Kundenaktivität erfassen'), href: '#/intents/kundenaktivitaet-erfassen' },
            { label: tx('Zum Dashboard'), href: '#/' },
          ]}
        />
      )}
    </IntentWizardShell>
  );
}
