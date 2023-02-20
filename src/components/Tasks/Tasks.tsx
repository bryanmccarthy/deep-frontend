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

type DataRow = {
  ID: number;
  Title: string;
  TimeSpent: number;
  Difficulty: number;
  Completed: boolean;
}

interface TasksProps {
  sidebarHidden: boolean;
}

function Tasks({ sidebarHidden }: TasksProps) {
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
      cell: row => row.Difficulty === 0 ? <p style={{ color: 'green' }}>Easy</p> : row.Difficulty === 1 ? <p style={{ color: 'orange' }}>Medium</p> : <p style={{ color: 'red' }}>Hard</p>,
      sortable: true,
    },
    {
      name: 'Time Spent',
      selector: row => formattedTimeSpent(row.TimeSpent),
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
        minHeight: '5em',
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

  function handleNewTask() {
    setShowNewTask(true);
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
      <div className="TasksHeading">
        <NoteAddIcon className="NoteAddIcon" onClick={ handleNewTask } />
      </div>

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

      <NewTask showNewTask={showNewTask} setShowNewTask={setShowNewTask} getTasks={getTasks} sidebarHidden={sidebarHidden} />
      <ExpandedTask showExpandedTask={showExpandedTask} handleCloseExpandedTask={handleCloseExpandedTask} expandedTaskID={expandedTaskID}
      expandedTaskTitle={expandedTaskTitle}  expandedTaskDifficulty={expandedTaskDifficulty}expandedTaskTimeSpent={expandedTaskTimeSpent} 
      expandedTaskCompleted={expandedTaskCompleted} setExpandedTaskCompleted={setExpandedTaskCompleted} expandedTaskNotes={expandedTaskNotes} />
    </div>
    
  )
}

export default Tasks;
