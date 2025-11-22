import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name must be at most 50 characters"),
  description: z.string().max(500, "Description must be at most 500 characters").optional(),
  color: z
    .string()
    .regex(/^#?[0-9A-Fa-f]{6}$/, "Color must be a valid hex color (e.g. #3498db)")
    .optional()
    .or(z.literal(""))
});

export type CategoryFormValues = z.infer<typeof createCategorySchema>;
