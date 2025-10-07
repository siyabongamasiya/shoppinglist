import { useState } from "react";
import { Navigation } from "../components/Navigation";
import {
  Plus,
  Edit,
  Trash2,
  Share2,
  ArrowLeft,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import "../styles/ShoppingListDetail.css";
import "../styles/HomePage.css";
import type { ShoppingList, ShoppingListItem } from "../models/models";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import {
  addListItem,
  deleteListItem,
  editListItem,
} from "../features/shoppingListManagement";
import { generateUniqueId } from "../../utilities";
import { type UserState } from "../features/userManagement";

export function ShoppingListDetail() {
  const dispatch = useAppDispatch();
  const user: UserState = useAppSelector((state) => state.userManagement);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ShoppingListItem | null>(null);
  const { id } = useParams();
  const list = user.shoppingLists.find((l) => l.ShoppingListId === id);

  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("1");
  const [itemCategory, setItemCategory] = useState("");
  const [itemNotes, setItemNotes] = useState("");
  const [itemImage, setItemImage] = useState("");
  const navigate = useNavigate();

  const getItemsIfComingFromShare = () => {
    //to do
  }

  const addItem = () => {
    dispatch(
      addListItem({
        email: user.EmailAddress,
        shoppingListId: id!,
        shoppingListItem: {
          ShoppingListItemId: generateUniqueId(),
          ShoppingListItemName: itemName,
          ShoppingListItemQuantity: itemQuantity,
          ShoppingListItemCategory: itemCategory,
          ShoppingListItemNotes: itemNotes,
          ShoppingListitemImage: itemImage,
        },
        onShoplistItemAdded: () => {},
      })
    );
  };

  const resetForm = () => {
    setItemName("");
    setItemQuantity("1");
    setItemCategory("");
    setItemNotes("");
    setItemImage("");
  };

  const handleAddItem = () => {
    if (!itemName || !itemQuantity || !itemCategory) {
      toast.error("Please fill in required fields");
      return;
    }

    const quantity = parseInt(itemQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    resetForm();
    setIsAddDialogOpen(false);
    addItem();
    toast.success("Item added!");
  };

  const handleUpdateItem = () => {
    const email = user.EmailAddress;
    const shoppingListId = id as string;
    const shoppingListItemId = editingItem!.ShoppingListItemId;

    if (!editingItem || !itemName || !itemQuantity || !itemCategory) {
      toast.error("Please fill in required fields");
      return;
    }

    const quantity = parseInt(itemQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    dispatch(
      editListItem({
        email,
        shoppingListId,
        shoppingListItemId,
        updatedItemData: {
          ShoppingListItemName: itemName,
          ShoppingListItemQuantity: itemQuantity,
          ShoppingListItemNotes: itemNotes,
          ShoppingListItemCategory: itemCategory,
          ShoppingListitemImage: itemImage,
        },
      })
    );

    resetForm();
    setEditingItem(null);
    setIsEditDialogOpen(false);
    toast.success("Item updated!");
  };

  const handleDeleteItem = (shoppingListItemId: string, itemName: string) => {
    const email = user.EmailAddress;
    const shoppingListId = id as string;

    if (confirm(`Remove "${itemName}" from the list?`)) {
      dispatch(deleteListItem({ email, shoppingListId, shoppingListItemId }));
      toast.success("Item removed!");
    }
  };

  const openEditDialog = (item: ShoppingListItem) => {
    setEditingItem(item);
    setItemName(item.ShoppingListItemName);
    setItemQuantity(item.ShoppingListItemQuantity.toString());
    setItemCategory(item.ShoppingListItemCategory);
    setItemNotes(item.ShoppingListItemNotes);
    setIsEditDialogOpen(true);
  };

  const handleShareList = () => {
    // Mock share functionality
    const shareUrl = `http://localhost:5174/listItems/${list!.ShoppingListId}`;
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success("Share link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
  };

  return (
    <div className="list-detail-page">
      <Navigation
        user={user}
        onNavigateToHome={() => navigate("/")}
        onLogout={() => navigate("/login")}
        currentPage="list-detail"
      />

      <div className="list-detail-container">
        {/* Header */}
        <button className="back-button" onClick={() => navigate("/")}>
          <ArrowLeft />
          Back to Lists
        </button>

        <div className="list-detail-header">
          <div className="list-detail-info">
            <h1>{list!.ShoppingListName}</h1>
            <p>{list!.ShoppingListcategory}</p>
          </div>

          <div className="list-detail-actions">
            <button className="btn btn-outline" onClick={handleShareList}>
              <Share2 />
              Share List
            </button>
            <button onClick={() => setIsAddDialogOpen(true)} className="btn">
              <Plus />
              Add Item
            </button>
          </div>
        </div>

        {/* Items */}
        {list!.ShoppingListItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-content">
              <div className="empty-icon">
                <Plus />
              </div>
              <div>
                <h3>No items yet</h3>
                <p>Start adding items to your shopping list</p>
              </div>
              <button onClick={() => setIsAddDialogOpen(true)} className="btn">
                <Plus />
                Add First Item
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Mobile Cards View */}
            <div className="mobile-view">
              {list!.ShoppingListItems.map((item) => (
                <div key={item.ShoppingListItemId} className="item-card">
                  <div className="item-card-header">
                    <div className="item-card-title-row">
                      <div className="item-card-title-content">
                        <h4 className="item-card-title">
                          {item.ShoppingListItemName}
                        </h4>
                        <p className="item-card-description">
                          Qty: {item.ShoppingListItemQuantity} •{" "}
                          {item.ShoppingListItemCategory}
                        </p>
                      </div>
                      {/* {item.image && (
                        <div className="item-image-placeholder">
                          <ImageIcon />
                        </div>
                      )} */}
                    </div>
                  </div>
                  {item.ShoppingListItemNotes && (
                    <div className="item-card-content">
                      <p className="item-card-notes">
                        {item.ShoppingListItemNotes}
                      </p>
                    </div>
                  )}
                  <div className="item-card-footer">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => openEditDialog(item)}
                    >
                      <Edit />
                      Edit
                    </button>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() =>
                        handleDeleteItem(
                          item.ShoppingListItemId,
                          item.ShoppingListItemName
                        )
                      }
                    >
                      <Trash2 />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="desktop-view table-card">
              <table className="table">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Category</th>
                    <th>Notes</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {list!.ShoppingListItems.map((item) => (
                    <tr key={item.ShoppingListItemId}>
                      <td>
                        <div className="table-cell-content">
                          {/* {item.image && (
                            <div className="table-image">
                              <ImageIcon />
                            </div>
                          )} */}
                          {item.ShoppingListItemName}
                        </div>
                      </td>
                      <td>{item.ShoppingListItemQuantity}</td>
                      <td>{item.ShoppingListItemCategory}</td>
                      <td className="table-notes">
                        {item.ShoppingListItemNotes}
                      </td>
                      <td className="text-right">
                        <div className="table-actions">
                          <button
                            className="btn-ghost btn-sm"
                            onClick={() => openEditDialog(item)}
                          >
                            <Edit />
                          </button>
                          <button
                            className="btn-ghost btn-sm"
                            onClick={() =>
                              handleDeleteItem(
                                item.ShoppingListItemId,
                                item.ShoppingListItemName
                              )
                            }
                          >
                            <Trash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Add Item Dialog */}
      {isAddDialogOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsAddDialogOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Item</h3>
              <p className="modal-description">
                Add a new item to your shopping list
              </p>
            </div>

            <div className="modal-scrollable">
              <div className="form-group">
                <label htmlFor="itemName" className="form-label">
                  Item Name <span className="form-required">*</span>
                </label>
                <input
                  id="itemName"
                  placeholder="e.g., Milk"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="itemQuantity" className="form-label">
                    Quantity <span className="form-required">*</span>
                  </label>
                  <input
                    id="itemQuantity"
                    type="number"
                    min="1"
                    placeholder="1"
                    value={itemQuantity}
                    onChange={(e) => setItemQuantity(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="itemCategory" className="form-label">
                    Category <span className="form-required">*</span>
                  </label>
                  <input
                    id="itemCategory"
                    placeholder="e.g., Dairy"
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="itemNotes" className="form-label">
                  Notes (optional)
                </label>
                <textarea
                  id="itemNotes"
                  placeholder="Additional details..."
                  value={itemNotes}
                  onChange={(e) => setItemNotes(e.target.value)}
                  className="form-textarea"
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label htmlFor="itemImage" className="form-label">
                  Image URL (optional)
                </label>
                <input
                  id="itemImage"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={itemImage}
                  onChange={(e) => setItemImage(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => {
                  setIsAddDialogOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
              <button className="btn" onClick={handleAddItem}>
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Dialog */}
      {isEditDialogOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsEditDialogOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Edit Item</h3>
              <p className="modal-description">Update the item details</p>
            </div>

            <div className="modal-scrollable">
              <div className="form-group">
                <label htmlFor="editItemName" className="form-label">
                  Item Name <span className="form-required">*</span>
                </label>
                <input
                  id="editItemName"
                  placeholder="e.g., Milk"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="editItemQuantity" className="form-label">
                    Quantity <span className="form-required">*</span>
                  </label>
                  <input
                    id="editItemQuantity"
                    type="number"
                    min="1"
                    placeholder="1"
                    value={itemQuantity}
                    onChange={(e) => setItemQuantity(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="editItemCategory" className="form-label">
                    Category <span className="form-required">*</span>
                  </label>
                  <input
                    id="editItemCategory"
                    placeholder="e.g., Dairy"
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="editItemNotes" className="form-label">
                  Notes (optional)
                </label>
                <textarea
                  id="editItemNotes"
                  placeholder="Additional details..."
                  value={itemNotes}
                  onChange={(e) => setItemNotes(e.target.value)}
                  className="form-textarea"
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label htmlFor="editItemImage" className="form-label">
                  Image URL (optional)
                </label>
                <input
                  id="editItemImage"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={itemImage}
                  onChange={(e) => setItemImage(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setEditingItem(null);
                  resetForm();
                }}
              >
                Cancel
              </button>
              <button className="btn" onClick={handleUpdateItem}>
                Update Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
