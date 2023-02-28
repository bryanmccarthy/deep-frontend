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
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import dayjs, { Dayjs } from 'dayjs';

type DataRow = {
  id: number;
  title: string;
  due_date: number;
  difficulty: number;
  completed: boolean;
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
      selector: row => row.title,
    },
    {
      name: 'Difficulty',
      selector: row => row.difficulty,
      cell: row => row.difficulty === 0 ? <div><FiberManualRecordIcon className="DifficultyIcon" /></div> : row.difficulty === 1 ? <div><FiberManualRecordIcon className="DifficultyIcon" /> <FiberManualRecordIcon className="DifficultyIcon" /></div> : <div><FiberManualRecordIcon className="DifficultyIcon" /> <FiberManualRecordIcon className="DifficultyIcon" /> <FiberManualRecordIcon className="DifficultyIcon" /></div>,
      sortable: true,
    },
    {
      name: 'Due Date',
      selector: row => dayjs(row.due_date).format('MM/DD/YYYY'),
      sortable: true,
    },
    {
      name: 'Completed',
      selector: row => row.completed,
      cell: row => row.completed ? <CheckCircleIcon onClick={() => toggleCompleted(row.id, true) } /> : <CircleOutlinedIcon onClick={() => toggleCompleted(row.id, false) } />,
    },
    {
      cell: row => <DeleteIcon color="action" onClick={() => deleteTask(row.id)}></DeleteIcon>,
    }
  ];

  const customStyles = {
    rows: {
      style: {
        height: '4.2em',
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
      id: id,
      completed: !completed,
    },
    {
      withCredentials: true,
    });
    getTasks();
  }
  
  // TODO: show a Snackbar when task is deleted w/ undo option
  async function deleteTask(id: number) {
    await axios.delete(import.meta.env.VITE_URL + '/tasks/delete', {
      data: {
        id: id,
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
    const res = await axios.get(import.meta.env.VITE_URL + `/notes/${taskObject.id}`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      setExpandedTaskNotes(res.data);
    }

    setExpandedTaskID(taskObject.id);
    setExpandedTaskTitle(taskObject.title);
    setExpandedTaskDifficulty(taskObject.difficulty);
    setExpandedTaskTimeSpent(taskObject.timeSpent);
    setExpandedTaskCompleted(taskObject.completed);

    setShowExpandedTask(true);
  }

  function handleCloseExpandedTask() {
    setShowExpandedTask(false);
    getTasks();
  }

  const { status } = useQuery('tasks', getTasks);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  return (
    <div className="Tasks">
      <div className="NewTask">
        <NewTask setShowNewTask={setShowNewTask} getTasks={getTasks} />
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
