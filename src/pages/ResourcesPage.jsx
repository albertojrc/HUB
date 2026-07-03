import { ClipboardCheck, FileText, Library, ShieldCheck, Sparkles } from 'lucide-react';
import { resources } from '../data/resources.js';
import { StatCard } from '../components/AcademyComponents.jsx';

export function ResourcesPage() {
  return (
    <div className="resources-page">
      <section className="page-hero glass-card compact">
        <div>
          <p className="eyebrow">Biblioteca operativa</p>
          <h2>Recursos y plantillas</h2>
          <p>
            Plantillas, checklists y guías para documentar modelos como se haría en un entorno bancario serio:
            model cards, validación, monitoring, data dictionary, métricas y riesgos GenAI.
          </p>
        </div>
        <div className="hero-stats-mini">
          <span><strong>{resources.length}</strong> recursos</span>
          <span><strong>MRM</strong> enfoque</span>
          <span><strong>Auditable</strong> mindset</span>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Model Card" value="MC" detail="Propósito, datos, métricas y uso" icon={FileText} />
        <StatCard label="Validation" value="VR" detail="Conceptual, datos y performance" icon={ClipboardCheck} />
        <StatCard label="Monitoring" value="PSI" detail="Drift, estabilidad y alertas" icon={ShieldCheck} />
        <StatCard label="GenAI" value="RAG" detail="Riesgos, guardrails y evaluación" icon={Sparkles} />
      </section>

      <section className="resource-grid">
        {resources.map((resource) => (
          <article className="resource-card" key={resource.id}>
            <div className="model-card-header">
              <span>{resource.category}</span>
              <strong>{resource.type}</strong>
            </div>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>

            <div className="model-section">
              <h4>Mejor para</h4>
              <p>{resource.bestFor}</p>
            </div>

            <div>
              <h4>Secciones sugeridas</h4>
              <div className="chip-row">
                {resource.sections.map((section) => <span key={section}>{section}</span>)}
              </div>
            </div>

            <div className="resource-footer">
              <Library size={18} />
              <span>{resource.maturity}</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
