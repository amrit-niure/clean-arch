import { z } from 'zod';
import { roleEnum } from '@/db/drizzle/schema/enums';

export const userSchema = z.object({
    firstName: z.string()
        .min(2, { message: "First name must be at least 2 characters long" })
        .max(50, { message: "First name cannot exceed 50 characters" }),
    middleName: z.string()
        .max(50, { message: "Middle name cannot exceed 50 characters" })
        .optional(),
    lastName: z.string()
        .min(2, { message: "Last name must be at least 2 characters long" })
        .max(50, { message: "Last name cannot exceed 50 characters" }),
    email: z.string()
        .email({ message: "Invalid email address" })
        .max(255, { message: "Email address cannot exceed 255 characters" }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(255, { message: "Password cannot exceed 255 characters" }),
    role: z.enum(roleEnum.enumValues, {
        errorMap: () => ({ message: "Invalid role. Must be either 'USER' or 'ADMIN'" })
    }).default('USER'),
});

export const loginSchema = z.object({
    email: z.string()
        .email({ message: "Invalid email address" })
        .max(255, { message: "Email address cannot exceed 255 characters" }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(255, { message: "Password cannot exceed 255 characters" }),
});


export type ISignUp = z.infer<typeof userSchema>
export type ISignIn = z.infer<typeof loginSchema>
