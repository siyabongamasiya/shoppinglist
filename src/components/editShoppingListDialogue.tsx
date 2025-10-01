import React from "react";
import Button from "./button";

interface EditProfileDialogueProps {
  name: string;
  category: string;
  onUpdate: () => void;
  onCancel: () => void;
}

export default function EditShoppingListDialogue({
  name,
  category,
  onUpdate,
  onCancel,
}: EditProfileDialogueProps) {
  return <div>
    <div>
        <p>Edit Shopping List</p>
        <p>Update your shopping list</p>
    </div>
    <div>
        <input type="text" />
        <input type="text" />
    </div>
    <div>
        <Button text="Cancel" onClick={onCancel} style={{}}/>
        <Button text="Update profile" onClick={onUpdate} style={{}}/>
    </div>
  </div>;
}
