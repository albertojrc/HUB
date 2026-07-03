import { Building2, Database, Gauge, ShieldCheck } from 'lucide-react';
import { bankingUseCases } from '../data/useCases.js';
import { StatCard } from '../components/AcademyComponents.jsx';

export function UseCasesPage() {
  return (
    <div className="use-cases-page">
      <section className="page-hero glass-card compact">
        <div>
          <p className="eyebrow">Mapa de negocio</p>
          <h2>Banking Use Cases</h2>
          <p>
            Cada caso conecta problema de negocio, fuentes de datos, modelos, métricas y criterios de gobierno.
            Este mapa sirve para estudiar con mentalidad de analista bancario, no solo de técnico ML.
          </p>
        </div>
        <div className="hero-stats-mini">
          <span><strong>{bankingUseCases.length}</strong> casos</span>
          <span><strong>6</strong> dominios</span>
          <span><strong>ML + Risk</strong> enfoque</span>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Data sources" value="KYC" detail="Core banking, CRM, transacciones y buró" icon={Database} />
        <StatCard label="Business lens" value="ROI" detail="Cada modelo debe resolver una decisión" icon={Building2} />
        <StatCard label="Metrics" value="AUC" detail="Técnicas y de impacto de negocio" icon={Gauge} />
        <StatCard label="Controls" value="MRM" detail="Governance desde el diseño" icon={ShieldCheck} />
      </section>

      <section className="use-case-board">
        {bankingUseCases.map((useCase) => (
          <article className="use-case-card" key={useCase.id}>
            <div className="model-card-header">
              <span>{useCase.domain}</span>
              <strong>Use case</strong>
            </div>
            <h3>{useCase.title}</h3>
            <p>{useCase.objective}</p>

            <div className="use-case-columns">
              <div>
                <h4>Fuentes de datos</h4>
                <div className="chip-row">
                  {useCase.dataSources.map((source) => <span key={source}>{source}</span>)}
                </div>
              </div>
              <div>
                <h4>Modelos sugeridos</h4>
                <div className="chip-row">
                  {useCase.models.map((model) => <span key={model}>{model}</span>)}
                </div>
              </div>
              <div>
                <h4>Métricas</h4>
                <div className="chip-row">
                  {useCase.metrics.map((metric) => <span key={metric}>{metric}</span>)}
                </div>
              </div>
            </div>

            <div className="governance-note">
              <ShieldCheck size={18} />
              <p>{useCase.governance}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
