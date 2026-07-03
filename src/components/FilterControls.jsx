import { Search, SlidersHorizontal, XCircle } from 'lucide-react';

export function FilterToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Buscar...',
  filterLabel = 'Filtrar por',
  filterValue,
  onFilterChange,
  filterOptions = [],
  resultCount,
  totalCount,
  onClear,
}) {
  const hasActiveFilters = Boolean(searchValue) || (filterValue && filterValue !== 'all');

  return (
    <section className="filter-toolbar" aria-label="Búsqueda y filtros">
      <label className="filter-search-box">
        <Search size={18} />
        <input
          type="search"
          value={searchValue}
          placeholder={searchPlaceholder}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <label className="filter-select-box">
        <SlidersHorizontal size={18} />
        <span>{filterLabel}</span>
        <select value={filterValue} onChange={(event) => onFilterChange(event.target.value)}>
          <option value="all">Todos</option>
          {filterOptions.map((option) => (
            <option value={option} key={option}>{option}</option>
          ))}
        </select>
      </label>

      <div className="filter-results-pill">
        <strong>{resultCount}</strong>
        <span>de {totalCount}</span>
      </div>

      {hasActiveFilters && (
        <button className="filter-clear-button" type="button" onClick={onClear}>
          <XCircle size={18} />
          Limpiar
        </button>
      )}
    </section>
  );
}

export function EmptyResults({ title = 'Sin resultados', description = 'Prueba cambiando la búsqueda o el filtro activo.' }) {
  return (
    <section className="empty-results-card">
      <Search size={30} />
      <h3>{title}</h3>
      <p>{description}</p>
    </section>
  );
}

export function includesQuery(values, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  return values
    .flat()
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(normalizedQuery));
}
