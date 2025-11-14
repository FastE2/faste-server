import { WidgetType } from '@prisma/client';
import { WIDGET_TYPE } from 'src/common/constants/widget.constant';
import { z } from 'zod';

export const WidgetSchema = z.object({
  id: z.number(),
  templateId: z.number(),
  refViewId: z.number(),
  name: z.string().nullable().optional(),
  type: z.nativeEnum(WidgetType),
  isVisible: z.boolean().default(true),
  widgetIndex: z.number(),
  viewConfig: z.any().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateWidgetBodySchema = WidgetSchema.pick({
  templateId: true,
  refViewId: true,
  name: true,
  type: true,
  isVisible: true,
  widgetIndex: true,
  viewConfig: true,
}).strict();

export const UpdateWidgetBodySchema = CreateWidgetBodySchema.partial();

export type CreateWidgetBodyType = z.infer<typeof CreateWidgetBodySchema>;
export type UpdateWidgetBodyType = z.infer<typeof UpdateWidgetBodySchema>;
