export default function Toolbar({
  selectedCount,
  onBlock,
  onUnblock,
  onDelete,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="d-flex gap-2 mb-3 align-items-center">
      <button
        className="btn btn-outline-primary"
        onClick={onBlock}
        disabled={!selectedCount}
      >
        <i className="bi bi-lock"></i> Block
      </button>
      <button
        className="btn btn-outline-primary"
        onClick={onUnblock}
        disabled={!selectedCount}
      >
        <i className="bi bi-unlock"></i>
      </button>
      <button
        className="btn btn-outline-danger"
        onClick={onDelete}
        disabled={!selectedCount}
      >
        <i className="bi bi-trash"></i> Delete
      </button>
      <input
        type="text"
        className="form-control ms-auto w-25"
        placeholder="Filter"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
