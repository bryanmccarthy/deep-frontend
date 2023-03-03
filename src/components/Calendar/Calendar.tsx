import './Calendar.scss';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

type CalendarProps = {
  setPage: (page: string) => void;
  tasks: any;
  getTasks: () => void;
  setExpandedTaskID: (id: number) => void;
  setExpandedTaskTitle: (title: string) => void;
  setExpandedTaskDifficulty: (difficulty: number) => void;
  setExpandedTaskDueDate: (dueDate: string) => void;
  setExpandedTaskCompleted: (completed: boolean) => void;
}

function Calendar({ setPage, tasks, getTasks, setExpandedTaskID, setExpandedTaskTitle, setExpandedTaskDifficulty, setExpandedTaskDueDate, setExpandedTaskCompleted  }: CalendarProps) {

  // Necessary for FullCalendar as it needs date & allDay
  function parseTasks(tasks: any) {
    let events: any = [];
    tasks.forEach((task: any) => {
      events.push({
        id: task.id,
        title: task.title,
        date: task.due_date,
        difficulty: task.difficulty,
        completed: task.completed,
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
  }

  async function handleDateClick(info: any) {
    const dueDate = info.date;
    const title = prompt('Enter a new task title'); // TODO: use something other than prompt
    const difficulty = Number(prompt('Enter a difficulty level (0, 1, 2)')); // TODO: use something other than prompt

    if (title === '') return;
    if (dueDate === null) return;

    await axios.post(import.meta.env.VITE_URL + '/tasks/create', {
      title: title,
      difficulty: difficulty,
      due_date: dueDate,
    },
    {
      withCredentials: true,
    }); // TODO: handle errors
  }

  async function handleEventChange(info: any) {
    await axios.put(import.meta.env.VITE_URL + '/tasks/update/due_date', {
      id: Number(info.event.id),
      due_date: String(info.event.startStr),
    },
    {
      withCredentials: true,
    }); // TODO: handle errors
  }

  return (
    <div className="Calendar">
      <div className="FullCalendar">
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "dayGridMonth,dayGridWeek,dayGridDay",
            center: "title",
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
    </div>
  )
}

export default Calendar;
