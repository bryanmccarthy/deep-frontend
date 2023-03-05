import './Tasks.scss';
import NewTask from './NewTask/NewTask';
import { useState } from 'react';
import axios from 'axios';
import DataTable, { TableColumn } from 'react-data-table-component';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';

type DataRow = {
  id: number;
  title: string;
  due_date: number;
  difficulty: number;
  completed: boolean;
}

type TasksProps = {
  setPage: (page: string) => void;
  tasks: any;
  getTasks: () => void;
  setExpandedTaskID: (id: number) => void;
  setExpandedTaskTitle: (title: string) => void;
  setExpandedTaskDifficulty: (difficulty: number) => void;
  setExpandedTaskDueDate: (dueDate: string) => void;
  setExpandedTaskCompleted: (completed: boolean) => void;
}

type TaskType = {
  id: number;
  title: string;
  due_date: number;
  difficulty: number;
  completed: boolean;
}

const accent = '#000000';
const primary = '#ffffff';

function Tasks({ setPage, tasks, getTasks, setExpandedTaskID, setExpandedTaskTitle, setExpandedTaskDifficulty, setExpandedTaskDueDate, setExpandedTaskCompleted }: TasksProps) {
  const paginationPerPage: number = localStorage.getItem('paginationPerPage') ? parseInt(localStorage.getItem('paginationPerPage')!) : 10;
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const [taskDeletedSnackbarOpen, setTaskDeletedSnackbarOpen] = useState<boolean>(false);
  const [deletedTask, setDeletedTask] = useState<TaskType | null>(null);

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
      name: 'Due',
      selector: row => dayjs(row.due_date).format('MM/DD/YYYY'),
      sortable: true,
    },
    {
      name: 'Done',
      selector: row => row.completed,
      cell: row => row.completed ? <CheckBoxIcon onClick={() => toggleCompleted(row.id, true) } /> : <CheckBoxOutlineBlankIcon onClick={() => toggleCompleted(row.id, false) } />,
    },
    {
    cell: row => <div><EditIcon className="EditIcon" onClick={() => editTask(row.id)}></EditIcon><DeleteIcon className="DeleteIcon" onClick={() => deleteTask(row.id)}></DeleteIcon></div>, // TODO: handle edit click
    }
  ];

  const customStyles = {
    rows: {
      style: {
        height: '4em',
        color: accent,
        backgroundColor: primary,
      }
    },
    headCells: {
      style: {
        fontSize: '18px',
        fontWeight: '600',
        color: accent,
        backgroundColor: primary,
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
        color: accent,
        backgroundColor: primary,
      }
    }
  };

  async function toggleCompleted(id: number, completed: boolean) {
    const res = await axios.put(import.meta.env.VITE_URL + '/tasks/update/completed', {
      id: id,
      completed: !completed,
    },
    {
      withCredentials: true,
    });

    if (res.status === 200) {
      getTasks();
    } else {
      setErrorSnackbarOpen(true);
    }
  }

  function handleSetDeletedTask(id: number) {
    tasks.forEach((task: any) => {
      if (task.id === id) {
        setDeletedTask(
          {
            id: task.id,
            title: task.title,
            due_date: task.due_date,
            difficulty: task.difficulty,
            completed: task.completed,
          }
        );
      }
    });    
  }

  async function editTask(id: number) {
    const newTaskTitle = prompt("Enter new task title:"); // TODO: update way to get new title
    const res = await axios.put(import.meta.env.VITE_URL + '/tasks/update/title', {
      id: id,
      title: newTaskTitle,
    },
    {
      withCredentials: true,
    });

    if (res.status === 200) {
      console.log("edit task success");
    }
  }
  
  async function deleteTask(id: number) {
    const res = await axios.delete(import.meta.env.VITE_URL + '/tasks/delete', {
      data: {
        id: id,
      },
      withCredentials: true,
    });

    if (res.status === 200) {
      handleSetDeletedTask(id);
      getTasks();
      setTaskDeletedSnackbarOpen(true);
    } else {
      setErrorSnackbarOpen(true);
    }
  }

  function handleSnackbarClose() {
    setTaskDeletedSnackbarOpen(false);
    setErrorSnackbarOpen(false);
  };

  async function handleSnackbarUndo() {
    const res = await axios.post(import.meta.env.VITE_URL + '/tasks/create', {
      title: deletedTask!.title,
      difficulty: deletedTask!.difficulty,
      due_date: deletedTask!.due_date,
      completed: deletedTask!.completed,
    },
    {
      withCredentials: true,
    });

    if (res.status === 200) {
      getTasks();
    } else {
      setErrorSnackbarOpen(true);
    }
  }

  async function handleExpandTask(row: DataRow) {
    const taskArray = Object.entries(row);
    const taskObject = Object.fromEntries(taskArray);

    setPage('expandedTask');
    setExpandedTaskID(Number(taskObject.id));
    setExpandedTaskTitle(String(taskObject.title));
    setExpandedTaskDifficulty(Number(taskObject.difficulty));
    setExpandedTaskDueDate(String(taskObject.due_date));
    setExpandedTaskCompleted(Boolean(taskObject.completed));
  }

  return (
    <div className="Tasks">
      <div className="NewTaskContainer">
        <div className="TasksCompletedRatio">
          <label className="CompletedLabel">Completed</label> 
          <div className="CompletedNumber">{tasks.filter((task: any) => task.completed === true).length}/{tasks.length}</div>
        </div>
        <NewTask getTasks={getTasks} />
      </div>
    
      {
        tasks.length <= 0 ?
        <div className="TasksEmpty">
    height: 100%;
          <h1 className="TasksEmptyText">no tasks yet</h1> {/* TODO: style */}
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
        paginationRowsPerPageOptions={[5, 10, 15, 20, 30, 40, 50]}
        paginationComponentOptions={{
          rowsPerPageText: 'Tasks per page:'
        }}
        highlightOnHover
        pointerOnHover
        noDataComponent
        onRowClicked={(row) => handleExpandTask(row)}
      />

      <Snackbar
        open={taskDeletedSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message="Task deleted"
        action={
          <div>
            <Button color="secondary" size="small" onClick={handleSnackbarUndo}>
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        }
      />

      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message="oops, something went wrong!"
        action={
          <div>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        }
      />
    </div>
  )
}

export default Tasks;
