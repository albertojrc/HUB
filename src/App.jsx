import { useEffect, useState } from 'react';
import {
  BookOpen,
  BrainCircuit,
  Building2,
  Layers3,
  Library,
  LineChart,
  ShieldCheck,
  Sigma,
  Target,
  Workflow,
} from 'lucide-react';
import {
  ChartCard,
  FormulaCard,
  InfoCard,
  Layout,
  LearningPath,
  LessonHeader,
  LessonNavigation,
  LessonTabs,
  ProgressCard,
  RiskCard,
  StatCard,
  UseCaseCard,
} from './components/AcademyComponents.jsx';
import { featuredLessons, linearRegressionLesson } from './data/lessons.js';
import { phases, phaseStats } from './data/phases.js';
import { EvaluationsPage } from './pages/EvaluationsPage.jsx';
import { GlossaryPage } from './pages/GlossaryPage.jsx';
import { LabsPage } from './pages/LabsPage.jsx';
import { ModelDetailPage } from './pages/ModelDetailPage.jsx';
import { ModelsPage } from './pages/ModelsPage.jsx';
import { ProjectsPage } from './pages/ProjectsPage.jsx';
import { ResourcesPage } from './pages/ResourcesPage.jsx';
import { RiskManagementPage } from './pages/RiskManagementPage.jsx';
import { UseCasesPage } from './pages/UseCasesPage.jsx';

const normalizePath = (path) => {
  if (!path || path === '/index.html') return '/';
  return path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setCurrentPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (href) => {
    const nextPath = normalizePath(href);
    window.history.pushState({}, '', nextPath);
    setCurrentPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout currentPath={currentPath} onNavigate={navigate}>
      {renderRoute(currentPath, navigate)}
    </Layout>
  );
}

function renderRoute(path, navigate) {
  if (path.startsWith('/models/') && path !== '/models') {
    const modelId = path.replace('/models/', '');
    return <ModelDetailPage modelId={modelId} onNavigate={navigate} />;
  }

  switch (path) {
    case '/':
      return <DashboardPage onNavigate={navigate} />;
    case '/learning-path':
      return <LearningPathPage />;
    case '/lessons/linear-regression':
      return <LinearRegressionLessonPage onNavigate={navigate} />;
    case '/models':
      return <ModelsPage onNavigate={navigate} />;
    case '/use-cases':
      return <UseCasesPage />;
    case '/risk-management':
      return <RiskManagementPage />;
    case '/labs':
      return <LabsPage />;
    case '/projects':
      return <ProjectsPage />;
    case '/evaluations':
      return <EvaluationsPage />;
    case '/resources':
      return <ResourcesPage />;
    case '/glossary':
      return <GlossaryPage />;
    default:
      return <DashboardPage onNavigate={navigate} />;
  }
}

