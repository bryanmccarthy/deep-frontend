import './Tasks.scss';
import ExpandedTask from './ExpandedTask/ExpandedTask';
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import DataTable, { TableColumn } from 'react-data-table-component';
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

type DataRow = {
  ID: number;
  Title: string;
  TimeSpent: number;
  Difficulty: number;
  Completed: boolean;
}

function Tasks() {
  const [showExpandedTask, setShowExpandedTask] = useState<boolean>(false);
  const [expandedTaskData, setExpandedTaskData] = useState<any>([]);
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState<[]>([]);
  
  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Task',
      selector: row => row.Title,
    },
    {
      name: 'Difficulty',
      selector: row => row.Difficulty, 
      sortable: true,
    },
    {
      name: 'Time Spent',
      selector: row => row.TimeSpent,
      sortable: true,
    },
    {
      name: 'Completed',
      selector: row => row.Completed,
      cell: row => row.Completed ? <CircleIcon onClick={() => toggleCompleted(row.ID) } /> : <CircleOutlinedIcon onClick={() => toggleCompleted(row.ID) } />,
    },
    {
      cell: row => <DeleteIcon onClick={() => deleteTask(row.ID)}>DEL</DeleteIcon>, // TODO: change to icon
    }
  ];

  // Toggle completed task
  async function toggleCompleted(id: number) {
    // TODO: toggle completed task
  }

  // Create task initially with title
  async function createTask() {
    await axios.post(import.meta.env.VITE_URL + '/tasks/create', {
      Title: 'test task 4828',
    },
    {
      withCredentials: true,
    });
  }
  
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

  async function expandTask(row: DataRow) {
    const rowArray = Object.entries(row);

    setExpandedTaskData(rowArray);
    setShowExpandedTask(true);
  }

  const { status } = useQuery('tasks', getTasks);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  return (
    <div className="Tasks">
      <DataTable
        columns={columns}
        data={tasks}
        pagination
        highlightOnHover
        pointerOnHover
        onRowClicked={(row) => expandTask(row)}
      />

      <ExpandedTask showExpandedTask={showExpandedTask} setShowExpandedTask={setShowExpandedTask} expandedTaskData={expandedTaskData} />
    </div>
    
  )
}

export default Tasks;
