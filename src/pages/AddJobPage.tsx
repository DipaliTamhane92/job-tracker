import { useState } from "react";
import Input from "../components/common/input";
import Select from "../components/common/select";
import type { Job } from "../types/job";
import { addJob, updateJob } from "../db";

interface Props {
  selectedJob?: Job | null;
  refresh: () => void;
  clearSelection: () => void;
}

const AddJobPage = ({
  selectedJob,
  refresh,
  clearSelection,
}: Props) => {
  // 1. Local State initialized from props
  // Because of the 'key' prop in the parent, this resets automatically
  const [company, setCompany] = useState<string>(selectedJob?.company || "");
  const [role, setRole] = useState<string>(selectedJob?.role || "");
  const [status, setStatus] = useState<string>(selectedJob?.status || "applied");
  const [date, setDate] = useState<string>(selectedJob?.date || "");
  const [note, setNote] = useState<string>(selectedJob?.note || "");

  /* ------------------ SUBMIT HANDLER ------------------ */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic Validation
    if (!company || !role || !status || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    const payload = {
      company,
      role,
      status,
      date,
      note,
    };

    try {
      if (selectedJob?.id) {
        // UPDATE existing job
        await updateJob({ ...payload, id: selectedJob.id });
      } else {
        // CREATE new job
        await addJob(payload);
      }

      // 2. Notify Parent to refresh the list
      refresh();

      // 3. Reset the parent's selection (this triggers the 'key' change)
      clearSelection();
      
    } catch (error) {
      console.error("Database operation failed:", error);
      alert("Failed to save job application.");
    }
  };

  return (
    <div style={{ 
      padding: "20px", 
      border: "1px solid #ddd", 
      borderRadius: "8px",
      backgroundColor: "#f9f9f9" 
    }}>
      <h2>{selectedJob ? "Edit Job Application" : "Add New Job"}</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <Input
          label="Company Name"
          name="company"
          value={company}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
        />

        <Input
          label="Role / Position"
          name="role"
          value={role}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
        />

        <Select
          label="Application Status"
          name="status"
          value={status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)}
          options={[
            { label: "Applied", value: "applied" },
            { label: "Interviewing", value: "interview" },
            { label: "Offer Received", value: "offer" },
            { label: "Rejected", value: "rejected" },
          ]}
        />

        <Input
          label="Date Applied"
          name="date"
          type="date" // HTML5 date picker
          value={date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
        />

        <Input
          label="Notes (Optional)"
          name="note"
          value={note}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNote(e.target.value)}
        />

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button 
            type="submit" 
            style={{ 
              backgroundColor: "#007bff", 
              color: "white", 
              padding: "10px 20px", 
              border: "none", 
              borderRadius: "4px",
              cursor: "pointer" 
            }}
          >
            {selectedJob ? "Save Changes" : "Add Application"}
          </button>

          {/* Cancel button only shows during editing */}
          {selectedJob && (
            <button 
              type="button" 
              onClick={clearSelection}
              style={{ padding: "10px 20px", cursor: "pointer" }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddJobPage;