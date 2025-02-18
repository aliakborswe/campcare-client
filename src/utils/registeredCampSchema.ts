import { z } from "zod";

export const registeredCampSchema = z.object({
    campName: z.string(),
    campFees: z.number(),
    location: z.string(),
    healthcareProfessional: z.string(),
    participantName: z.string().min(1, "Participant name is required"),
    participantEmail: z.string().email("Invalid email address"),
    age: z.string().min(1, "Age is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    gender: z.enum(["Male", "Female", "Other"]),
    emergencyContact: z.string().min(1, "Emergency contact is required"),

});