import { CheckCircle2, ClipboardCheck, GraduationCap, Target } from 'lucide-react';
import { evaluations } from '../data/evaluations.js';
import { StatCard } from '../components/AcademyComponents.jsx';

export function EvaluationsPage() {
  const available = evaluations.filter((evaluation) => evaluation.status === 'disponible').length;

  return (
    <div className="evaluations-page">
      <section className="page-hero glass-card compact">
        <div>
          <p className="eyebrow">Control de dominio</p>
          <h2>Evaluaciones y checklists</h2>
          <p>
            Mini evaluaciones para comprobar si realmente dominas cada fase. No están pensadas para memorizar,
            sino para demostrar criterio técnico, bancario y de governance.
          </p>
        </div>
        <div className="hero-stats-mini">
          <span><strong>{evaluations.length}</strong> evaluaciones</span>
          <span><strong>{available}</strong> disponibles</span>
          <span><strong>Skill check</strong> enfoque</span>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Fundamentos" value="F1" detail="Conceptos base y casos bancarios" icon={GraduationCap} />
        <StatCard label="Riesgo" value="F2" detail="Banca, balances y categorías de riesgo" icon={Target} />
        <StatCard label="Modelos" value="F7" detail="Selección, métricas y trade-offs" icon={ClipboardCheck} />
        <StatCard label="Validación" value="F14" detail="Evidencia, hallazgos y controles" icon={CheckCircle2} />
      </section>

      <section className="evaluation-grid">
        {evaluations.map((evaluation) => (
          <article className={`evaluation-card status-${evaluation.status}`} key={evaluation.id}>
            <div className="model-card-header">
              <span>{evaluation.level}</span>
              <strong>{evaluation.status}</strong>
            </div>
            <h3>{evaluation.title}</h3>
            <p>{evaluation.objective}</p>

            <div className="evaluation-format">
              <ClipboardCheck size={18} />
              <span>{evaluation.format}</span>
            </div>

            <div>
              <h4>Preguntas clave</h4>
              <ol className="timeline-list compact-timeline">
                {evaluation.questions.map((question) => <li key={question}>{question}</li>)}
              </ol>
            </div>

            <div>
              <h4>Criterios para aprobar</h4>
              <div className="chip-row">
                {evaluation.passCriteria.map((criteria) => <span key={criteria}>{criteria}</span>)}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
