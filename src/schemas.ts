import { z } from "zod";

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  done: z.boolean(),
  dueDate: z.string().optional(),
});

export type Task = z.infer<typeof TaskSchema>;
