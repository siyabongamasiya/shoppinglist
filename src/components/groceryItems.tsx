import React from "react";
import type { ShoppingList, ShoppingListItem } from "../models/models";

interface GroceryItemProps {
  groceryItems: ShoppingListItem[];
}

export default function GroceryItem({ groceryItems }: GroceryItemProps) {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Category</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {groceryItems.map((item) => (
          <tr>
            <td>{item.ShoppingListItemName}</td>
            <td>{item.ShoppingListItemQuantity}</td>
            <td>{item.ShoppingListItemCategory}</td>
            <td>{item.ShoppingListItemNotes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
