import { z } from "zod";

// Customer schema
const CustomerBaseSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string().nullable().optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  address: z.string().min(1, { message: "Address is required" }),
  passportNumber: z.string().nullable().optional(),
  currentVisa: z
    .enum([
      "SUB_500",
      "SUB_482",
      "SUB_407",
      "SUB_186",
      "SUB_189",
      "SUB_190",
      "SUB_600",
      "SUB_820",
      "SUB_801",
    ])
    .nullable()
    .optional(),
  visaExpiry: z.date().nullable().optional(),
  phone: z.string().min(1, { message: "Phone number is required" }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CustomerSchema = CustomerBaseSchema;
export const CustomerInputSchema = CustomerBaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Customer = z.infer<typeof CustomerSchema>;
export type CustomerInput = z.infer<typeof CustomerInputSchema>;