function DashboardPage({ onNavigate }) {
  const activePhases = phases.filter((phase) => phase.status !== 'pendiente');

  return (
    <div className="dashboard-page">
      <section className="hero-section glass-card">
        <div className="hero-copy">
          <p className="eyebrow">Segundo cerebro profesional</p>
          <h2>Banking Data Science Hub</h2>
          <p>
            Plataforma personal para estudiar, documentar y conectar Data Science, Machine Learning, Finanzas, Risk Management,
            Model Validation y MLOps aplicado al sector bancario.
          </p>
          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={() => onNavigate('/lessons/linear-regression')}>
              Continuar lección
              <LineChart size={18} />
            </button>
            <button className="secondary-button" type="button" onClick={() => onNavigate('/learning-path')}>
              Ver ruta de aprendizaje
              <Layers3 size={18} />
            </button>
          </div>
        </div>
        <div className="hero-panel">
          <div className="orbit-card main">
            <Sigma size={28} />
            <span>Regresión Lineal</span>
            <strong>38%</strong>
          </div>
          <div className="orbit-card small top">PD · LGD · EAD</div>
          <div className="orbit-card small bottom">Model Governance</div>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Fases totales" value={phaseStats.total} detail="Ruta completa de banca + datos" icon={Layers3} />
        <StatCard label="En progreso" value={phaseStats.inProgress} detail="Fases activas ahora" icon={Workflow} />
        <StatCard label="Lecciones destacadas" value={featuredLessons.length} detail="Contenido inicial creado" icon={BookOpen} />
        <StatCard label="Nivel objetivo" value="Experto" detail="MLOps, validación y regulación" icon={Target} />
      </section>

      <section className="quick-actions-grid">
        <button type="button" className="quick-action-card" onClick={() => onNavigate('/models')}>
          <BrainCircuit size={24} />
          <span>Biblioteca de modelos</span>
          <strong>Comparar algoritmos</strong>
        </button>
        <button type="button" className="quick-action-card" onClick={() => onNavigate('/use-cases')}>
          <Building2 size={24} />
          <span>Use cases bancarios</span>
          <strong>Negocio + datos</strong>
        </button>
        <button type="button" className="quick-action-card" onClick={() => onNavigate('/labs')}>
          <Workflow size={24} />
          <span>Labs guiados</span>
          <strong>Practicar end-to-end</strong>
        </button>
        <button type="button" className="quick-action-card" onClick={() => onNavigate('/resources')}>
          <Library size={24} />
          <span>Plantillas</span>
          <strong>Documentar como banco</strong>
        </button>
      </section>

      <section className="content-split">
        <div className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Ruta activa</p>
            <h2>Primeras fases del recorrido</h2>
          </div>
          <div className="compact-phase-list">
            {activePhases.map((phase) => (
              <article className="compact-phase" key={phase.id}>
                <span>Fase {phase.id}</span>
                <div>
                  <h3>{phase.title}</h3>
                  <p>{phase.objective}</p>
                </div>
                <strong>{phase.status}</strong>
              </article>
            ))}
          </div>
        </div>

        <div className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Lecciones</p>
            <h2>Contenido inicial</h2>
          </div>
          <div className="lesson-stack">
            {featuredLessons.map((lesson) => (
              <button
                className="lesson-preview"
                key={lesson.slug}
                type="button"
                onClick={() => lesson.slug === 'linear-regression' && onNavigate('/lessons/linear-regression')}
              >
                <span>{lesson.phase}</span>
                <h3>{lesson.title}</h3>
                <p>{lesson.subtitle}</p>
                <ProgressCard progress={lesson.progress} label="Avance" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function LearningPathPage() {
  return (
    <div className="learning-page">
      <section className="page-hero glass-card compact">
        <div>
          <p className="eyebrow">Arquitectura de conocimiento</p>
          <h2>Ruta de aprendizaje completa</h2>
          <p>
            Las 16 fases están ordenadas para construir criterio técnico, financiero y regulatorio sin cabos sueltos.
            La estructura va desde fundamentos hasta portfolio profesional.
          </p>
        </div>
        <div className="hero-stats-mini">
          <span><strong>{phaseStats.completed}</strong> completada</span>
          <span><strong>{phaseStats.inProgress}</strong> en progreso</span>
          <span><strong>{phaseStats.pending}</strong> pendientes</span>
        </div>
      </section>
      <LearningPath phases={phases} />
    </div>
  );
}

function LinearRegressionLessonPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('Lección');
  const lesson = linearRegressionLesson;

  return (
    <div className="lesson-page">
      <LessonHeader lesson={lesson} />
      <LessonTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'Lección' && (
        <section className="lesson-layout">
          <div className="lesson-main-column">
            <InfoCard title="Qué es" icon={BookOpen}>
              <p>{lesson.explanation}</p>
            </InfoCard>

            <FormulaCard formula={lesson.formula} variables={lesson.variables} />

            <div className="two-column-grid">
              <InfoCard title="Ejemplo bancario" icon={Building2} tone="purple">
                <p>{lesson.bankingExample}</p>
              </InfoCard>
              <InfoCard title="Interpretación" icon={BrainCircuit} tone="cyan">
                <ul className="numbered-list">
                  {lesson.interpretation.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </InfoCard>
            </div>

            <InfoCard title="Pasos del modelo" icon={Workflow} tone="blue">
              <ol className="timeline-list">
                {lesson.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </InfoCard>

            <InfoCard title="Aplicación bancaria" icon={ShieldCheck} tone="emerald">
              <p>{lesson.bankingApplication}</p>
            </InfoCard>
          </div>

          <aside className="lesson-side-column">
            <ChartCard />
            <UseCaseCard items={lesson.useCases} />
            <RiskCard items={lesson.risks} />
          </aside>
        </section>
      )}

      {activeTab === 'Notas' && (
        <section className="tab-panel-grid">
          <InfoCard title="Notas de estudio" icon={BookOpen}>
            <p>
              Usa la regresión lineal como baseline interpretable. Antes de confiar en el modelo, revisa linealidad,
              residuos, outliers, estabilidad temporal y coherencia de negocio.
            </p>
          </InfoCard>
          <InfoCard title="Checklist rápido" icon={Target} tone="emerald">
            <ul className="clean-list">
              <li>¿La variable objetivo es continua?</li>
              <li>¿La relación parece razonablemente lineal?</li>
              <li>¿Los coeficientes tienen sentido financiero?</li>
              <li>¿El modelo supera una regla simple de negocio?</li>
            </ul>
          </InfoCard>
        </section>
      )}

      {activeTab === 'Ejemplos' && (
        <section className="tab-panel-grid">
          <InfoCard title="Mini caso 1: saldo promedio" icon={Building2} tone="purple">
            <p>
              Un banco estima el saldo promedio mensual de un cliente usando ingreso declarado, antigüedad, uso de tarjeta y
              comportamiento histórico. La regresión lineal permite obtener una primera explicación transparente.
            </p>
          </InfoCard>
          <InfoCard title="Mini caso 2: inversión comercial" icon={LineChart} tone="cyan">
            <p>
              El área comercial puede analizar la relación entre inversión en campañas y captación de nuevos clientes,
              cuidando no interpretar correlación como causalidad sin un diseño experimental adecuado.
            </p>
          </InfoCard>
        </section>
      )}

      {activeTab === 'Recursos' && (
        <section className="tab-panel-grid">
          {lesson.resources.map((resource) => (
            <InfoCard title={resource} icon={Library} key={resource}>
              <p>Recurso preparado para conectar con notebooks, documentos o plantillas dentro del hub.</p>
            </InfoCard>
          ))}
        </section>
      )}

      {activeTab === 'Discusión' && (
        <section className="tab-panel-grid">
          <InfoCard title="Preguntas para reflexión" icon={BrainCircuit} tone="purple">
            <ul className="numbered-list">
              <li>¿Qué variable bancaria tendría una relación aproximadamente lineal?</li>
              <li>¿Qué outlier podría alterar una decisión de crédito?</li>
              <li>¿Qué explicación pediría un validador independiente?</li>
            </ul>
          </InfoCard>
        </section>
      )}

      <LessonNavigation onNavigate={onNavigate} />
    </div>
  );
}
