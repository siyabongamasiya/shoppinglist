import { useAppDispatch, useAppSelector } from "../../hooks";
import { addList } from "../features/shoppingListManagement";
import { ShoppingList } from "../models/models";
import "../styles/components/add-list-dialog.css";
import { generateUniqueId, getTodayDateString } from "../../utilities";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newListName: string;
  setNewListName: (v: string) => void;
  newListCategory: string;
  setNewListCategory: (v: string) => void;
  onConfirm: () => void;
};

export function AddListDialog({
  open,
  onOpenChange,
  newListName,
  setNewListName,
  newListCategory,
  setNewListCategory,
  onConfirm,
}: Props) {
  if (!open) return null;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userManagement);

  const handleConfirm = (shoppingList: ShoppingList) => {
    dispatch(
      addList({
        email: user.EmailAddress,
        shoppingList,
        onShoplistAdded:onConfirm,
      })
    );
  };

  return (
    <div className="modal-overlay" onClick={() => onOpenChange(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Create Shopping List</h3>
          <p className="modal-description">
            Add a new shopping list to organize your items
          </p>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="listName" className="form-label">
              List Name
            </label>
            <input
              id="listName"
              placeholder="e.g., Weekly Groceries"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="listCategory" className="form-label">
              Category
            </label>
            <input
              id="listCategory"
              placeholder="e.g., Groceries, Hardware"
              value={newListCategory}
              onChange={(e) => setNewListCategory(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </button>
          <button
            className="btn"
            onClick={() => {
              handleConfirm(
                new ShoppingList(
                  generateUniqueId(),
                  newListName,
                  getTodayDateString(),
                  newListCategory,
                  []
                )
              );
            }}
          >
            Create List
          </button>
        </div>
      </div>
    </div>
  );
}
