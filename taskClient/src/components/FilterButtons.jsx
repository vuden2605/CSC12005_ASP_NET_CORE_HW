// src/components/FilterButtons.jsx
function FilterButtons({ currentFilter, onFilterChange, taskCounts }) {
    const filters = [
      { key: 'all', label: 'Tất cả', icon: '📋' },
      { key: 'Đang làm', label: 'Đang làm', icon: '🔄' },
      { key: 'Hoàn thành', label: 'Hoàn thành', icon: '✅' }
    ];
  
    return (
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.key)}
          >
            <span className="filter-icon">{filter.icon}</span>
            <span className="filter-label">{filter.label}</span>
            <span className="filter-count">({taskCounts[filter.key] || 0})</span>
          </button>
        ))}
      </div>
    );
  }
  
  export default FilterButtons;