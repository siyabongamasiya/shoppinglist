interface LogoProps {
  src: string;   
  alt: string; 
  text: string;   
}

export default function Logo({ src, alt, text }: LogoProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <img src={src} alt={alt} style={{ width: "40px", height: "40px" }} />
      <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{text}</span>
    </div>
  );
}
