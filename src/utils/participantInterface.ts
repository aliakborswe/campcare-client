import { CampInterface } from "./campInterface";

export interface ParticipantInterface {
  _id: string;
  age: string;
  campId: CampInterface; // Reference to the Camp interface
  confirmationStatus: string;
  createdAt: string;
  emergencyContact: string;
  gender: string;
  participantEmail: string;
  participantName: string;
  paymentStatus: string;
  phoneNumber: string;
  updatedAt: string;
}