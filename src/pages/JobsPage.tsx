import DataTable from "react-data-table-component";
import type { TableColumn, TableStyles } from "react-data-table-component";
import type { Job } from "../types/job";
import { deleteJob } from "../db";
import React, { useState } from 'react';
import Model from "../components/common/model";
import AddJobPage from "./AddJobPage";

interface Props {
  jobs: Job[];
  refresh: () => void;
  onEdit?: (job: Job) => void;
}

const customStyles : TableStyles = {
  header: {
    style: { minHeight: '56px' },
  },
  headRow: {
    style: {
      backgroundColor: '#f9fafb',
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
      borderTopColor: '#e5e7eb',
    },
  },
  headCells: {
    style: {
      color: '#4b5563',
      fontWeight: '700',
      textTransform: 'uppercase' as const,
      fontSize: '12px',
    },
  },
  cells: {
    style: {
      fontSize: '14px',
      color: '#374151',
      paddingTop: '12px',
      paddingBottom: '12px',
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: '#f3f4f6',
      borderBottomColor: '#e5e7eb',
      borderRadius: '0px',
      outline: 'none',
    },
  },
};

const JobPage = ({ jobs, refresh }: Props) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editJob, setEditJob] = useState<Job | null >(null);

   const handleOpenAdd = () => {
    setEditJob(null); // Clear for new entry
    setIsModalOpen(true);
  };

  const handleOpenEdit = (job: Job) => {
    setEditJob(job); // Pass existing data
    setIsModalOpen(true);
  };
  
  const handleDelete = async (id: number) => {
    if (window.confirm("Delete this entry?")) {
      await deleteJob(id);
      refresh(); // Trigger the parent's refresh logic
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'offer': return { bg: '#dcfce7', text: '#166534' };
      case 'interview': return { bg: '#dbeafe', text: '#1e40af' };
      case 'rejected': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  const actionButtonStyle = (color: string) => ({
  backgroundColor: 'transparent',
  border: `1px solid ${color}`,
  color: color,
  padding: '4px 10px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 600,
  transition: 'all 0.2s'
});

  const columns: TableColumn<Job>[] = [
    { name: "Company", selector: (row) => row.company, sortable: true, cell: (row) => <span style={{ fontWeight: 600, color: '#111827' }}>{row.company}</span> },
    { name: "Role", selector: (row) => row.role, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true, cell: (row) => {
        const colors = getStatusColor(row.status);
        return (
          <span style={{
            backgroundColor: colors.bg,
            color: colors.text,
            padding: '4px 12px',
            borderRadius: '99px',
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase'
          }}>
            {row.status}
          </span> 
         ) }
      },
      { name: "Notes", selector: (row) => row.note, sortable: true },
     { name: "Actions",
      button: true,
      cell: (row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => handleOpenEdit(row)} //onEdit
            style={actionButtonStyle('#6366f1')}
          >
            Edit
          </button>
          <button 
            onClick={() => row.id && handleDelete(row.id)}
            style={actionButtonStyle('#ef4444')}
          >
            Delete
          </button>
        </div>
      ),
      // cell: (row) => (
      //   <div>
      //     <button onClick={() => onEdit(row)}>Edit</button>
      //     <button onClick={() => row.id && handleDelete(row.id)}>Delete</button>
      //   </div>
      // ),
    },
  ];

  return (
   <div>
      <button onClick={handleOpenAdd} style={addButtonStyle}>
        + Add Application
      </button>
   
      <div style={{ 
         borderRadius: '12px', 
         boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', 
         overflow: 'hidden',
         backgroundColor: '#fff' 
      }}>
      <DataTable columns={columns} data={jobs} pagination customStyles={customStyles} highlightOnHover/>;
      </div>
       <Model 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editJob ? "Edit Application" : "New Application"}
      >
        <AddJobPage 
          selectedJob={editJob} 
          refresh={refresh} 
          onClose={() => setIsModalOpen(false)} 
        />
      </Model>
    </div>
)};

const addButtonStyle = {
  backgroundColor: '#6366f1',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '8px',
  border: 'none',
  fontWeight: 600,
  cursor: 'pointer',
  marginBottom: '1rem'
};

export default JobPage;