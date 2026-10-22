/**
 * Kundenaktivität erfassen — 3-Schritt-Wizard plus Prüfen.
 * Steps: 1) Kunden auswählen → 2) Kontakt des Kunden auswählen → 3) Art, Zeitpunkt, Betreff, Notizen → 4) Prüfen & anlegen.
 * Reads: kunden, kontakte. Writes: kundenaktivitaeten (via useKundenaktivitaetErfassenFlow).
 * Composes: IntentWizardShell, EntitySelectStep, Bound, StepNav, SummaryStep, SuccessStep.
 */
import { useState } from 'react';
import { IntentWizardShell, WizardStep } from '@/components/blocks/IntentWizardShell';
import { EntitySelectStep } from '@/components/blocks/EntitySelectStep';
import { Bound } from '@/components/blocks/Bound';
import { StepNav } from '@/components/blocks/StepNav';
import { SummaryStep } from '@/components/blocks/SummaryStep';
import { SuccessStep } from '@/components/blocks/SuccessStep';
import { fieldText, fieldLookup } from '@/lib/journey';
import { useKundenaktivitaetErfassenFlow } from '@/lib/journey/flows/KundenaktivitaetErfassen';
import { tx } from '@/i18n';

export default function KundenaktivitaetErfassenPage() {
  const [step, setStep] = useState(1);
  const flow = useKundenaktivitaetErfassenFlow({
    steps: { kunde: 1, kontakt: 2, aktivitaetsart: 3, zeitpunkt: 3, betreff: 3, notizen: 3 },
    items: {
      kunde: k => ({
        id: k.id,
        title: fieldText(k, 'firmenname'),
        subtitle: fieldText(k, 'ort'),
        status: fieldLookup(k, 'kundentyp') ?? undefined,
      }),
      kontakt: (c, ctx) => ({
        id: c.id,
        title: `${fieldText(c, 'vorname')} ${fieldText(c, 'nachname')}`.trim(),
        subtitle: [fieldText(c, 'position'), ctx.ref('kunde')].filter(Boolean).join(' · '),
      }),
    },
  });
  const f = flow.forms.kundenaktivitaeten;

  return (
    <IntentWizardShell
      title={tx('Kundenaktivität erfassen')}
      currentStep={step}
      onStepChange={setStep}
      forms={flow.formList}
      draftKey={flow.draftKey}
      intro={{
        description: tx('Halte einen Anruf, Besuch, ein Angebot oder einen Folgetermin bei einem Kunden fest.'),
        needs: [tx('Name des Kunden'), tx('Ansprechpartner'), tx('Betreff der Aktivität')],
      }}
    >
      <WizardStep label={tx('Kunde')} description={tx('Für welchen Kunden war die Aktivität?')}>
        <EntitySelectStep
          {...flow.picks.kunde.select}
          {...flow.pick('kunde')}
          searchPlaceholder={tx('Firmenname suchen …')}
        />
      </WizardStep>
      <WizardStep label={tx('Kontakt')} description={tx('Mit wem hast du gesprochen?')} needs={['kunde']}>
        <EntitySelectStep
          {...flow.picks.kontakt.select}
          {...flow.pick('kontakt')}
          avatar="initials"
          searchPlaceholder={tx('Name suchen …')}
        />
        <StepNav onBack={() => setStep(1)} />
      </WizardStep>
      <WizardStep label={tx('Aktivität')} description={tx('Art, Zeitpunkt und Inhalt der Aktivität eingeben.')} needs={['kunde', 'kontakt']}>
        <div className="space-y-4">
          <Bound form={f} name="aktivitaetsart" />
          <Bound form={f} name="zeitpunkt" />
          <Bound form={f} name="betreff" />
          <Bound form={f} name="notizen" rows={4} />
          <StepNav
            onBack={() => setStep(2)}
            onNext={() => flow.validateStep(3)}
            nextStepLabel={tx('Prüfen')}
          />
        </div>
      </WizardStep>
      <WizardStep label={tx('Prüfen')}>
        {!flow.submit.done && (
          <SummaryStep
            forms={flow.formList}
            submit={flow.submit}
            whatHappensNext={tx('Die Aktivität wird beim Kunden und beim Kontakt gespeichert.')}
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
            { label: tx('Gerätezertifizierung erfassen'), href: '#/intents/geraetezertifizierung-erfassen' },
            { label: tx('Zum Dashboard'), href: '#/' },
          ]}
        />
      )}
    </IntentWizardShell>
  );
}
