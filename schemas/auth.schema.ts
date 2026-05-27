import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;


export const signupSchema = z
    .object({
        email: z.email("Please enter a valid email address"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters"),

        confirmPassword: z.string(),

        role: z.enum([
            "FOUNDER",
            "INVESTOR",
            "MANUFACTURER",
        ]),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            path: ["confirmPassword"],
            message: "Passwords do not match",
        }
    );

export type SignupFormData = z.infer<
    typeof signupSchema
>;
