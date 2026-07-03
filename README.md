# Banking Data Science Hub

Plataforma personal de estudio para aprender, documentar y repasar **Data Science, Machine Learning, Finanzas, Banking, Risk Management, Model Validation y MLOps** aplicado al sector bancario.

La app está diseñada como una academia personal moderna: sidebar oscuro, topbar con buscador, dashboard principal, ruta de aprendizaje por fases, lecciones con tabs, tarjetas educativas, progreso, gráficos y navegación entre secciones.

## Stack utilizado

- **Vite** como entorno de desarrollo frontend.
- **React** para componentes reutilizables y navegación tipo SPA.
- **CSS moderno** sin frameworks pesados para mantener control visual completo.
- **Lucide React** para iconografía limpia y consistente.

## Páginas incluidas

- `/` — Dashboard principal del hub.
- `/learning-path` — Ruta de aprendizaje con las 16 fases.
- `/lessons/linear-regression` — Lección completa: Regresión Lineal aplicada a banca.
- `/models` — Biblioteca real de modelos de Machine Learning aplicados a banca.
- `/use-cases` — Casos de uso bancarios conectando negocio, datos, modelos, métricas y governance.
- `/risk-management` — Mapa de riesgos bancarios con conceptos, analítica y controles.
- `/labs` — Sección preparada para notebooks y ejercicios.
- `/projects` — Roadmap de portfolio profesional con proyectos end-to-end.
- `/evaluations` — Sección preparada para quizzes y evaluaciones.
- `/resources` — Sección preparada para plantillas y materiales.
- `/glossary` — Glosario técnico Banking Data Science.

## Contenido desarrollado

### Ruta de aprendizaje

La ruta está organizada en 16 fases:

1. Fundamentos de Data Science
2. Fundamentos de banca y finanzas
3. Estadística y matemáticas para Data Science bancario
4. SQL, Python y manipulación de datos
5. Arquitectura de datos y gobierno de datos bancarios
6. Fundamentos de Machine Learning
7. Modelos clásicos de Machine Learning
8. Credit Risk Modeling
9. Fraude, AML y Anomaly Detection
10. Customer Analytics bancario
11. Series temporales y forecasting
12. NLP y Generative AI en banca
13. Model Risk Management, explicabilidad y regulación
14. Validación de modelos bancarios
15. MLOps y despliegue de modelos
16. Portfolio profesional

Cada fase incluye objetivo, módulos principales, estado y nivel.

### Primera lección

La primera lección es **Regresión Lineal aplicada a banca** e incluye:

- Explicación simple.
- Fórmula `y = β₀ + β₁x`.
- Variables del modelo.
- Ejemplo bancario.
- Gráfico SVG de dispersión con línea de mejor ajuste.
- Casos de uso.
- Riesgos y limitaciones.
- Pasos del modelo.
- Interpretación.
- Aplicación bancaria.
- Tabs: Lección, Notas, Ejemplos, Recursos y Discusión.

### Sprint 2: secciones profesionales

Se añadieron páginas reales para:

- **Modelos**: regresión lineal, logística, árboles, Random Forest, Gradient Boosting, K-Means, Isolation Forest, ARIMA/SARIMA y RAG.
- **Banking Use Cases**: default, fraude, AML, churn, segmentación y forecast de liquidez.
- **Risk Management**: riesgo de crédito, mercado, liquidez, operacional, modelo y regulatorio.
- **Proyectos**: roadmap de portfolio con entregables y skills demostrables.
- **Glosario**: términos esenciales como PD, LGD, EAD, Expected Loss, WOE, IV, KS, Gini, PSI, SHAP, BCBS 239 y RAG.

## Estructura del proyecto

```txt
.
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── README.md
└── src
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    ├── featureStyles.css
    ├── components
    │   └── AcademyComponents.jsx
    ├── data
    │   ├── glossary.js
    │   ├── lessons.js
    │   ├── models.js
    │   ├── phases.js
    │   ├── projects.js
    │   ├── riskTopics.js
    │   └── useCases.js
    └── pages
        ├── GlossaryPage.jsx
        ├── ModelsPage.jsx
        ├── ProjectsPage.jsx
        ├── RiskManagementPage.jsx
        └── UseCasesPage.jsx
```

## Cómo instalar

```bash
npm install
```

## Cómo correr localmente

```bash
npm run dev
```

Luego abre la URL local que indique Vite, normalmente:

```bash
http://localhost:5173
```

## Cómo generar build

```bash
npm run build
```

## Cómo actualizar tu repositorio local

Si ya tienes una copia local y quieres traer la versión más reciente desde GitHub:

```bash
git fetch --all --prune
git checkout main
git reset --hard origin/main
git clean -fdx
npm install
npm run dev
```

## Decisiones de arquitectura

- El contenido vive separado del layout en `src/data`.
- Las páginas principales viven en `src/pages`.
- Los componentes reutilizables están centralizados en `src/components/AcademyComponents.jsx`.
- La navegación usa History API para mantener rutas limpias sin añadir React Router todavía.
- El diseño evita Tailwind para no introducir configuración adicional en una primera base limpia.
- Las secciones futuras ya tienen rutas preparadas para escalar el hub sin rediseñar la estructura.

## Próximos pasos recomendados

1. Crear página real de **Labs** con notebooks y ejercicios guiados.
2. Crear página real de **Recursos** con plantillas descargables o copiables.
3. Crear evaluaciones por fase con preguntas tipo quiz.
4. Convertir cada modelo de la biblioteca en una lección individual.
5. Añadir persistencia de progreso del usuario con localStorage o una base de datos ligera.
6. Agregar filtros y búsqueda funcional para modelos, glosario y proyectos.
7. Añadir tests visuales o capturas cuando el diseño esté más consolidado.

## Objetivo del hub

Convertirse en un segundo cerebro profesional para estudiar, consultar y construir proyectos de **Data Science aplicado a banca** con una experiencia visual parecida a una academia moderna tipo DataCamp, Coursera o plataformas SaaS educativas.
