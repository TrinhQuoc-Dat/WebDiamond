/**
 * Helper nhận diện link media, dùng chung cho Hero (banner trang chủ) và showcase
 * trang /custom. Trước đây hai chỗ này tự viết regex riêng — để lệch nhau là một chỗ
 * nhận link còn chỗ kia thì không.
 */

/** Link chia sẻ Google Drive → URL tải trực tiếp (dùng làm `src` cho <video>). */
export function getGoogleDriveDirectLink(url: string): string | null {
  const match = url.match(/\/file\/d\/([^/]+)/) || url.match(/[?&]id=([^&]+)/);
  return match?.[1] ? `https://docs.google.com/uc?export=download&id=${match[1]}` : null;
}

/** Link YouTube (chia sẻ/watch/embed) → video ID, hoặc null nếu không phải YouTube. */
export function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]{11})/);
  return match?.[1] ?? null;
}

/** Đuôi file video hay gặp — dùng để đoán loại khi dữ liệu cũ chưa có `mediaType`. */
const VIDEO_EXTENSIONS = /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i;

/**
 * Đoán một URL có phải video không. Chỉ dùng cho dữ liệu cũ lưu trước khi có
 * `mediaType`; dữ liệu mới luôn có field tường minh nên không phải đoán.
 */
export function looksLikeVideo(url: string): boolean {
  if (!url) return false;
  return VIDEO_EXTENSIONS.test(url) || getYouTubeId(url) !== null;
}
