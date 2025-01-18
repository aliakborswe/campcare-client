import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  photoURL: z.string().url({
    message: "Please enter a valid URL for the profile photo.",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .refine(
      (value) => /[A-Z]/.test(value), // Must have at least one uppercase letter
      { message: "Password must contain at least one uppercase letter." }
    )
    .refine(
      (value) => /[a-z]/.test(value), // Must have at least one lowercase letter
      { message: "Password must contain at least one lowercase letter." }
    ),
});