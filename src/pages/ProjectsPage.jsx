import { useMemo, useState } from 'react';
import { FolderKanban, GraduationCap, Rocket, ShieldCheck } from 'lucide-react';
import { portfolioProjects } from '../data/projects.js';
import { StatCard } from '../components/AcademyComponents.jsx';
import { EmptyResults, FilterToolbar, includesQuery } from '../components/FilterControls.jsx';

const projectStatuses = [...new Set(portfolioProjects.map((project) => project.status))];

export function ProjectsPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const filteredProjects = useMemo(() => {
    return portfolioProjects.filter((project) => {
      const matchesStatus = status === 'all' || project.status === status;
      const matchesSearch = includesQuery([
        project.title,
        project.level,
        project.businessQuestion,
        project.deliverables,
        project.skills,
        project.status,
      ], query);

      return matchesStatus && matchesSearch;
    });
  }, [query, status]);

  const clearFilters = () => {
    setQuery('');
    setStatus('all');
  };

  return (
    <div className="projects-page">
      <section className="page-hero glass-card compact">
        <div>
          <p className="eyebrow">Portfolio profesional</p>
          <h2>Proyectos para demostrar dominio bancario</h2>
          <p>
            Roadmap de proyectos prácticos para convertir conocimiento en evidencia profesional: notebooks,
            reportes, dashboards, model cards, validaciones y documentación lista para entrevistas.
          </p>
        </div>
        <div className="hero-stats-mini">
          <span><strong>{portfolioProjects.length}</strong> proyectos</span>
          <span><strong>{filteredProjects.length}</strong> visibles</span>
          <span><strong>End-to-end</strong> enfoque</span>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Notebook" value="01" detail="Análisis y modelado reproducible" icon={GraduationCap} />
        <StatCard label="Dashboard" value="02" detail="Narrativa visual para negocio" icon={FolderKanban} />
        <StatCard label="Governance" value="03" detail="Model card y validation report" icon={ShieldCheck} />
        <StatCard label="Deployment" value="04" detail="API, batch scoring o monitoring" icon={Rocket} />
      </section>

      <FilterToolbar
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Buscar proyecto, skill, entregable o pregunta de negocio..."
        filterLabel="Estado"
        filterValue={status}
        onFilterChange={setStatus}
        filterOptions={projectStatuses}
        resultCount={filteredProjects.length}
        totalCount={portfolioProjects.length}
        onClear={clearFilters}
      />

      {filteredProjects.length === 0 ? (
        <EmptyResults title="No encontré proyectos" description="Prueba con credit scoring, fraud, churn, segmentation, forecasting, RAG o governance." />
      ) : (
        <section className="project-roadmap">
          {filteredProjects.map((project, index) => (
            <article className={`project-card status-${project.status}`} key={project.id}>
              <div className="project-index">{String(index + 1).padStart(2, '0')}</div>
              <div className="project-content">
                <div className="model-card-header">
                  <span>{project.level}</span>
                  <strong>{project.status}</strong>
                </div>
                <h3>{project.title}</h3>
                <p>{project.businessQuestion}</p>

                <div className="use-case-columns">
                  <div>
                    <h4>Entregables</h4>
                    <ul className="compact-list">
                      {project.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4>Skills que demuestra</h4>
                    <div className="chip-row">
                      {project.skills.map((skill) => <span key={skill}>{skill}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
