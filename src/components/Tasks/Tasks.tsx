import './Tasks.scss';
import NewTask from './NewTask/NewTask';
import axios from 'axios';
import DataTable, { TableColumn } from 'react-data-table-component';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import dayjs from 'dayjs';

type DataRow = {
  id: number;
  title: string;
  due_date: number;
  difficulty: number;
  completed: boolean;
}

interface TasksProps {
  setPage: (page: string) => void;
  tasks: any;
  getTasks: () => void;
  setExpandedTaskID: (id: any) => void;
  setExpandedTaskTitle: (title: any) => void;
  setExpandedTaskDifficulty: (difficulty: any) => void;
  setExpandedTaskDueDate: (dueDate: any) => void;
  setExpandedTaskCompleted: (completed: any) => void;
  setExpandedTaskNotes: (notes: []) => void;
}

function Tasks({ setPage, tasks, getTasks, setExpandedTaskID, setExpandedTaskTitle, setExpandedTaskDifficulty, setExpandedTaskDueDate, setExpandedTaskCompleted, setExpandedTaskNotes }: TasksProps) {
  const paginationPerPage = localStorage.getItem('paginationPerPage') ? parseInt(localStorage.getItem('paginationPerPage')!) : 10;
  
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
      name: 'Done',
      selector: row => row.completed,
      cell: row => row.completed ? <CheckCircleIcon onClick={() => toggleCompleted(row.id, true) } /> : <CircleOutlinedIcon onClick={() => toggleCompleted(row.id, false) } />,
    },
    {
      cell: row => <DeleteIcon className="DeleteIcon" onClick={() => deleteTask(row.id)}></DeleteIcon>,
    }
  ];

  const customStyles = {
    rows: {
      style: {
        height: '4em',
        color: '#03243B', // accent
        backgroundColor: '#faf9f6', // primary
      }
    },
    headCells: {
      style: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#03243B', // accent
        backgroundColor: '#faf9f6', // primary
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
        color: '#03243B', // accent
        backgroundColor: '#faf9f6', // primary
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

  async function handleExpandTask(row: DataRow) {
    const taskArray = Object.entries(row);
    const taskObject = Object.fromEntries(taskArray);

    // Request notes for task
    const res = await axios.get(import.meta.env.VITE_URL + `/notes/${taskObject.id}`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      setExpandedTaskNotes(res.data);
    }

    setPage('expandedTask');
    setExpandedTaskID(taskObject.id);
    setExpandedTaskTitle(taskObject.title);
    setExpandedTaskDifficulty(taskObject.difficulty);
    setExpandedTaskDueDate(taskObject.due_date);
    setExpandedTaskCompleted(taskObject.completed);
  }

  return (
    <div className="Tasks">
      <div className="NewTaskContainer">
        <div className="TasksCompletedRatio">
          <label className="CompletedLabel">Complete</label> 
          <div className="CompletedNumber">{tasks.filter((task: any) => task.completed === true).length}/{tasks.length}</div>
        </div>
        <NewTask getTasks={getTasks} />
      </div>
    
      {
        tasks.length <= 0 ?
        <div className="TasksEmpty">
          <h1 className="TasksEmptyText">no tasks yet</h1> // TODO: style
        </div>
        : 
        null
      }
      
      <DataTable
        className="DataTable"
        columns={columns}
        data={tasks}
        customStyles={customStyles}
        pagination
        paginationPerPage={paginationPerPage}
        onChangeRowsPerPage={(perPage) => localStorage.setItem('paginationPerPage', perPage.toString())}
        paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30, 40, 50]}
        paginationComponentOptions={{
          rowsPerPageText: 'Tasks per page:'
        }}
        highlightOnHover
        pointerOnHover
        noDataComponent
        onRowClicked={(row) => handleExpandTask(row)}
      />
    </div>
  )
}

export default Tasks;
