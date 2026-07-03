import { useMemo, useState } from 'react';
import { BookOpen, Database, Library, Search } from 'lucide-react';
import { glossaryCategories, glossaryTerms } from '../data/glossary.js';
import { StatCard } from '../components/AcademyComponents.jsx';
import { EmptyResults, FilterToolbar, includesQuery } from '../components/FilterControls.jsx';

export function GlossaryPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesSearch = includesQuery([
        item.term,
        item.fullName,
        item.category,
        item.definition,
        item.example,
      ], query);

      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  const clearFilters = () => {
    setQuery('');
    setCategory('all');
  };

  return (
    <div className="glossary-page">
      <section className="page-hero glass-card compact">
        <div>
          <p className="eyebrow">Diccionario vivo</p>
          <h2>Glosario Banking Data Science</h2>
          <p>
            Conceptos esenciales para hablar con fluidez entre equipos de datos, riesgo, finanzas, auditoría,
            regulación y negocio. Cada término incluye definición y ejemplo bancario.
          </p>
        </div>
        <div className="hero-stats-mini">
          <span><strong>{glossaryTerms.length}</strong> términos</span>
          <span><strong>{filteredTerms.length}</strong> visibles</span>
          <span><strong>{glossaryCategories.length}</strong> categorías</span>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Credit Risk" value="PD" detail="Riesgo de crédito y scorecards" icon={Database} />
        <StatCard label="Metrics" value="AUC" detail="Evaluación, estabilidad y monitoreo" icon={Search} />
        <StatCard label="Governance" value="BCBS" detail="Linaje, regulación y evidencia" icon={Library} />
        <StatCard label="GenAI" value="RAG" detail="Asistentes, documentos y privacidad" icon={BookOpen} />
      </section>

      <FilterToolbar
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Buscar término, definición, ejemplo o categoría..."
        filterLabel="Categoría"
        filterValue={category}
        onFilterChange={setCategory}
        filterOptions={glossaryCategories}
        resultCount={filteredTerms.length}
        totalCount={glossaryTerms.length}
        onClear={clearFilters}
      />

      <section className="glossary-layout">
        <aside className="category-panel">
          <h3>Categorías</h3>
          <div className="chip-row vertical">
            {glossaryCategories.map((categoryName) => (
              <button
                className={category === categoryName ? 'category-chip-button active' : 'category-chip-button'}
                type="button"
                key={categoryName}
                onClick={() => setCategory(categoryName)}
              >
                {categoryName}
              </button>
            ))}
          </div>
        </aside>

        {filteredTerms.length === 0 ? (
          <EmptyResults title="No encontré términos" description="Prueba con PD, Gini, SHAP, drift, RAG, BCBS o monitoring." />
        ) : (
          <div className="glossary-grid">
            {filteredTerms.map((item) => (
              <article className="glossary-card" key={item.term}>
                <div className="model-card-header">
                  <span>{item.category}</span>
                  <strong>{item.fullName}</strong>
                </div>
                <h3>{item.term}</h3>
                <p>{item.definition}</p>
                <div className="example-box">
                  <strong>Ejemplo:</strong>
                  <span>{item.example}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
