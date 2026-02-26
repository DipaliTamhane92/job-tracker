import { useState } from "react";
import type { Job } from "../types/job.ts";
import JobCard from "../components/jobs/jobCards";
import DashboardStats from "../components/dashboard/statsCards.tsx";

const JobListPage = () => {
    const [jobs, setJobs] = useState<Job[]>(() => {
         const storedJobs = localStorage.getItem("jobs");
         return storedJobs ? JSON.parse(storedJobs) : [];
    });

    const [editingJob, setEditingJob] = useState<Job | null>(null);

    const saveToLocalStorage = (updatedJobs: Job[]) => {
        localStorage.setItem("jobs", JSON.stringify(updatedJobs));
     };

     const handleDelete = (id: string) => {
        const updatedJobs = jobs.filter((job) => job.id !== id);
        setJobs(updatedJobs);
        saveToLocalStorage(updatedJobs);
     };

     const handleEdit = (job: Job) => {
         setEditingJob(job);
     };

     const handleUpdate = () => {
        if (!editingJob) return;

        const updatedJobs = jobs.map((job) =>
        job.id === editingJob.id ? editingJob : job
        );

         setJobs(updatedJobs);
         saveToLocalStorage(updatedJobs);
        setEditingJob(null);
     };

    const [filter, setFilter] = useState("All");

    // useEffect(() => {
    //     const storedJobs = localStorage.getItem("jobs");
    //     if (storedJobs) {
    //         setJobs(JSON.parse(storedJobs));
    //     }
    //  }, []);

    // const filteredJobs = filter === "All" ? jobs : jobs.filter((job) => job.status === filter);

    return (
        <div>
            <DashboardStats jobs={jobs} />
            <h2> Job Applications</h2>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
                <option value="Offer">Offer</option>
            </select>
            {editingJob && (
                <div style={{ marginBottom: "20px" }}>
                <input
                    value={editingJob.company}
                    onChange={(e) =>
                    setEditingJob({ ...editingJob, company: e.target.value })
                    }
                />
                <button onClick={handleUpdate}>Save</button>
                </div>
            )}
            {/* <div style={{marginTop:"20px"}}>
                {filteredJobs.length === 0 ? (
                    <p>No jobs found</p>
                    ) : (
                    filteredJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))
                )}
            </div> */}
            {jobs.map((job) => (
                <JobCard
                key={job.id}
                job={job}
                onDelete={handleDelete}
                onEdit={handleEdit}
                />
            ))}
        </div>
    );
};

export default JobListPage;