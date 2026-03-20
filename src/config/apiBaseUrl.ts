const envUrl = (import.meta as any).env?.VITE_API_URL as string | undefined;

const defaultUrl =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://shoppinglist-json-server-ikt2.onrender.com";

export const API_BASE_URL = (envUrl?.replace(/\/$/, "") || defaultUrl).replace(
  /\/$/,
  "",
);
