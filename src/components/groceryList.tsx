import React from "react";
import type { ShoppingList } from "../models/models";
import GroceryItem from "./groceryItems";
interface GroceriesListProps {
  shoppingListName: string;
  shoppingListDate: string;
  shoppingListcategory: string;
  shoppingListItems: string[];
  onView() : void,
  onEdit() : void,
  onDelete() : void, 
}
export default function GroceriesList({
  shoppingListName,
  shoppingListDate,
  shoppingListcategory,
  shoppingListItems,
  onView,
  onEdit,
  onDelete}: GroceriesListProps) {
  return (
    <div>
      <div>
        <p>{shoppingListName}</p>
        <p>{shoppingListcategory}</p>
      </div>
      <div>
        <p>{shoppingListDate}</p>
        <p>{` ${shoppingListItems.length} item`}</p>
      </div>
      <div>
        <div onClick={onView}>
          <img src="" alt="" />
          <p>View</p>
        </div>
        <div onClick={onEdit}>
          <img src="" alt="" />
        </div>
        <div onClick={onDelete}>
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
}
