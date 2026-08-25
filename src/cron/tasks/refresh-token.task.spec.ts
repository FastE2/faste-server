import { Test, TestingModule } from '@nestjs/testing';
import { RefreshTokenTask } from './refresh-token.task';
import { PrismaService } from 'src/prisma/prisma.service';

describe('RefreshTokenTask', () => {
  let task: RefreshTokenTask;
  let prisma: PrismaService;
  let loggerLogSpy: jest.SpyInstance;
  let loggerErrorSpy: jest.SpyInstance;

  const mockPrismaService = {
    refreshToken: {
      deleteMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshTokenTask,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    task = module.get<RefreshTokenTask>(RefreshTokenTask);
    prisma = module.get<PrismaService>(PrismaService);

    // Spy on the internal Logger of RefreshTokenTask
    loggerLogSpy = jest.spyOn((task as any).logger, 'log').mockImplementation();
    loggerErrorSpy = jest
      .spyOn((task as any).logger, 'error')
      .mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(task).toBeDefined();
  });

  describe('cleanupExpiredRefreshTokens', () => {
    it('should successfully delete expired tokens and log count if count > 0', async () => {
      mockPrismaService.refreshToken.deleteMany.mockResolvedValue({ count: 5 });

      await task.cleanupExpiredRefreshTokens();

      expect(mockPrismaService.refreshToken.deleteMany).toHaveBeenCalledWith({
        where: {
          expiresAt: { lt: expect.any(Date) },
        },
      });
      expect(loggerLogSpy).toHaveBeenCalledWith(
        'Running task: cleanupExpiredRefreshTokens',
      );
      expect(loggerLogSpy).toHaveBeenCalledWith(
        'Cleaned up 5 expired refresh tokens.',
      );
    });

    it('should successfully delete expired tokens but not log count if count is 0', async () => {
      mockPrismaService.refreshToken.deleteMany.mockResolvedValue({ count: 0 });

      await task.cleanupExpiredRefreshTokens();

      expect(mockPrismaService.refreshToken.deleteMany).toHaveBeenCalled();
      expect(loggerLogSpy).toHaveBeenCalledWith(
        'Running task: cleanupExpiredRefreshTokens',
      );
      expect(loggerLogSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('Cleaned up'),
      );
    });

    it('should handle errors gracefully and log the error message', async () => {
      const dbError = new Error('Database connection failed');
      mockPrismaService.refreshToken.deleteMany.mockRejectedValue(dbError);

      await task.cleanupExpiredRefreshTokens();

      expect(mockPrismaService.refreshToken.deleteMany).toHaveBeenCalled();
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        'Error in cleanupExpiredRefreshTokens: Database connection failed',
        dbError.stack,
      );
    });
  });
});
