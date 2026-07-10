import { apiFetch } from "@/utils/api";

// Upload 1 ảnh lên backend (POST /admin/uploads) và trả URL công khai bền vững.
// apiFetch tự bỏ Content-Type khi body là FormData để browser tự set boundary.
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("files", file);

  const res = await apiFetch<{ urls: string[] }>("/admin/uploads", {
    method: "POST",
    body: formData,
  });

  if (!res?.urls?.length) {
    throw new Error("Tải ảnh lên thất bại");
  }
  return res.urls[0];
}
