import React from "react";
import Button from "./button";

interface EditProfileDialogueProps {
  name: string;
  surname: string;
  email: string;
  cellNumber: string;
  onUpdate: () => void;
  onCancel: () => void;
}

export default function EditProfileDialogue({
  name,
  surname,
  email,
  cellNumber,
  onUpdate,
  onCancel,
}: EditProfileDialogueProps) {
  return (
    <div>
      <div>
        <p>Edit Profile</p>
        <p>Update your personal information</p>
      </div>
      <div>
        <input type="text" />
        <input type="text" />
      </div>
      <div>
        <input type="text" />
        <input type="text" />
      </div>
      <div>
        <Button text="Cancel" onClick={onCancel} style={{}} />
        <Button text="Update profile" onClick={onUpdate} style={{}} />
      </div>
    </div>
  );
}
