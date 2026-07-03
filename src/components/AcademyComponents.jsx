import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  BookOpen,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Database,
  FlaskConical,
  FolderKanban,
  GraduationCap,
  Home,
  Layers3,
  Library,
  LineChart,
  Map,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  UserCircle,
  Workflow,
  X,
} from 'lucide-react';

const navItems = [
  { label: 'Inicio', href: '/', icon: Home },
  { label: 'Ruta de aprendizaje', href: '/learning-path', icon: Map },
  { label: 'Lecciones', href: '/lessons/linear-regression', icon: BookOpen },
  { label: 'Modelos', href: '/models', icon: BrainCircuit },
  { label: 'Banking Use Cases', href: '/use-cases', icon: Building2 },
  { label: 'Risk Management', href: '/risk-management', icon: ShieldCheck },
  { label: 'Labs', href: '/labs', icon: FlaskConical },
  { label: 'Proyectos', href: '/projects', icon: FolderKanban },
  { label: 'Evaluaciones', href: '/evaluations', icon: ClipboardCheck },
  { label: 'Recursos', href: '/resources', icon: Library },
  { label: 'Glosario', href: '/glossary', icon: Database },
];

const tabs = ['Lección', 'Notas', 'Ejemplos', 'Recursos', 'Discusión'];

export function Layout({ children, currentPath, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar
        currentPath={currentPath}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={onNavigate}
      />
      <div className="app-main">
        <Topbar onOpenMenu={() => setIsMenuOpen(true)} currentPath={currentPath} />
        <main className="page-container">{children}</main>
      </div>
    </div>
  );
}

