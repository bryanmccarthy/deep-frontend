import './Tasks.scss';
import ExpandedTask from './ExpandedTask/ExpandedTask';
import NewTask from './NewTask/NewTask';
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import DataTable, { TableColumn } from 'react-data-table-component';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

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

  const [expandedTaskID, setExpandedTaskID] = useState<any>(0);
  const [expandedTaskTitle, setExpandedTaskTitle] = useState<any>('');
  const [expandedTaskDifficulty, setExpandedTaskDifficulty] = useState<any>(0);
  const [expandedTaskTimeSpent, setExpandedTaskTimeSpent] = useState<any>(0);
  const [expandedTaskCompleted, setExpandedTaskCompleted] = useState<any>(false);
  const [expandedTaskNotes, setExpandedTaskNotes] = useState<any>([]);

  const [tasks, setTasks] = useState<[]>([]);
  
  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Task',
      selector: row => row.Title,
    },
    {
      name: 'Difficulty',
      selector: row => row.Difficulty,
      cell: row => row.Difficulty === 0 ? <div><FiberManualRecordIcon fontSize="small" /></div> : row.Difficulty === 1 ? <div><FiberManualRecordIcon fontSize="small" /> <FiberManualRecordIcon fontSize="small" /></div> : <div><FiberManualRecordIcon fontSize="small" /> <FiberManualRecordIcon fontSize="small" /> <FiberManualRecordIcon fontSize="small" /></div>,
      sortable: true,
    },
    {
      name: 'Completed',
      selector: row => row.Completed,
      cell: row => row.Completed ? <CheckCircleIcon onClick={() => toggleCompleted(row.ID, true) } /> : <CircleOutlinedIcon onClick={() => toggleCompleted(row.ID, false) } />,
    },
    {
      cell: row => <DeleteIcon color="action" onClick={() => deleteTask(row.ID)}></DeleteIcon>,
    }
  ];

  const customStyles = {
    rows: {
      style: {
        height: '4.3em',
        backgroundColor: '#faf9f6',
      }
    },
    headCells: {
      style: {
        fontSize: '18px',
        fontWeight: '600',
        backgroundColor: '#faf9f6',
      },
    },
    cells: {
      style: {
        fontSize: '16px',
      },
    },
    pagination: {
      style: {
        justifyContent: 'center',
        fontSize: '16px',
        backgroundColor: '#faf9f6',
      }
    }
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
    const taskArray = Object.entries(row);
    const taskObject = Object.fromEntries(taskArray);

    // Request notes for task
    const res = await axios.get(import.meta.env.VITE_URL + `/notes/${taskObject.ID}`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      setExpandedTaskNotes(res.data);
    }

    setExpandedTaskID(taskObject.ID);
    setExpandedTaskTitle(taskObject.Title);
    setExpandedTaskDifficulty(taskObject.Difficulty);
    setExpandedTaskTimeSpent(taskObject.TimeSpent);
    setExpandedTaskCompleted(taskObject.Completed);

    setShowExpandedTask(true);
  }

  function handleCloseExpandedTask() {
    setShowExpandedTask(false);
    getTasks();
  }

  function formattedTimeSpent(timeSpent: number) {
    const hours = Math.floor(timeSpent / 60);
    const minutes = timeSpent % 60;

    return `${hours}h ${minutes}m`;
  }

  const { status } = useQuery('tasks', getTasks);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  return (
    <div className="Tasks">
      <div className="NewTask">
        <NewTask showNewTask={showNewTask} setShowNewTask={setShowNewTask} getTasks={getTasks} />
      </div>
      
      <DataTable
        className="DataTable"
        columns={columns}
        data={tasks}
        customStyles={customStyles}
        pagination
        paginationPerPage={10}
        paginationComponentOptions={{ noRowsPerPage: true }}
        highlightOnHover
        pointerOnHover
        noDataComponent
        onRowClicked={(row) => expandTask(row)}
      />
      <ExpandedTask showExpandedTask={showExpandedTask} handleCloseExpandedTask={handleCloseExpandedTask} expandedTaskID={expandedTaskID}
      expandedTaskTitle={expandedTaskTitle}  expandedTaskDifficulty={expandedTaskDifficulty}expandedTaskTimeSpent={expandedTaskTimeSpent} 
      expandedTaskCompleted={expandedTaskCompleted} setExpandedTaskCompleted={setExpandedTaskCompleted} expandedTaskNotes={expandedTaskNotes} />
    </div>
    
  )
}

export default Tasks;
