import { AlertTriangle, BarChart3, ClipboardCheck, ShieldCheck } from 'lucide-react';
import { riskTopics } from '../data/riskTopics.js';
import { StatCard } from '../components/AcademyComponents.jsx';

export function RiskManagementPage() {
  return (
    <div className="risk-page">
      <section className="page-hero glass-card compact">
        <div>
          <p className="eyebrow">Mapa de riesgos</p>
          <h2>Risk Management bancario</h2>
          <p>
            Una guía práctica para conectar categorías de riesgo, conceptos clave, analítica, controles y evidencia.
            Esta sección prepara el puente entre modelos, regulación y toma de decisiones.
          </p>
        </div>
        <div className="hero-stats-mini">
          <span><strong>{riskTopics.length}</strong> riesgos</span>
          <span><strong>4</strong> capas</span>
          <span><strong>Control</strong> mindset</span>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Identificar" value="01" detail="Riesgo, fuente y exposición" icon={AlertTriangle} />
        <StatCard label="Medir" value="02" detail="Modelos, métricas y escenarios" icon={BarChart3} />
        <StatCard label="Controlar" value="03" detail="Políticas, límites y monitoreo" icon={ShieldCheck} />
        <StatCard label="Documentar" value="04" detail="Evidencia para auditoría y validación" icon={ClipboardCheck} />
      </section>

      <section className="risk-grid">
        {riskTopics.map((topic) => (
          <article className="risk-topic-card" key={topic.id}>
            <div className="model-card-header">
              <span>Risk domain</span>
              <strong>{topic.keyConcepts.length} conceptos</strong>
            </div>
            <h3>{topic.title}</h3>
            <p>{topic.definition}</p>

            <h4>Conceptos clave</h4>
            <div className="chip-row">
              {topic.keyConcepts.map((concept) => <span key={concept}>{concept}</span>)}
            </div>

            <div className="model-section">
              <h4>Analítica asociada</h4>
              <p>{topic.analytics}</p>
            </div>

            <div className="model-section">
              <h4>Controles típicos</h4>
              <ul className="compact-list">
                {topic.controls.map((control) => <li key={control}>{control}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
