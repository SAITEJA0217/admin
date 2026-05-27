import { z } from "zod";

const currentYear = new Date().getFullYear();

export const founderProfileSchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(255, "Company name must be less than 255 characters"),

  tagline: z
    .string()
    .max(255, "Tagline must be less than 255 characters")
    .optional()
    .or(z.literal("")),

  description: z
    .string()
    .max(5000, "Description must be less than 5000 characters")
    .optional()
    .or(z.literal("")),

  Industry: z
    .string()
    .max(100, "Industry must be less than 100 characters")
    .optional()
    .or(z.literal("")),

  stage: z
    .string()
    .max(50, "Stage must be less than 50 characters")
    .optional()
    .or(z.literal("")),

  fundingGoal: z
    .coerce
    .number()
    .min(0, "Funding goal cannot be negative")
    .optional(),

  fundingRaised: z
    .coerce
    .number()
    .min(0, "Funding raised cannot be negative")
    .optional(),

  logoUrl: z
    .string()
    .url("Please enter a valid logo URL")
    .optional()
    .or(z.literal("")),

  websiteUrl: z
    .string()
    .url("Please enter a valid website URL")
    .optional()
    .or(z.literal("")),

  linkedinUrl: z
    .string()
    .url("Please enter a valid LinkedIn URL")
    .optional()
    .or(z.literal("")),

  pitchDeckKey: z
    .string()
    .optional()
    .or(z.literal("")),

  location: z
    .string()
    .max(255, "Location must be less than 255 characters")
    .optional()
    .or(z.literal("")),

  foundedYear: z
    .coerce
    .number()
    .min(1900, "Founded year must be after 1900")
    .max(currentYear, `Founded year cannot exceed ${currentYear}`)
    .optional(),

  employeeCount: z
    .coerce
    .number()
    .min(0, "Employee count cannot be negative")
    .optional(),
});

export type FounderProfileFormData =
  z.infer<typeof founderProfileSchema>;