import { z } from "zod";

export const campSchema = z.object({
    campName: z.string().min(3, { message: "Camp name must be at least 3 characters long" }),
    image: z.instanceof(File),
    campFees: z.number().min(0, { message: "Camp fees must be a positive number" }),
    date: z.string().min(10, { message: "Date must be in the format YYYY-MM-DD" }),
    time: z.string().min(7, { message: "Time must be in the format hh:mm am/pm" }),
    location: z.string().min(1, { message: "Location is required" }),
    healthcareProfessional: z.string().min(1, { message: "Healthcare Professional is required" }),
    participantCount: z.number(),
    description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
});