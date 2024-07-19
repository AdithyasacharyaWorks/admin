import { z } from "zod";

export const roomTableSchema = z.object({
  id:z.string().optional(),
  tableNumberOrRoomNumber: z.string().min(1,"Room/Table Number is required"),
  tableOrRoomName: z.string().optional(),
  roomNumber: z.string().optional(),
  capacity: z.number().int().nonnegative("Capacity must be a positive integer"),
  floor: z.number().int().nonnegative("Floor must be a positive integer"),
  occupied: z.boolean().optional(),
  qrCode: z.string().optional(),
  notes: z.string().optional(),
});
