import { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../Services/EmployeeServices";
import { useNavigate } from "react-router-dom";
const ListEmployeeComponent = () => {

  const [employees, setEmployees] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees(){
  listEmployees()
    .then((response) => {
      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        setEmployees(response.data);
      } else {
        console.error("Not an array:", response.data);
        setEmployees([]);
      }
    })
    .catch(error => {
      console.error(error);
      setEmployees([]);
      });
  }

  function addNewEmployee() {
    navigator('/add-employee')
  }

  function updateEmployee(id){
    navigator(`/update-employee/${id}`)
  }

  function removeEmployee(id){
    console.log(id);
    deleteEmployee(id).then((response) => {
      getAllEmployees();
    }).catch(error => {
      console.error(error);
    })
  }

  return (
    <div className="container">
      <h2 style={{color: 'white'}}>List Of Employees</h2>
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>Add Employee</button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th style={{color: 'white'}}>Employee Id</th>
            <th style={{color: 'white'}}>Employee First Name</th>
            <th style={{color: 'white'}}>Employee Last Name</th>
            <th style={{color: 'white'}}>Employee Email</th>
            <th style={{color: 'white'}}>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(employee => 
            <tr key={employee.id}>
              <td style={{color: 'white'}}>{employee.id}</td>
              <td style={{color: 'white'}}>{employee.firstName}</td>
              <td style={{color: 'white'}}>{employee.lastName}</td>
              <td style={{color: 'white'}}>{employee.email}</td>
              <td>
                <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                  style={{marginLeft: '10px'}}
                  >Delete</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;