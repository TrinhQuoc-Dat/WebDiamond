import { Test, TestingModule } from '@nestjs/testing';
import { UploadsController } from '../src/uploads/uploads.controller';
import { JwtAuthGuard } from '../src/common/guards/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';

describe('UploadsController', () => {
  let controller: UploadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadsController],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => true,
      })
      .compile();

    controller = module.get<UploadsController>(UploadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return urls when files are uploaded', () => {
    const mockFiles = [
      {
        filename: 'test-file.png',
        originalname: 'test.png',
      },
    ] as Express.Multer.File[];

    const result = controller.upload(mockFiles);
    expect(result).toHaveProperty('urls');
    expect(result.urls).toBeInstanceOf(Array);
    expect(result.urls[0]).toContain('/uploads/test-file.png');
  });

  it('should return empty urls if no files are uploaded', () => {
    const result = controller.upload(null as any);
    expect(result).toHaveProperty('urls');
    expect(result.urls).toEqual([]);
  });
});
