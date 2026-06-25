export default () => ({
  port: parseInt(process.env.PORT ?? '4000', 10),
  mongoUri: process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/webdiamond',
  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret',
  jwtExpires: process.env.JWT_EXPIRES ?? '7d',
  adminEmail: process.env.ADMIN_EMAIL ?? 'admin@webdiamond.com',
  adminPassword: process.env.ADMIN_PASSWORD ?? 'admin123',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  uploadDir: process.env.UPLOAD_DIR ?? 'uploads',
  publicUrl: process.env.PUBLIC_URL ?? 'http://localhost:4000',
});
