import "../styles/components/edit-list-dialog.css";
type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newListName: string;
  setNewListName: (v: string) => void;
  newListCategory: string;
  setNewListCategory: (v: string) => void;
  onConfirm: () => void;
};

export function EditListDialog({
  open,
  onOpenChange,
  newListName,
  setNewListName,
  newListCategory,
  setNewListCategory,
  onConfirm,
}: Props) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={() => onOpenChange(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Edit Shopping List</h3>
          <p className="modal-description">Update your shopping list details</p>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="editListName" className="form-label">List Name</label>
            <input
              id="editListName"
              placeholder="e.g., Weekly Groceries"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="editListCategory" className="form-label">Category</label>
            <input
              id="editListCategory"
              placeholder="e.g., Groceries, Hardware"
              value={newListCategory}
              onChange={(e) => setNewListCategory(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={() => onOpenChange(false)}>
            Cancel
          </button>
          <button className="btn" onClick={onConfirm}>Update List</button>
        </div>
      </div>
    </div>
  );
}
