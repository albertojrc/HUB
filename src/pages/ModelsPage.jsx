import { useMemo, useState } from 'react';
import { ArrowRight, BrainCircuit, Gauge, ShieldCheck, Target } from 'lucide-react';
import { models, modelCategories } from '../data/models.js';
import { InfoCard, StatCard } from '../components/AcademyComponents.jsx';
import { EmptyResults, FilterToolbar, includesQuery } from '../components/FilterControls.jsx';

export function ModelsPage({ onNavigate }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      const matchesCategory = category === 'all' || model.category === category;
      const matchesSearch = includesQuery([
        model.name,
        model.category,
        model.task,
        model.level,
        model.bankingUse,
        model.whenToUse,
        model.strengths,
        model.limitations,
        model.metrics,
        model.governance,
      ], query);

      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  const clearFilters = () => {
    setQuery('');
    setCategory('all');
  };

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
          <span><strong>{filteredModels.length}</strong> visibles</span>
          <span><strong>Playbooks</strong> individuales</span>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Clasificación" value="PD" detail="Default, fraude, churn y aprobación" icon={Target} />
        <StatCard label="Regresión" value="ŷ" detail="Saldos, ingresos, pérdidas y forecasts simples" icon={Gauge} />
        <StatCard label="Explainability" value="SHAP" detail="Interpretabilidad y documentación de modelos" icon={BrainCircuit} />
        <StatCard label="Governance" value="MRM" detail="Validación, monitoreo y riesgo de modelo" icon={ShieldCheck} />
      </section>

      <FilterToolbar
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Buscar modelo, métrica, caso bancario o governance..."
        filterLabel="Categoría"
        filterValue={category}
        onFilterChange={setCategory}
        filterOptions={modelCategories}
        resultCount={filteredModels.length}
        totalCount={models.length}
        onClear={clearFilters}
      />

      {filteredModels.length === 0 ? (
        <EmptyResults title="No encontré modelos" description="Prueba con términos como PD, fraude, forecasting, SHAP, AUC o governance." />
      ) : (
        <section className="model-grid">
          {filteredModels.map((model) => (
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
      )}
    </div>
  );
}
