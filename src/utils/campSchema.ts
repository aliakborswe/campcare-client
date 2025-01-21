import { time } from "console";
import { z } from "zod";

export const campSchema = z.object({
    campName: z.string().min(3, { message: "Camp name must be at least 3 characters long" }),
    image: z.instanceof(File),
    campFees: z.number().min(0, { message: "Camp fees must be a positive number" }),
    date: z.string().min(10, { message: "Dateline must be in the format hh:mm am/pm YYYY-MM-DD " }),
    time: z.string().min(1, { message: "Time must be in the format hh:mm am/pm" }),
    location: z.string().min(1,{message:"Location must be required"}),
    healthcareProfessional: z.string().min(1,{message:"Healthcare Professional must be required"}),
    participantCount: z.number(),
    description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
});