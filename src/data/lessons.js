export const linearRegressionLesson = {
  slug: 'linear-regression',
  title: 'Regresión Lineal',
  eyebrow: 'Modelo clásico · Machine Learning supervisado · Banking Analytics',
  subtitle: 'Modelo supervisado utilizado para predecir valores continuos y entender relaciones entre variables.',
  progress: 38,
  duration: '45 min',
  difficulty: 'Intermedio',
  phase: 'Fase 7 · Modelos clásicos de Machine Learning',
  explanation:
    'La regresión lineal estima una relación promedio entre una variable objetivo continua y una o más variables explicativas. En banca suele utilizarse como modelo base porque es simple, interpretable y útil para crear una primera aproximación antes de pasar a modelos más avanzados.',
  formula: 'y = β₀ + β₁x',
  variables: [
    { symbol: 'y', description: 'Variable dependiente o valor que queremos predecir.' },
    { symbol: 'x', description: 'Variable independiente usada para explicar o estimar y.' },
    { symbol: 'β₀', description: 'Intercepto: valor esperado de y cuando x es igual a cero.' },
    { symbol: 'β₁', description: 'Pendiente: cambio promedio esperado en y cuando x aumenta una unidad.' },
  ],
  bankingExample:
    'Predicción del monto esperado de pérdida, ingresos del cliente, saldo promedio o valor futuro de una métrica financiera.',
  useCases: [
    'Predicción de ingresos',
    'Estimación de saldo promedio',
    'Forecast simple de ventas financieras',
    'Relación entre inversión comercial y captación de clientes',
    'Estimación de pérdida esperada como aproximación inicial',
  ],
  risks: [
    'Relación no lineal entre variables',
    'Outliers que distorsionan la pendiente',
    'Multicolinealidad entre variables explicativas',
    'Supuestos estadísticos no cumplidos',
    'Interpretación incorrecta de correlación como causalidad',
  ],
  steps: [
    'Definir una variable objetivo continua y una hipótesis de negocio.',
    'Explorar datos, outliers, missing values y relación visual entre variables.',
    'Dividir los datos en entrenamiento y prueba para medir generalización.',
    'Entrenar el modelo e interpretar coeficientes, intercepto y dirección del efecto.',
    'Evaluar con MAE, RMSE, R² y análisis de residuos.',
    'Documentar supuestos, limitaciones y casos donde no debería usarse.',
  ],
  interpretation: [
    'Una pendiente positiva indica que, en promedio, y aumenta cuando x aumenta.',
    'Una pendiente negativa indica una relación inversa promedio.',
    'El intercepto puede no tener sentido económico si x = 0 no existe en la práctica.',
    'Un buen ajuste visual no reemplaza validación estadística ni análisis de estabilidad.',
  ],
  bankingApplication:
    'Un banco podría usar regresión lineal como benchmark inicial para estimar saldos, ingresos o pérdidas esperadas simples. Su valor principal está en la interpretabilidad: permite explicar rápidamente qué variables se relacionan con una métrica financiera. Después, el equipo puede comparar este baseline contra modelos más robustos como Random Forest, Gradient Boosting o modelos especializados de riesgo.',
  resources: [
    'Checklist de supuestos de regresión lineal',
    'Plantilla de documentación de modelo base',
    'Guía de métricas MAE, RMSE y R²',
    'Notebook futuro: regresión lineal con datos bancarios simulados',
  ],
};

export const featuredLessons = [
  linearRegressionLesson,
  {
    slug: 'expected-loss',
    title: 'Expected Loss',
    phase: 'Fase 3 · Estadística bancaria',
    subtitle: 'PD × LGD × EAD como base cuantitativa del riesgo de crédito.',
    progress: 12,
    difficulty: 'Intermedio',
  },
  {
    slug: 'model-validation',
    title: 'Validación de modelos',
    phase: 'Fase 14 · Validación bancaria',
    subtitle: 'Framework conceptual para validar datos, performance, estabilidad y uso del modelo.',
    progress: 0,
    difficulty: 'Experto',
  },
];
