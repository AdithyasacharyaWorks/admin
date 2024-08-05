import { error } from "console";
import { number, z } from "zod";

// Define the Zod schema
export const menuItemSchema = z.object({
  $id:z.string().optional(),
  menuItemName: z.string().min(1, "Menu item name is required"),
  menuDescription: z.string().min(1, "Menu description is required"),
  imageUrl: z.string().url("Invalid URL format").optional(),
  featured: z.boolean().optional(),
  available: z.boolean().optional(),
  price: z.number().optional(),
  $createdAt: z.date().optional(),
  $updatedAt: z.date().optional(),
  tags: z.string().optional(),
  labels:z.string().optional(),
  category: z.string().min(1, "Category is required"),
});

export type MenuItem = z.infer<typeof menuItemSchema>;





// found this bug where I was trying to submit the form price as number but as I submit it was throwing error
// not a number
// then fixed that issue with this 
// <input
//                 type="number"
//                 step="0.01"
//                 {...register("price",{valueAsNumber: true,})}
//                 className="mt-1 p-2 w-full border rounded-md"
//               />

//               by adding this  {...register("price",{valueAsNumber: true,})} in the input field