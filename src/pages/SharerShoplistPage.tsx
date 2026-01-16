import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Navigation } from "../components/Navigation";
import "../styles/ShoppingListDetail.css";
import "../styles/HomePage.css";
import {
  getListFromLocalStorage,
  getSharerList,
  saveToLocalStorage,
  type SharerListState,
} from "../features/sharerListmanagement";
import { useEffect } from "react";
import { decrypt } from "../features/userManagement";

export function SharerShopListPage() {
  let sharerShopListState: SharerListState = useAppSelector(
    (state) => state.sharerListManagement
  );

  sharerShopListState.ShoppingListItems.length === 0
    ? saveToLocalStorage(sharerShopListState)
    : "";

  if (sharerShopListState.ShoppingListItems.length === 0) {
    sharerShopListState = getListFromLocalStorage()!;
  }

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { email, id } = useParams();

  const decryptedEmail = decrypt(email!);

  useEffect(() => {
    dispatch(getSharerList({ email: decryptedEmail!, shoppingListId: id }));
  }, []);

  return (
    <div className="list-detail-page">
      {/* Navigation */}
      <Navigation
        user={null}
        hasNavButtons={false}
        onNavigateToHome={() => navigate("/")}
        onLogout={() => navigate("/login")}
        currentPage="list-detail"
      />

      <div className="list-detail-container">
        {/* Header */}
        <div className="list-detail-header">
          <div className="list-detail-info">
            <h1>
              {sharerShopListState.ShoppingListName || "Shared Shopping List"}
            </h1>
            <p>{sharerShopListState.ShoppingListcategory || "No category"}</p>
            <p className="list-date">
              {sharerShopListState.ShoppingListDate || "No date available"}
            </p>
          </div>
        </div>

        {/* Items */}
        {sharerShopListState.ShoppingListItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-content">
              <div className="empty-icon">🛒</div>
              <div>
                <h3>No items available</h3>
                <p>The sharer has not added any items to this list yet.</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Mobile Cards View */}
            <div className="mobile-view">
              {sharerShopListState.ShoppingListItems.map((item) => (
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
                    </div>
                  </div>

                  {item.ShoppingListItemNotes && (
                    <div className="item-card-content">
                      <p className="item-card-notes">
                        {item.ShoppingListItemNotes}
                      </p>
                    </div>
                  )}
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
                  </tr>
                </thead>
                <tbody>
                  {sharerShopListState.ShoppingListItems.map((item) => (
                    <tr key={item.ShoppingListItemId}>
                      <td>{item.ShoppingListItemName}</td>
                      <td>{item.ShoppingListItemQuantity}</td>
                      <td>{item.ShoppingListItemCategory}</td>
                      <td className="table-notes">
                        {item.ShoppingListItemNotes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
