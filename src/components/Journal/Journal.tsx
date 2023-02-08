import './Journal.scss'
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import DataTable from 'react-data-table-component';

function Journal() {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState<[]>([]);

  const columns = [
    {
      name: 'Task',
      selector: (row: any) => row.Title,
    },
    {
      name: 'Time Spent',
      selector: (row: any) => row.TimeSpent,
    },
    {
      name: 'Current',
      selector: (row: any) => row.Current,
    },
    {
      name: 'Completed',
      selector: (row: any) => row.Completed,
    },
  ]

  // Create task initially with title
  async function createTask() {
    await axios.post(import.meta.env.VITE_URL + '/tasks/create', {
      Title: 'test task 4828',
    },
    {
      withCredentials: true,
    });
  }
  
  // Delete task
  async function deleteTask(id: number) {
    await axios.delete(import.meta.env.VITE_URL + '/tasks/delete', {
      data: {
        ID: id,
      },
      withCredentials: true,
    });
  }

  async function getTasks() {
    const res = await axios.get(import.meta.env.VITE_URL + '/tasks', 
    {
      withCredentials: true,
    });
    setTasks(res.data);
  }

  const { status } = useQuery('tasks', getTasks);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  return (
    <div className="Journal">
      <DataTable
        columns={columns}
        data={tasks}
        pagination
        highlightOnHover
        pointerOnHover
        // onRowClicked={(row) => expandTask(row.ID)} // TODO: Onclick expands the task to view notes
      />
      
    </div>
    
  )
}

export default Journal;
