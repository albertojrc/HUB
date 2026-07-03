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
- `/models` — Sección preparada para biblioteca de modelos.
- `/use-cases` — Sección preparada para casos de uso bancarios.
- `/risk-management` — Sección preparada para gestión de riesgos.
- `/labs` — Sección preparada para notebooks y ejercicios.
- `/projects` — Sección preparada para portfolio profesional.
- `/evaluations` — Sección preparada para quizzes y evaluaciones.
- `/resources` — Sección preparada para plantillas y materiales.
- `/glossary` — Sección preparada para glosario técnico.

## Contenido inicial desarrollado

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
    ├── components
    │   └── AcademyComponents.jsx
    └── data
        ├── lessons.js
        └── phases.js
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

## Decisiones de arquitectura

- El contenido vive separado del layout en `src/data/phases.js` y `src/data/lessons.js`.
- Los componentes reutilizables están centralizados en `src/components/AcademyComponents.jsx`.
- La navegación usa History API para mantener rutas limpias sin añadir React Router todavía.
- El diseño evita Tailwind para no introducir configuración adicional en una primera base limpia.
- Las secciones futuras ya tienen rutas preparadas para escalar el hub sin rediseñar la estructura.

## Próximos pasos recomendados

1. Separar componentes grandes en archivos individuales cuando el proyecto crezca.
2. Añadir React Router si se necesita routing más avanzado.
3. Crear una plantilla estándar para nuevas lecciones.
4. Agregar notebooks o labs con datasets simulados.
5. Conectar cada fase con lecciones específicas.
6. Añadir persistencia de progreso del usuario con localStorage o una base de datos ligera.
7. Crear páginas reales para Modelos, Proyectos, Glosario y Recursos.
8. Añadir tests visuales o capturas cuando el diseño esté más consolidado.

## Objetivo del hub

Convertirse en un segundo cerebro profesional para estudiar, consultar y construir proyectos de **Data Science aplicado a banca** con una experiencia visual parecida a una academia moderna tipo DataCamp, Coursera o plataformas SaaS educativas.
