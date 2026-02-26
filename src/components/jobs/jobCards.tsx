import type { Job } from "../../types/job"
import "../../styles/jobCard.css"

interface JobCardsProp {
    job: Job;
    onDelete: (id:string) => void;
    onEdit:(job:Job) => void;
}

const JobCard = ({ job, onDelete, onEdit }: JobCardsProp) => {

    const getClassStatus = () => {
        switch(job.status) {
            case "Applied":
                return "status applied";
            case "Interview":
                return "status interview";
            case "Rejected":
                return "status rejected";
            case "Offer":
                return "status offer";
            default:
                return "status"
        }
    }
    return(
        <div className="job-card">
            <h3> { job.role } </h3>
            <p><strong>Company: </strong> { job.company }</p>
            <p>
                <strong>Status:</strong>{" "}
                <span className={getClassStatus()}>
                {job.status}
                </span>
            </p>
            <p><strong>Date: </strong> { job.date }</p>
            <div className="actions">
                <button onClick={() => onEdit(job)}>Edit</button>
                <button onClick={() => onDelete(job.id)}>Delete</button>
            </div>
        </div>
    );
};

export default JobCard;