import {z} from 'zod';

export const todoSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be at most 100 characters"),
    description: z.string().max(500, "Description must be at most 500 characters").optional(),
    dueDate: z.string().optional(),
    category: z.string().optional(),
    status: z.enum(['pending', 'in-progress', 'completed']),
    priority: z.enum(['low', 'medium', 'high']),
});

export type TodoFormData = z.infer<typeof todoSchema>;
