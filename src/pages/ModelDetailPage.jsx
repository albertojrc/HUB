import { ArrowLeft, BrainCircuit, CheckCircle2, Gauge, ShieldAlert, ShieldCheck, Target, Workflow } from 'lucide-react';
import { InfoCard, StatCard } from '../components/AcademyComponents.jsx';
import { modelPlaybooks } from '../data/modelPlaybooks.js';
import { models } from '../data/models.js';

export function ModelDetailPage({ modelId, onNavigate }) {
  const model = models.find((item) => item.id === modelId);
  const playbook = modelPlaybooks[modelId];

  if (!model || !playbook) {
    return (
      <section className="placeholder-page glass-card">
        <p className="eyebrow">Modelo no encontrado</p>
        <h2>No existe este playbook todavía</h2>
        <p>Vuelve a la biblioteca de modelos para elegir uno de los modelos disponibles.</p>
        <button className="primary-button" type="button" onClick={() => onNavigate('/models')}>
          Volver a modelos
        </button>
      </section>
    );
  }

  const relatedModels = models.filter((item) => item.category === model.category && item.id !== model.id).slice(0, 3);

  return (
    <div className="model-detail-page">
      <button className="back-link" type="button" onClick={() => onNavigate('/models')}>
        <ArrowLeft size={18} />
        Volver a biblioteca de modelos
      </button>

      <section className="page-hero glass-card compact model-detail-hero">
        <div>
          <p className="eyebrow">Model Playbook · {model.category}</p>
          <h2>{model.name}</h2>
          <p>{playbook.mentalModel}</p>
          <div className="chip-row">
            <span>{model.task}</span>
            <span>{model.level}</span>
            <span>{model.category}</span>
          </div>
        </div>
        <div className="formula-panel">
          <span>Fórmula / lógica</span>
          <strong>{playbook.formula}</strong>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Uso bancario" value="Use" detail={model.bankingUse} icon={Target} />
        <StatCard label="Métricas" value={model.metrics[0]} detail={model.metrics.slice(1).join(', ')} icon={Gauge} />
        <StatCard label="Governance" value="MRM" detail="Documentación, validación y monitoreo" icon={ShieldCheck} />
        <StatCard label="Nivel" value={model.level} detail="Profundidad recomendada para estudio" icon={BrainCircuit} />
      </section>

      <section className="model-detail-layout">
        <div className="model-detail-main">
          <InfoCard title="Decisión bancaria" icon={Target} tone="emerald">
            <p>{playbook.bankingDecision}</p>
          </InfoCard>

          <InfoCard title="Workflow recomendado" icon={Workflow} tone="blue">
            <ol className="timeline-list compact-timeline">
              {playbook.workflow.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </InfoCard>

          <div className="two-column-grid">
            <InfoCard title="Fortalezas" icon={CheckCircle2} tone="emerald">
              <ul className="compact-list">
                {model.strengths.map((strength) => <li key={strength}>{strength}</li>)}
              </ul>
            </InfoCard>
            <InfoCard title="Limitaciones" icon={ShieldAlert} tone="amber">
              <ul className="compact-list">
                {model.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
              </ul>
            </InfoCard>
          </div>

          <InfoCard title="Cómo defenderlo en entrevista o comité" icon={BrainCircuit} tone="purple">
            <p>{playbook.interviewAngle}</p>
          </InfoCard>
        </div>

        <aside className="model-detail-side">
          <InfoCard title="Validación" icon={Gauge} tone="cyan">
            <div className="chip-row vertical">
              {playbook.validation.map((item) => <span key={item}>{item}</span>)}
            </div>
          </InfoCard>

          <InfoCard title="Governance checklist" icon={ShieldCheck} tone="emerald">
            <ul className="compact-list">
              {playbook.governanceChecklist.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </InfoCard>

          <InfoCard title="Red flags" icon={ShieldAlert} tone="amber">
            <ul className="compact-list">
              {playbook.redFlags.map((flag) => <li key={flag}>{flag}</li>)}
            </ul>
          </InfoCard>
        </aside>
      </section>

      {relatedModels.length > 0 && (
        <section className="related-models-section">
          <div className="section-heading">
            <p className="eyebrow">Siguiente comparación</p>
            <h2>Modelos relacionados</h2>
          </div>
          <div className="related-models-grid">
            {relatedModels.map((item) => (
              <button className="related-model-card" type="button" key={item.id} onClick={() => onNavigate(`/models/${item.id}`)}>
                <span>{item.category}</span>
                <strong>{item.name}</strong>
                <p>{item.task}</p>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
