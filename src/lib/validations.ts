import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const schoolSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  website: z.string().url("Invalid website URL").optional(),
  images: z.array(z.string().url("Invalid image URL")),
});

export const boardSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.enum(["SHORTBOARD", "LONGBOARD", "FISH", "GUN", "FUNBOARD", "HYBRID"]),
  size: z.number().positive("Size must be positive"),
  condition: z.enum(["NEW", "EXCELLENT", "GOOD", "FAIR", "POOR"]),
  images: z.array(z.string().url("Invalid image URL")),
  schoolId: z.string(),
});

export const bookingSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  schoolId: z.string(),
  boardId: z.string().optional(),
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
  schoolId: z.string(),
}); 