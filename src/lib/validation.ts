import { z } from "zod";

export const bookCallSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(120, "Name must be under 120 characters."),
  workEmail: z
    .string()
    .trim()
    .email("Please enter a valid work email address.")
    .max(160, "Email must be under 160 characters."),
  company: z
    .string()
    .trim()
    .min(2, "Please enter your company name.")
    .max(140, "Company name must be under 140 characters."),
  pipelineGoal: z
    .string()
    .trim()
    .min(10, "Please share a brief overview of your pipeline goal (at least 10 characters).")
    .max(2000, "Pipeline goal must be under 2,000 characters."),
  website: z.string().max(0, "Spam check failed.").optional(),
  recaptchaToken: z.string().optional(),
});

export type BookCallInput = z.infer<typeof bookCallSchema>;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (at least 2 characters).")
    .max(120, "Name must be under 120 characters."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(160, "Email must be under 160 characters."),
  company: z
    .string()
    .trim()
    .min(2, "Please enter your company or organization.")
    .max(140, "Company name must be under 140 characters."),
  phone: z
    .string()
    .trim()
    .max(40, "Phone number must be under 40 characters.")
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please enter a message (at least 10 characters).")
    .max(3000, "Message must be under 3,000 characters."),
  intent: z.string().trim().max(80).optional(),
  website: z.string().max(0, "Spam check failed.").optional(),
  recaptchaToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
