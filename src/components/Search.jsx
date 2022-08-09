const Search = ({ search, searchInput, handleSearch }) => {
  return (
    <div className="input-group input-group-sm mb-2" style={{ width: "272px" }}>
      <input
        type="text"
        className="form-control"
        placeholder="Busqueda"
        value={search}
        ref={searchInput}
        onChange={handleSearch}
      />
      <span className="input-group-text">
        <i className="fa-solid fa-magnifying-glass"></i>
      </span>
    </div>
  )
}

export default Search;
