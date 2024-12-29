import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "@/db/firestore";

export const sendEmail = async (email: string, subject: string, text: string) => {
    const functions = getFunctions(app);

    try {
        const sendEmailFunction = httpsCallable(functions, "sendEmail");
        const result = await sendEmailFunction({ email, subject, text });
        return result.data;
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email.");
    }
};
