import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin/uploads')
export class UploadsController {
  constructor() {
    const dir = process.env.UPLOAD_DIR ?? 'uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          cb(null, process.env.UPLOAD_DIR ?? 'uploads');
        },
        filename: (_req, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 25 * 1024 * 1024 }, // 25MB cho cả video banner
    }),
  )
  upload(@UploadedFiles() files: Express.Multer.File[]) {
    const base = process.env.PUBLIC_URL ?? 'http://localhost:4000';
    const urls = (files ?? []).map((f) => `${base}/uploads/${f.filename}`);
    return { urls };
  }
}
