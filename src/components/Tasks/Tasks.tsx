import './Tasks.scss';
import ExpandedTask from './ExpandedTask/ExpandedTask';
import NewTask from './NewTask/NewTask';
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import DataTable, { TableColumn } from 'react-data-table-component';
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

type DataRow = {
  ID: number;
  Title: string;
  TimeSpent: number;
  Difficulty: number;
  Completed: boolean;
}

function Tasks() {
  const [showExpandedTask, setShowExpandedTask] = useState<boolean>(false);
  const [showNewTask, setShowNewTask] = useState<boolean>(false);
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

  const customStyles = {
    rows: {
      style: {
        minHeight: '60px',
      }
    },
    headCells: {
      style: {
        fontSize: '16px',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
      },
    }, 
  };

  async function toggleCompleted(id: number, completed: boolean) {
    await axios.put(import.meta.env.VITE_URL + '/tasks/update/completed', {
      ID: id,
      Completed: !completed,
    },
    {
      withCredentials: true,
    });
    getTasks();
  }
  
  async function deleteTask(id: number) {
    await axios.delete(import.meta.env.VITE_URL + '/tasks/delete', {
      data: {
        ID: id,
      },
      withCredentials: true,
    });
    getTasks();
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

  function handleNewTask() {
    setShowNewTask(true);
  }

  const { status } = useQuery('tasks', getTasks);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  return (
    <div className="Tasks">
      <NoteAddIcon className="NoteAddIcon" onClick={ handleNewTask } />
      <DataTable
        className="DataTable"
        columns={columns}
        data={tasks}
        customStyles={customStyles}
        pagination
        highlightOnHover
        pointerOnHover
        onRowClicked={(row) => expandTask(row)}
      />

      <NewTask showNewTask={showNewTask} setShowNewTask={setShowNewTask} getTasks={getTasks} />
      <ExpandedTask showExpandedTask={showExpandedTask} setShowExpandedTask={setShowExpandedTask} expandedTaskData={expandedTaskData} />
    </div>
    
  )
}

export default Tasks;
