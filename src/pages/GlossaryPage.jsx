import { BookOpen, Database, Library, Search } from 'lucide-react';
import { glossaryCategories, glossaryTerms } from '../data/glossary.js';
import { StatCard } from '../components/AcademyComponents.jsx';

export function GlossaryPage() {
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
          <span><strong>{glossaryCategories.length}</strong> categorías</span>
          <span><strong>ES</strong> explicado simple</span>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Credit Risk" value="PD" detail="Riesgo de crédito y scorecards" icon={Database} />
        <StatCard label="Metrics" value="AUC" detail="Evaluación, estabilidad y monitoreo" icon={Search} />
        <StatCard label="Governance" value="BCBS" detail="Linaje, regulación y evidencia" icon={Library} />
        <StatCard label="GenAI" value="RAG" detail="Asistentes, documentos y privacidad" icon={BookOpen} />
      </section>

      <section className="glossary-layout">
        <aside className="category-panel">
          <h3>Categorías</h3>
          <div className="chip-row vertical">
            {glossaryCategories.map((category) => <span key={category}>{category}</span>)}
          </div>
        </aside>

        <div className="glossary-grid">
          {glossaryTerms.map((item) => (
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
      </section>
    </div>
  );
}
