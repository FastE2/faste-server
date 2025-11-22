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

export const UpdateManyWidgetsSchema = z
  .object({
    widgets: z.array(
      z.object({
        id: z.number(),
        widgetIndex: z.number().optional(),
        name: z.string().nullable().optional(),
        type: z.nativeEnum(WidgetType),
        isVisible: z.boolean().optional(),
        viewConfig: z.any().optional(),
      }),
    ),
  })
  .strict();

export type CreateWidgetBodyType = z.infer<typeof CreateWidgetBodySchema>;
export type UpdateWidgetBodyType = z.infer<typeof UpdateWidgetBodySchema>;
export type UpdateManyWidgetsType = z.infer<typeof UpdateManyWidgetsSchema>;
