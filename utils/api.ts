const DEFAULT_API_URL = "http://localhost:4000/api";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;

export async function apiFetch<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("wd_access_token") : null;

  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = "Đã xảy ra lỗi hệ thống";
    try {
      const errPayload = await response.json();
      if (errPayload && errPayload.message) {
        errorMessage = Array.isArray(errPayload.message)
          ? errPayload.message.join(", ")
          : errPayload.message;
      }
    } catch {
      // ignore
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return {} as T;
  }

  const text = await response.text();
  if (!text) return {} as T;
  return JSON.parse(text) as T;
}
