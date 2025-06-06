import { z } from "zod";

export const campSchema = z.object({
    campName: z.string().min(3, { message: "Camp name must be at least 3 characters long" }),
    image: z.instanceof(File),
    campFees: z.number().min(0, { message: "Camp fees must be a positive number" }),
    date: z.string().min(10, { message: "Dateline must be in the format YYYY-MM-DD " }),
    time: z.string().min(1, { message: "Time must be required" }),
    location: z.string(),
    healthcareProfessional: z.string(),
    participantCount: z.number(),
    description: z.string(),
});