const OrderFilterControls = ({
    sortBy,
    setSortBy,
    filterStatus,
    setFilterStatus,
    statusOptions = [],
  }) => (
    <div className="flex gap-4 mb-4 text-white">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="bg-gray-800 border text-white border-gray-600 rounded px-2 py-1"
      >
        <option value="created_at">Järjestä: Uusin ensin</option>
        <option value="status">Järjestä: Statuksen mukaan</option>
      </select>
  
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="bg-gray-800 border text-white border-gray-600 rounded px-2 py-1"
      >
        <option value="all">Näytä kaikki</option>
        {statusOptions.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
  
  export default OrderFilterControls;