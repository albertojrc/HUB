import { useMemo, useState } from 'react';
import { Beaker, CheckCircle2, Clock, Code2, Database, FlaskConical } from 'lucide-react';
import { labs } from '../data/labs.js';
import { StatCard } from '../components/AcademyComponents.jsx';
import { EmptyResults, FilterToolbar, includesQuery } from '../components/FilterControls.jsx';

const labStatuses = [...new Set(labs.map((lab) => lab.status))];

export function LabsPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const priorityLab = labs.find((lab) => lab.status === 'prioritario');

  const filteredLabs = useMemo(() => {
    return labs.filter((lab) => {
      const matchesStatus = status === 'all' || lab.status === status;
      const matchesSearch = includesQuery([
        lab.title,
        lab.phase,
        lab.level,
        lab.duration,
        lab.objective,
        lab.scenario,
        lab.tasks,
        lab.output,
        lab.skills,
        lab.status,
      ], query);

      return matchesStatus && matchesSearch;
    });
  }, [query, status]);

  const clearFilters = () => {
    setQuery('');
    setStatus('all');
  };

  return (
    <div className="labs-page">
      <section className="page-hero glass-card compact">
        <div>
          <p className="eyebrow">Práctica guiada</p>
          <h2>Labs profesionales</h2>
          <p>
            Ejercicios diseñados para convertir teoría en práctica: SQL, Python, modelos, métricas, dashboards,
            documentación y pensamiento de negocio bancario.
          </p>
        </div>
        <div className="hero-stats-mini">
          <span><strong>{labs.length}</strong> labs</span>
          <span><strong>{filteredLabs.length}</strong> visibles</span>
          <span><strong>{priorityLab?.title.split(':')[0]}</strong> prioritario</span>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="SQL" value="CTE" detail="Cartera, mora, exposición y features" icon={Database} />
        <StatCard label="Python" value="PD" detail="Modelado, métricas y validación" icon={Code2} />
        <StatCard label="Fraude" value="PR-AUC" detail="Thresholds y falsos positivos" icon={Beaker} />
        <StatCard label="MLOps" value="PSI" detail="Monitoring, drift y reportes" icon={FlaskConical} />
      </section>

      <FilterToolbar
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Buscar lab, skill, fase, output o escenario..."
        filterLabel="Estado"
        filterValue={status}
        onFilterChange={setStatus}
        filterOptions={labStatuses}
        resultCount={filteredLabs.length}
        totalCount={labs.length}
        onClear={clearFilters}
      />

      {filteredLabs.length === 0 ? (
        <EmptyResults title="No encontré labs" description="Prueba con SQL, PD, fraude, churn, forecasting, MLOps o PSI." />
      ) : (
        <section className="lab-grid">
          {filteredLabs.map((lab) => (
            <article className={`lab-card status-${lab.status.replaceAll(' ', '-')}`} key={lab.id}>
              <div className="model-card-header">
                <span>{lab.phase}</span>
                <strong>{lab.status}</strong>
              </div>
              <div className="lab-title-row">
                <span className="lab-icon"><FlaskConical size={24} /></span>
                <div>
                  <h3>{lab.title}</h3>
                  <p>{lab.objective}</p>
                </div>
              </div>

              <div className="lab-meta-row">
                <span><Clock size={16} /> {lab.duration}</span>
                <span><CheckCircle2 size={16} /> {lab.level}</span>
              </div>

              <div className="model-section">
                <h4>Escenario</h4>
                <p>{lab.scenario}</p>
              </div>

              <div>
                <h4>Tareas guiadas</h4>
                <ol className="timeline-list compact-timeline">
                  {lab.tasks.map((task) => <li key={task}>{task}</li>)}
                </ol>
              </div>

              <div className="lab-output">
                <strong>Output esperado</strong>
                <p>{lab.output}</p>
              </div>

              <div className="chip-row">
                {lab.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
