import { ArrowRight, BrainCircuit, Gauge, ShieldCheck, Target } from 'lucide-react';
import { models } from '../data/models.js';
import { InfoCard, StatCard } from '../components/AcademyComponents.jsx';

export function ModelsPage({ onNavigate }) {
  return (
    <div className="models-page">
      <section className="page-hero glass-card compact">
        <div>
          <p className="eyebrow">Biblioteca técnica</p>
          <h2>Modelos de Machine Learning para banca</h2>
          <p>
            Compara modelos por tarea, caso de uso, métricas, fortalezas, limitaciones y requisitos de gobierno.
            Cada tarjeta ahora abre un playbook individual para estudiar el modelo con profundidad.
          </p>
        </div>
        <div className="hero-stats-mini">
          <span><strong>{models.length}</strong> modelos</span>
          <span><strong>Playbooks</strong> individuales</span>
          <span><strong>100%</strong> aplicado a banca</span>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Clasificación" value="PD" detail="Default, fraude, churn y aprobación" icon={Target} />
        <StatCard label="Regresión" value="ŷ" detail="Saldos, ingresos, pérdidas y forecasts simples" icon={Gauge} />
        <StatCard label="Explainability" value="SHAP" detail="Interpretabilidad y documentación de modelos" icon={BrainCircuit} />
        <StatCard label="Governance" value="MRM" detail="Validación, monitoreo y riesgo de modelo" icon={ShieldCheck} />
      </section>

      <section className="model-grid">
        {models.map((model) => (
          <article className="model-card" key={model.id}>
            <div className="model-card-header">
              <span>{model.category}</span>
              <strong>{model.level}</strong>
            </div>
            <h3>{model.name}</h3>
            <p>{model.task}</p>

            <div className="model-section">
              <h4>Uso bancario</h4>
              <p>{model.bankingUse}</p>
            </div>

            <div className="model-section">
              <h4>Cuándo usarlo</h4>
              <p>{model.whenToUse}</p>
            </div>

            <div className="model-lists">
              <InfoCard title="Fortalezas" tone="emerald">
                <ul className="compact-list">
                  {model.strengths.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </InfoCard>
              <InfoCard title="Limitaciones" tone="amber">
                <ul className="compact-list">
                  {model.limitations.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </InfoCard>
            </div>

            <div className="chip-row">
              {model.metrics.map((metric) => <span key={metric}>{metric}</span>)}
            </div>

            <div className="governance-note">
              <ShieldCheck size={18} />
              <p>{model.governance}</p>
            </div>

            <button className="model-open-button" type="button" onClick={() => onNavigate(`/models/${model.id}`)}>
              Abrir playbook
              <ArrowRight size={18} />
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}
