import { FileType } from '@prisma/client';
import { z } from 'zod';

export const FileSchema = z.object({
  key: z.string(),
  type: z.nativeEnum(FileType),
  size: z.number(),
  url: z.string(),
  isPublic: z.boolean(),
  createdAt: z.date().default(new Date()),
  createdById: z.number(),
});

export const PresignedUploadFileBodySchema = z
  .object({
    filename: z.string(),
    filesize: z.number().max(1 * 1024 * 1024), // 1MB
  })
  .strict();
export type PresignedUploadFileBodyType = z.infer<
  typeof PresignedUploadFileBodySchema
>;

export type FileMediaType = z.infer<typeof FileSchema>;
