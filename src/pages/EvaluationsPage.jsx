import { useMemo, useState } from 'react';
import { CheckCircle2, ClipboardCheck, GraduationCap, Target } from 'lucide-react';
import { evaluations } from '../data/evaluations.js';
import { StatCard } from '../components/AcademyComponents.jsx';
import { EmptyResults, FilterToolbar, includesQuery } from '../components/FilterControls.jsx';

const evaluationStatuses = [...new Set(evaluations.map((evaluation) => evaluation.status))];

export function EvaluationsPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const available = evaluations.filter((evaluation) => evaluation.status === 'disponible').length;

  const filteredEvaluations = useMemo(() => {
    return evaluations.filter((evaluation) => {
      const matchesStatus = status === 'all' || evaluation.status === status;
      const matchesSearch = includesQuery([
        evaluation.title,
        evaluation.level,
        evaluation.format,
        evaluation.objective,
        evaluation.questions,
        evaluation.passCriteria,
        evaluation.status,
      ], query);

      return matchesStatus && matchesSearch;
    });
  }, [query, status]);

  const clearFilters = () => {
    setQuery('');
    setStatus('all');
  };

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
          <span><strong>{filteredEvaluations.length}</strong> visibles</span>
          <span><strong>{available}</strong> disponibles</span>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Fundamentos" value="F1" detail="Conceptos base y casos bancarios" icon={GraduationCap} />
        <StatCard label="Riesgo" value="F2" detail="Banca, balances y categorías de riesgo" icon={Target} />
        <StatCard label="Modelos" value="F7" detail="Selección, métricas y trade-offs" icon={ClipboardCheck} />
        <StatCard label="Validación" value="F14" detail="Evidencia, hallazgos y controles" icon={CheckCircle2} />
      </section>

      <FilterToolbar
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Buscar evaluación, fase, pregunta, criterio o tema..."
        filterLabel="Estado"
        filterValue={status}
        onFilterChange={setStatus}
        filterOptions={evaluationStatuses}
        resultCount={filteredEvaluations.length}
        totalCount={evaluations.length}
        onClear={clearFilters}
      />

      {filteredEvaluations.length === 0 ? (
        <EmptyResults title="No encontré evaluaciones" description="Prueba con fundamentos, riesgo, estadística, modelos, validación, MLOps o governance." />
      ) : (
        <section className="evaluation-grid">
          {filteredEvaluations.map((evaluation) => (
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
      )}
    </div>
  );
}
