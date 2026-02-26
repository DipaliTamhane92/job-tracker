import DataTable from "react-data-table-component";
import type { TableColumn } from "react-data-table-component";
import type { Job } from "../types/job";
import { deleteJob } from "../db";

interface Props {
  jobs: Job[];
  refresh: () => void;
  onEdit: (job: Job) => void;
}

const JobPage = ({ jobs, refresh, onEdit }: Props) => {
  
  const handleDelete = async (id: number) => {
    if (window.confirm("Delete this entry?")) {
      await deleteJob(id);
      refresh(); // Trigger the parent's refresh logic
    }
  };

  const columns: TableColumn<Job>[] = [
    { name: "Company", selector: (row) => row.company, sortable: true },
    { name: "Role", selector: (row) => row.role },
    { name: "Status", selector: (row) => row.status },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button onClick={() => onEdit(row)}>Edit</button>
          <button onClick={() => row.id && handleDelete(row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={jobs} pagination />;
};

export default JobPage;