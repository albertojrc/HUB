import { useMemo, useState } from 'react';
import { ArrowRight, Building2, Database, Gauge, ShieldCheck } from 'lucide-react';
import { bankingUseCases } from '../data/useCases.js';
import { StatCard } from '../components/AcademyComponents.jsx';
import { EmptyResults, FilterToolbar, includesQuery } from '../components/FilterControls.jsx';

const useCaseDomains = [...new Set(bankingUseCases.map((useCase) => useCase.domain))];

export function UseCasesPage({ onNavigate }) {
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState('all');

  const filteredUseCases = useMemo(() => {
    return bankingUseCases.filter((useCase) => {
      const matchesDomain = domain === 'all' || useCase.domain === domain;
      const matchesSearch = includesQuery([
        useCase.title,
        useCase.domain,
        useCase.objective,
        useCase.dataSources,
        useCase.models,
        useCase.metrics,
        useCase.governance,
      ], query);

      return matchesDomain && matchesSearch;
    });
  }, [domain, query]);

  const clearFilters = () => {
    setQuery('');
    setDomain('all');
  };

  return (
    <div className="use-cases-page">
      <section className="page-hero glass-card compact">
        <div>
          <p className="eyebrow">Mapa de negocio</p>
          <h2>Banking Use Cases</h2>
          <p>
            Cada caso conecta problema de negocio, fuentes de datos, modelos, métricas y criterios de gobierno.
            Ahora cada caso tiene un playbook individual para estudiar la decisión bancaria end-to-end.
          </p>
        </div>
        <div className="hero-stats-mini">
          <span><strong>{bankingUseCases.length}</strong> casos</span>
          <span><strong>{filteredUseCases.length}</strong> visibles</span>
          <span><strong>{useCaseDomains.length}</strong> dominios</span>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Data sources" value="KYC" detail="Core banking, CRM, transacciones y buró" icon={Database} />
        <StatCard label="Business lens" value="ROI" detail="Cada modelo debe resolver una decisión" icon={Building2} />
        <StatCard label="Metrics" value="AUC" detail="Técnicas y de impacto de negocio" icon={Gauge} />
        <StatCard label="Controls" value="MRM" detail="Governance desde el diseño" icon={ShieldCheck} />
      </section>

      <FilterToolbar
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Buscar use case, fuente, modelo, métrica o governance..."
        filterLabel="Dominio"
        filterValue={domain}
        onFilterChange={setDomain}
        filterOptions={useCaseDomains}
        resultCount={filteredUseCases.length}
        totalCount={bankingUseCases.length}
        onClear={clearFilters}
      />

      {filteredUseCases.length === 0 ? (
        <EmptyResults title="No encontré use cases" description="Prueba con default, fraude, AML, churn, segmentación, liquidez, AUC o KYC." />
      ) : (
        <section className="use-case-board">
          {filteredUseCases.map((useCase) => (
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

              <button className="model-open-button" type="button" onClick={() => onNavigate(`/use-cases/${useCase.id}`)}>
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
