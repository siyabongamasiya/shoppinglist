interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: InputFieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: "1rem" }}>
      <label style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          padding: "0.5rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "1rem",
        }}
      />
    </div>
  );
}
