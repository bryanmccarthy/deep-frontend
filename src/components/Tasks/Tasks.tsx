import './Tasks.scss';
import TaskList from './TaskList/TaskList';
import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type TasksProps = {
  setPage: (page: string) => void;
  tasks: any;
  setTasks: (tasks: any) => void;
  setExpandedTaskID: (id: number) => void;
  setExpandedTaskTitle: (title: string) => void;
  setExpandedTaskDifficulty: (difficulty: number) => void;
  setExpandedTaskDueDate: (dueDate: string) => void;
  setExpandedTaskCompleted: (completed: boolean) => void;
  setExpandedTaskProgress: (progress: number) => void;
}

const accent = '#000000';
const primary = '#ffffff';

function Tasks({ setPage, tasks, setTasks, setExpandedTaskID, setExpandedTaskTitle, setExpandedTaskDifficulty, setExpandedTaskDueDate, setExpandedTaskCompleted, setExpandedTaskProgress }: TasksProps) {
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const [taskDeletedSnackbarOpen, setTaskDeletedSnackbarOpen] = useState<boolean>(false);
  const [deletedTask, setDeletedTask] = useState<any | null>(null);

  async function handleToggleCompleted(id: number, completed: boolean) {
    const res = await axios.put(import.meta.env.VITE_URL + '/tasks/update/completed', {
      id: id,
      completed: !completed,
    },
    {
      withCredentials: true,
    });

    if (res.status === 200) {
      setTasks(tasks.map((task: any) => {
        if (task.id === id) {
          return { ...task, completed: !completed };
        }
        return task;
      }));
    } else {
      setErrorSnackbarOpen(true);
    }
  }
    
  async function handleDeleteTask(task: any) {
    const res = await axios.delete(import.meta.env.VITE_URL + '/tasks/delete', {
      data: {
        id: task.id,
      },
      withCredentials: true,
    });

    if (res.status === 200) {
      setDeletedTask(task); // For Snackbar undo
      setTasks(tasks.filter((t: any) => t.id !== task.id));
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
      progress: deletedTask!.progress,
    },
    {
      withCredentials: true,
    });

    if (res.status === 200) {
      setTasks([...tasks, {
        id: res.data.id,
        title: deletedTask!.title,
        difficulty: deletedTask!.difficulty,
        due_date: deletedTask!.due_date,
        completed: deletedTask!.completed,
        progress: deletedTask!.progress,
      }].sort((a: any, b: any) => { return new Date(a.due_date).getTime() - new Date(b.due_date).getTime(); })
      );      
      } else {
      setErrorSnackbarOpen(true);
    }
  }

  function handleExpandTask(task: any) {
    setPage('expandedTask');
    setExpandedTaskID(task.id);
    setExpandedTaskTitle(task.title);
    setExpandedTaskDifficulty(task.difficulty);
    setExpandedTaskDueDate(task.due_date);
    setExpandedTaskCompleted(task.completed);
    setExpandedTaskProgress(task.progress);
  }

  return (
    <div className="Tasks">
      {
        tasks.length <= 0 ?
        <div className="TasksEmpty">
          <h1 className="TasksEmptyText">no tasks yet</h1> {/* TODO: style */}
        </div>
        : 
        null
      }

      <TaskList 
        tasks={tasks} 
        handleDeleteTask={handleDeleteTask}
        handleExpandTask={handleExpandTask} 
        handleToggleCompleted={handleToggleCompleted}
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
