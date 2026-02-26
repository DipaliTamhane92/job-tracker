export interface Job {
    id: number;
    company: string;
    role: string;
    status: string; //"Applied" | "Interview" | "Rejected" | "Offer";
    date: string;
    note: string;
}

export type JobInput = Omit<Job, "id">;