import { ArrowLeft, BarChart3, BriefcaseBusiness, Database, Flag, ShieldAlert, ShieldCheck, Target, Users, Workflow } from 'lucide-react';
import { InfoCard, StatCard } from '../components/AcademyComponents.jsx';
import { bankingUseCases } from '../data/useCases.js';
import { useCasePlaybooks } from '../data/useCasePlaybooks.js';

export function UseCaseDetailPage({ useCaseId, onNavigate }) {
  const useCase = bankingUseCases.find((item) => item.id === useCaseId);
  const playbook = useCasePlaybooks[useCaseId];

  if (!useCase || !playbook) {
    return (
      <section className="placeholder-page glass-card">
        <p className="eyebrow">Use case no encontrado</p>
        <h2>No existe este playbook todavía</h2>
        <p>Vuelve al mapa de casos bancarios para elegir uno disponible.</p>
        <button className="primary-button" type="button" onClick={() => onNavigate('/use-cases')}>
          Volver a use cases
        </button>
      </section>
    );
  }

  const relatedUseCases = bankingUseCases.filter((item) => item.domain === useCase.domain && item.id !== useCase.id).slice(0, 3);

  return (
    <div className="use-case-detail-page">
      <button className="back-link" type="button" onClick={() => onNavigate('/use-cases')}>
        <ArrowLeft size={18} />
        Volver a Banking Use Cases
      </button>

      <section className="page-hero glass-card compact model-detail-hero">
        <div>
          <p className="eyebrow">Use Case Playbook · {useCase.domain}</p>
          <h2>{useCase.title}</h2>
          <p>{playbook.executiveQuestion}</p>
          <div className="chip-row">
            <span>{useCase.domain}</span>
            <span>{playbook.decisionType}</span>
          </div>
        </div>
        <div className="formula-panel">
          <span>Decisión ejecutiva</span>
          <strong>{playbook.executiveQuestion}</strong>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Dominio" value={useCase.domain} detail={useCase.objective} icon={BriefcaseBusiness} />
        <StatCard label="Datos" value={useCase.dataSources[0]} detail={useCase.dataSources.slice(1).join(', ')} icon={Database} />
        <StatCard label="Métrica" value={useCase.metrics[0]} detail={useCase.metrics.slice(1).join(', ')} icon={BarChart3} />
        <StatCard label="Governance" value="Controls" detail="Evidencia, monitoreo y trazabilidad" icon={ShieldCheck} />
      </section>

      <section className="model-detail-layout">
        <div className="model-detail-main">
          <InfoCard title="Tipo de decisión" icon={Target} tone="emerald">
            <p>{playbook.decisionType}</p>
          </InfoCard>

          <InfoCard title="Workflow recomendado" icon={Workflow} tone="blue">
            <ol className="timeline-list compact-timeline">
              {playbook.workflow.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </InfoCard>

          <div className="two-column-grid">
            <InfoCard title="Stakeholders" icon={Users} tone="purple">
              <div className="chip-row">
                {playbook.stakeholders.map((stakeholder) => <span key={stakeholder}>{stakeholder}</span>)}
              </div>
            </InfoCard>
            <InfoCard title="Modelos sugeridos" icon={BarChart3} tone="cyan">
              <div className="chip-row">
                {useCase.models.map((model) => <span key={model}>{model}</span>)}
              </div>
            </InfoCard>
          </div>

          <InfoCard title="Entregables profesionales" icon={Flag} tone="emerald">
            <div className="chip-row">
              {playbook.deliverables.map((deliverable) => <span key={deliverable}>{deliverable}</span>)}
            </div>
          </InfoCard>
        </div>

        <aside className="model-detail-side">
          <InfoCard title="Features clave" icon={Database} tone="cyan">
            <ul className="compact-list">
              {playbook.keyFeatures.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </InfoCard>

          <InfoCard title="Métricas de negocio" icon={BarChart3} tone="purple">
            <ul className="compact-list">
              {playbook.businessMetrics.map((metric) => <li key={metric}>{metric}</li>)}
            </ul>
          </InfoCard>

          <InfoCard title="Controles" icon={ShieldCheck} tone="emerald">
            <ul className="compact-list">
              {playbook.controls.map((control) => <li key={control}>{control}</li>)}
            </ul>
          </InfoCard>

          <InfoCard title="Red flags" icon={ShieldAlert} tone="amber">
            <ul className="compact-list">
              {playbook.redFlags.map((flag) => <li key={flag}>{flag}</li>)}
            </ul>
          </InfoCard>
        </aside>
      </section>

      {relatedUseCases.length > 0 && (
        <section className="related-models-section">
          <div className="section-heading">
            <p className="eyebrow">Siguiente comparación</p>
            <h2>Use cases relacionados</h2>
          </div>
          <div className="related-models-grid">
            {relatedUseCases.map((item) => (
              <button className="related-model-card" type="button" key={item.id} onClick={() => onNavigate(`/use-cases/${item.id}`)}>
                <span>{item.domain}</span>
                <strong>{item.title}</strong>
                <p>{item.objective}</p>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
