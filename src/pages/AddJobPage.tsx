import { useState } from "react";
import Button from "../components/common/buttons";
import Input from "../components/common/input";
import Select from "../components/common/select";

const AddJobPage = () => {
   const [company, setCompany] = useState("");
   const [status, setStatus] = useState("applied");
   return(
     <>
        <div>
           <h2> Add Job</h2> 

           <Input label="company Name" name="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
           <Select label="Status" name="Status" value={status} onChange={(e) => setStatus(e.target.value)}  options={
            [
               {label: "Applied", value: "applied"},
               {label: "Interview", value: "interview"},
               {label: "Offer", value: "offer"},
               {label: "Rejected", value: "rejected"},
            ]
           } />
           <Button type="submit">Save Job</Button>
        </div>
     </>
   )
}

export default AddJobPage;