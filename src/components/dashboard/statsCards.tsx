import type { Job } from "../../types/job"

interface Props {
  jobs: Job[];
}

const DashboardStats = ({ jobs }: Props) => {
  const applied = jobs.filter(j => j.status === "Applied").length;
  const interview = jobs.filter(j => j.status === "Interview").length;
  const offer = jobs.filter(j => j.status === "Offer").length;
  const rejected = jobs.filter(j => j.status === "Rejected").length;

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
      <div>Applied: {applied}</div>
      <div>Interview: {interview}</div>
      <div>Offer: {offer}</div>
      <div>Rejected: {rejected}</div>
    </div>
  );
};

export default DashboardStats;