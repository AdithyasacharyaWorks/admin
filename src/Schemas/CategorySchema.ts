// // schemas/categorySchema.ts
// import { z } from "zod";

// export const categorySchema = z.object({
//   id: z.string().optional(),
//   name: z.string().min(1, "Name is required"),
//   description: z.string().min(1, "Description is required"),
//   imageUrl: z.string().optional(),
//   slug: z.string().min(1, "Slug is required"),
//   // isActive: z.boolean(),
//   // createdAt: z.date().default(new Date()),
//   // updatedAt: z.date().default(new Date()),
// });

// export type Category = z.infer<typeof categorySchema>;

// schemas/categorySchema.ts
import { z } from "zod";

export const categorySchema = z.object({
  $id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url().optional(),  // Assuming imageUrl is a valid URL
  slug: z.string().min(1, "Slug is required"),
  $createdAt: z.string().optional(),  // Use string to match the ISO date format
  $updatedAt: z.string().optional(),  // Use string to match the ISO date format
});

export type Category = z.infer<typeof categorySchema>;