function Sidebar({ currentPath, isOpen, onClose, onNavigate }) {
  return (
    <>
      <aside className={`sidebar ${isOpen ? 'is-open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-mark">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="brand-kicker">Academia personal</p>
            <h1>Banking DS Hub</h1>
          </div>
          <button className="icon-button mobile-only" type="button" aria-label="Cerrar menú" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="sidebar-progress-card">
          <div>
            <span>Progreso global</span>
            <strong>18%</strong>
          </div>
          <div className="progress-track dark">
            <span style={{ width: '18%' }} />
          </div>
          <small>3 fases activas · 1 lección destacada</small>
        </div>

        <nav className="sidebar-nav" aria-label="Navegación principal">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href));
            return (
              <a
                className={isActive ? 'active' : ''}
                href={item.href}
                key={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(item.href);
                  onClose();
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <BadgeCheck size={18} />
          <div>
            <strong>Modo estudio</strong>
            <span>Banking + ML + Governance</span>
          </div>
        </div>
      </aside>
      <button className={`scrim ${isOpen ? 'is-visible' : ''}`} type="button" aria-label="Cerrar navegación" onClick={onClose} />
    </>
  );
}

function Topbar({ onOpenMenu, currentPath }) {
  const breadcrumb = useMemo(() => {
    if (currentPath === '/') return 'Inicio';
    if (currentPath.includes('learning-path')) return 'Ruta de aprendizaje';
    if (currentPath.includes('linear-regression')) return 'Lecciones / Regresión Lineal';
    return currentPath.replace('/', '').replaceAll('-', ' ');
  }, [currentPath]);

  return (
    <header className="topbar">
      <button className="icon-button desktop-hidden" type="button" aria-label="Abrir menú" onClick={onOpenMenu}>
        <Menu size={20} />
      </button>
      <div className="breadcrumb">
        <span>Hub</span>
        <ChevronRight size={16} />
        <strong>{breadcrumb}</strong>
      </div>
      <label className="search-box">
        <Search size={18} />
        <input type="search" placeholder="Buscar conceptos, modelos o casos bancarios..." />
      </label>
      <div className="topbar-actions">
        <button className="icon-button" type="button" aria-label="Notificaciones">
          <Bell size={18} />
        </button>
        <div className="points-pill">
          <Sparkles size={16} />
          <span>1,240 pts</span>
        </div>
        <UserCircle className="avatar-icon" size={32} />
      </div>
    </header>
  );
}

export function LessonHeader({ lesson }) {
  return (
    <section className="lesson-header glass-card">
      <div className="lesson-icon">
        <LineChart size={30} />
      </div>
      <div className="lesson-heading">
        <p className="eyebrow">{lesson.eyebrow}</p>
        <h2>{lesson.title}</h2>
        <p>{lesson.subtitle}</p>
        <div className="lesson-meta">
          <span>{lesson.phase}</span>
          <span>{lesson.duration}</span>
          <span>{lesson.difficulty}</span>
        </div>
      </div>
      <ProgressCard progress={lesson.progress} label="Progreso de la lección" />
    </section>
  );
}

export function LessonTabs({ activeTab, onTabChange }) {
  return (
    <div className="lesson-tabs" role="tablist" aria-label="Contenido de la lección">
      {tabs.map((tab) => (
        <button
          className={activeTab === tab ? 'active' : ''}
          key={tab}
          type="button"
          role="tab"
          aria-selected={activeTab === tab}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function InfoCard({ icon: Icon = BookOpen, title, children, tone = 'blue' }) {
  return (
    <article className={`info-card tone-${tone}`}>
      <div className="card-title-row">
        <span className="card-icon">
          <Icon size={20} />
        </span>
        <h3>{title}</h3>
      </div>
      <div className="card-body">{children}</div>
    </article>
  );
}

export function FormulaCard({ formula, variables }) {
  return (
    <article className="formula-card">
      <div>
        <p className="eyebrow">Fórmula base</p>
        <code>{formula}</code>
      </div>
      <div className="variable-list">
        {variables.map((variable) => (
          <div className="variable-chip" key={variable.symbol}>
            <strong>{variable.symbol}</strong>
            <span>{variable.description}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

export function ProgressCard({ progress, label = 'Progreso' }) {
  return (
    <aside className="progress-card" aria-label={label}>
      <span>{label}</span>
      <strong>{progress}%</strong>
      <div className="progress-track">
        <span style={{ width: `${progress}%` }} />
      </div>
      <small>Siguiente hito: ejemplos con datos simulados</small>
    </aside>
  );
}

export function ChartCard() {
  const points = [
    [38, 162],
    [72, 145],
    [108, 134],
    [146, 120],
    [184, 110],
    [220, 88],
    [262, 76],
    [304, 58],
    [344, 42],
  ];

  return (
    <article className="chart-card">
      <div className="card-title-row">
        <span className="card-icon">
          <BarChart3 size={20} />
        </span>
        <div>
          <h3>Dispersión con línea de mejor ajuste</h3>
          <p>Visualización educativa: relación positiva entre una variable bancaria y el valor esperado.</p>
        </div>
      </div>
      <svg viewBox="0 0 400 220" role="img" aria-label="Gráfico de regresión lineal con puntos y línea de tendencia">
        <defs>
          <linearGradient id="chartGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <line x1="34" y1="190" x2="370" y2="190" className="axis" />
        <line x1="34" y1="20" x2="34" y2="190" className="axis" />
        <line x1="42" y1="168" x2="354" y2="42" className="fit-line" />
        {points.map(([x, y]) => (
          <circle cx={x} cy={y} r="6" key={`${x}-${y}`} className="dot" />
        ))}
        <text x="46" y="28" className="chart-label">y: saldo esperado</text>
        <text x="260" y="208" className="chart-label">x: ingreso cliente</text>
      </svg>
    </article>
  );
}

export function UseCaseCard({ items }) {
  return (
    <InfoCard title="Casos de uso bancarios" icon={Target} tone="emerald">
      <ul className="clean-list">
        {items.map((item) => (
          <li key={item}>
            <CheckCircle2 size={16} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </InfoCard>
  );
}

export function RiskCard({ items }) {
  return (
    <InfoCard title="Riesgos y limitaciones" icon={AlertTriangle} tone="amber">
      <ul className="clean-list">
        {items.map((item) => (
          <li key={item}>
            <AlertTriangle size={16} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </InfoCard>
  );
}

export function LearningPath({ phases }) {
  return (
    <div className="learning-grid">
      {phases.map((phase) => (
        <article className={`phase-card status-${phase.status.replace(' ', '-')}`} key={phase.id}>
          <div className="phase-topline">
            <span>Fase {phase.id}</span>
            <strong>{phase.level}</strong>
          </div>
          <h3>{phase.title}</h3>
          <p>{phase.objective}</p>
          <div className="module-tags">
            {phase.modules.map((module) => (
              <span key={module}>{module}</span>
            ))}
          </div>
          <div className="phase-footer">
            <span className="status-badge">{phase.status}</span>
            <ArrowRight size={18} />
          </div>
        </article>
      ))}
    </div>
  );
}

export function StatCard({ label, value, detail, icon: Icon = Layers3 }) {
  return (
    <article className="stat-card">
      <span className="stat-icon">
        <Icon size={22} />
      </span>
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
        <small>{detail}</small>
      </div>
    </article>
  );
}

export function LessonNavigation({ onNavigate }) {
  return (
    <div className="lesson-navigation">
      <button type="button" className="secondary-button">
        <ArrowLeft size={18} />
        Lección anterior
      </button>
      <button type="button" className="primary-button" onClick={() => onNavigate('/learning-path')}>
        Ver ruta completa
        <ArrowRight size={18} />
      </button>
    </div>
  );
}

export function PlaceholderPage({ title, description, icon: Icon = GraduationCap }) {
  return (
    <section className="placeholder-page glass-card">
      <span className="placeholder-icon">
        <Icon size={34} />
      </span>
      <p className="eyebrow">Sección preparada</p>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="placeholder-actions">
        <span>Próximo paso: conectar esta sección con lecciones, labs y proyectos reales.</span>
      </div>
    </section>
  );
}

export { navItems, Workflow };
