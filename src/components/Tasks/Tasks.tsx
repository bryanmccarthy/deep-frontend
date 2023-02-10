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
      cell: row => row.Completed ? <CircleIcon onClick={() => toggleCompleted(row.ID, true) } /> : <CircleOutlinedIcon onClick={() => toggleCompleted(row.ID, false) } />,
    },
    {
      cell: row => <DeleteIcon onClick={() => deleteTask(row.ID)}>DEL</DeleteIcon>,
    }
  ];

  async function toggleCompleted(id: number, completed: boolean) {
    await axios.put(import.meta.env.VITE_URL + '/tasks/update/completed', {
      ID: id,
      Completed: !completed,
    },
    {
      withCredentials: true,
    });
    getTasks(); // TODO: update state instead of refetching
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
