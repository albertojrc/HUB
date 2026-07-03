import { useMemo, useState } from 'react';
import { ClipboardCheck, FileText, Library, ShieldCheck, Sparkles } from 'lucide-react';
import { resources } from '../data/resources.js';
import { StatCard } from '../components/AcademyComponents.jsx';
import { EmptyResults, FilterToolbar, includesQuery } from '../components/FilterControls.jsx';

const resourceCategories = [...new Set(resources.map((resource) => resource.category))];

export function ResourcesPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesCategory = category === 'all' || resource.category === category;
      const matchesSearch = includesQuery([
        resource.title,
        resource.type,
        resource.category,
        resource.description,
        resource.sections,
        resource.bestFor,
        resource.maturity,
      ], query);

      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  const clearFilters = () => {
    setQuery('');
    setCategory('all');
  };

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
          <span><strong>{filteredResources.length}</strong> visibles</span>
          <span><strong>MRM</strong> enfoque</span>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Model Card" value="MC" detail="Propósito, datos, métricas y uso" icon={FileText} />
        <StatCard label="Validation" value="VR" detail="Conceptual, datos y performance" icon={ClipboardCheck} />
        <StatCard label="Monitoring" value="PSI" detail="Drift, estabilidad y alertas" icon={ShieldCheck} />
        <StatCard label="GenAI" value="RAG" detail="Riesgos, guardrails y evaluación" icon={Sparkles} />
      </section>

      <FilterToolbar
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Buscar plantilla, checklist, métrica o governance..."
        filterLabel="Categoría"
        filterValue={category}
        onFilterChange={setCategory}
        filterOptions={resourceCategories}
        resultCount={filteredResources.length}
        totalCount={resources.length}
        onClear={clearFilters}
      />

      {filteredResources.length === 0 ? (
        <EmptyResults title="No encontré recursos" description="Prueba con model card, validation, monitoring, data dictionary, GenAI o PSI." />
      ) : (
        <section className="resource-grid">
          {filteredResources.map((resource) => (
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
      )}
    </div>
  );
}
