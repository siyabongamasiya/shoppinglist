import { Calendar, Edit, Eye, Search, Trash2 } from "lucide-react";
import "../styles/components/shopping-lists-grid.css";
import type { ShoppingList } from "../models/models";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteList } from "../features/shoppingListManagement";

type Props = {
  lists: ShoppingList[];
  searchQuery: string;
  onCreateClick: () => void;
  onEdit: (list: ShoppingList) => void;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function ShoppingListsGrid({
  lists,
  searchQuery,
  onCreateClick,
  onEdit,
}: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userManagement);



  const handleDeleteList = (list : ShoppingList) => {
    if (confirm(`Are you sure you want to delete "${list.ShoppingListName}"?`)) {
      dispatch(deleteList({
        email: user.EmailAddress,
        shoppingListId: list.ShoppingListId
      }))
    }
  };

  if (!lists.length) {
    return (
      <div className="empty-state">
        <div className="empty-state-content">
          <div className="empty-icon">
            <Search />
          </div>
          <div>
            <h3>No shopping lists found</h3>
            <p>
              {searchQuery
                ? "Try adjusting your search"
                : "Create your first shopping list to get started"}
            </p>
          </div>
          {!searchQuery && (
            <button onClick={onCreateClick} className="btn">
              Create Shopping List
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="lists-grid">
      {lists.map((list) => (
        <div key={list.ShoppingListId} className="list-card">
          <div className="list-card-header">
            <div className="list-card-title-row">
              <div className="list-card-title-content">
                <h3 className="list-card-title">{list.ShoppingListName}</h3>
                <p className="list-card-description">
                  {list.ShoppingListcategory}
                </p>
              </div>
            </div>
          </div>

          <div className="list-card-content">
            <div className="list-card-date">
              <Calendar />
              <span>{formatDate(new Date(list.ShoppingListDate))}</span>
            </div>
            <p className="list-card-items">
              {list.ShoppingListItems.length}{" "}
              {list.ShoppingListItems.length === 1 ? "item" : "items"}
            </p>
          </div>

          <div className="list-card-footer">
            <button
              className="btn btn-outline"
              onClick={() => {
                navigate(`/listItems/${list.ShoppingListId}`);
              }}
            >
              <Eye />
              View
            </button>
            <button className="btn-ghost btn-sm" onClick={() => onEdit(list)}>
              <Edit />
            </button>
            <button
              className="btn-ghost btn-sm"
              onClick={() =>
                handleDeleteList(list)
              }
            >
              <Trash2 />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
