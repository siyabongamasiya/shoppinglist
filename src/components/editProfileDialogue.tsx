import React from "react";
import Button from "./button";
import InputField from "./inputField";

interface EditProfileDialogueProps {
  name: string;
  surname: string;
  email: string;
  cellNumber: string;
  onUpdate: () => void;
  onCancel: () => void;
  onChange: (field: string, value: string) => void;
}

export default function EditProfileDialogue({
  name,
  surname,
  email,
  cellNumber,
  onUpdate,
  onCancel,
  onChange,
}: EditProfileDialogueProps) {
  return (
    <div className="dialogue">
      <div className="dialogue-header">
        <h2>Edit Profile</h2>
        <p>Update your personal information</p>
      </div>

      <div className="dialogue-row">
        <InputField
          label="Name"
          value={name}
          placeholder="Name"
          onChange={(e) => onChange("name", e.target.value)}
        />
        <InputField
          label="Surname"
          placeholder="Surname"
          value={surname}
          onChange={(e) => onChange("surname", e.target.value)}
        />
      </div>

      <div className="dialogue-column">
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="Email"
        />
        <InputField
          label="Cell Number"
          value={cellNumber}
          onChange={(e) => onChange("cellNumber", e.target.value)}
          placeholder="+1234567890"
        />
      </div>

      <div className="dialogue-actions">
        <Button
          text="Cancel"
          onClick={onCancel}
          style={{
            cursor:"pointer",
            backgroundColor:"white",
            color: "black",
            border: "1px solid black",
            borderRadius: "5px",
            padding: "20px",
          }}
        />
        <Button
          text="Update Profile"
          onClick={onUpdate}
          style={{
            cursor:"pointer",
            backgroundColor: "black",
            color: "white",
            border: "1px solid transparent",
            borderRadius: "5px",
            padding: "20px",
          }}
        />
      </div>
    </div>
  );
}
