import './Tasks.scss';
import NewTask from './NewTask/NewTask';
import TaskList from './TaskList/TaskList';
import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';

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
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const [taskDeletedSnackbarOpen, setTaskDeletedSnackbarOpen] = useState<boolean>(false);
  const [deletedTask, setDeletedTask] = useState<TaskType | null>(null);

  async function handleToggleCompleted(id: number, completed: boolean) {
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
    
  async function handleDeleteTask(task: TaskType) {
    const res = await axios.delete(import.meta.env.VITE_URL + '/tasks/delete', {
      data: {
        id: task.id,
      },
      withCredentials: true,
    });

    if (res.status === 200) {
      setDeletedTask(task);
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

  function handleExpandTask(task: TaskType) {
    setPage('expandedTask');
    setExpandedTaskID(task.id);
    setExpandedTaskTitle(task.title);
    setExpandedTaskDifficulty(task.difficulty);
    setExpandedTaskDueDate(task.due_date);
    setExpandedTaskCompleted(task.completed);
  }

  return (
    <div className="Tasks">
      <div className="NewTaskContainer">
        {/* TODO: put completed ratio in its own component */}
        <div className="TasksCompletedRatio">
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

      <TaskList 
        tasks={tasks} handleDeleteTask={handleDeleteTask}
        handleExpandTask={handleExpandTask} 
        handleToggleCompleted={handleToggleCompleted}
      /> 

      {/* Task Deleted Snackbar TODO: maybe move inside other component */}
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

      {/* Error Snackbar TODO: maybe move inside other component */}
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
