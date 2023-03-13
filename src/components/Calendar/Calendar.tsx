import './Calendar.scss';
import axios from 'axios';
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';

type CalendarProps = {
  setPage: (page: string) => void;
  tasks: any;
  getTasks: () => void;
  setExpandedTaskID: (id: number) => void;
  setExpandedTaskTitle: (title: string) => void;
  setExpandedTaskDifficulty: (difficulty: number) => void;
  setExpandedTaskDueDate: (dueDate: string) => void;
  setExpandedTaskCompleted: (completed: boolean) => void;
  setExpandedTaskProgress: (progress: number) => void;
  setExpandedTaskTimeSpent: (timeSpent: number) => void;
}

function Calendar({ setPage, tasks, getTasks, setExpandedTaskID, setExpandedTaskTitle, setExpandedTaskDifficulty, setExpandedTaskDueDate, setExpandedTaskCompleted, setExpandedTaskProgress, setExpandedTaskTimeSpent }: CalendarProps) {
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);

  // Necessary for FullCalendar as it needs date & allDay fields
  function parseTasks(tasks: any) {
    let events: any = [];
    tasks.forEach((task: any) => {
      events.push({
        id: task.id,
        title: task.title,
        date: task.due_date,
        difficulty: task.difficulty,
        completed: task.completed,
        progress: task.progress,
        time_spent: task.time_spent,
        allDay: true,
      })
    })
    return events;
  }

  function handleEventClick(info: any) {
    setPage('expandedTask');
    setExpandedTaskID(Number(info.event.id));
    setExpandedTaskTitle(String(info.event.title));
    setExpandedTaskDifficulty(Number(info.event._def.extendedProps.difficulty));
    setExpandedTaskDueDate(String(info.event.startStr));
    setExpandedTaskCompleted(Boolean(info.event._def.extendedProps.completed));
    setExpandedTaskProgress(Number(info.event._def.extendedProps.progress));
    setExpandedTaskTimeSpent(Number(info.event._def.extendedProps.time_spent));
  }

  async function handleDateClick(info: any) {
    const dueDate = info.date;
    const title = prompt('Enter a new task title'); // TODO: use something other than prompt
    const difficulty = Number(prompt('Enter a difficulty level (0, 1, 2)')); // TODO: use something other than prompt

    if (title === '') return;
    if (dueDate === null) return;

    const res = await axios.post(import.meta.env.VITE_URL + '/tasks/create', {
      title: title,
      difficulty: difficulty,
      due_date: dueDate,
      completed: false,
      progress: 0,
      time_spent: 0,
    },
    {
      withCredentials: true,
    });

    if (res.status !== 200) {
      setErrorSnackbarOpen(true);
    }
  }

  async function handleEventChange(info: any) {
    const res = await axios.put(import.meta.env.VITE_URL + '/tasks/update/due_date', {
      id: Number(info.event.id),
      due_date: String(info.event.startStr),
    },
    {
      withCredentials: true,
    });

    if (res.status !== 200) {
      setErrorSnackbarOpen(true);
    }
  }

  function handleSnackbarClose() {
    setErrorSnackbarOpen(false);
  };

  return (
    <div className="Calendar">
      <div className="FullCalendar">
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "title",
            right: "today prev,next"
          }}
          events={parseTasks(tasks)}
          displayEventTime={false}
          editable={true}
          height="100%"
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventChange={handleEventChange}
        />
      </div>

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

export default Calendar;
