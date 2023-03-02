import './Calendar.scss';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"

type CalendarProps = {
  setPage: (page: string) => void;
  tasks: any;
  setExpandedTaskID: (id: number) => void;
  setExpandedTaskTitle: (title: string) => void;
  setExpandedTaskDifficulty: (difficulty: number) => void;
  setExpandedTaskDueDate: (dueDate: string) => void;
  setExpandedTaskCompleted: (completed: boolean) => void;
}

function Calendar({ setPage, tasks, setExpandedTaskID, setExpandedTaskTitle, setExpandedTaskDifficulty, setExpandedTaskDueDate, setExpandedTaskCompleted  }: CalendarProps) {

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

  function handleDateClick(info: any) {
    console.log(info.dateStr); // TODO: prompt user to create new task with this date
  }

  async function handleEventChange(info: any) {
    await axios.put(import.meta.env.VITE_URL + '/tasks/update/due_date', {
      id: Number(info.event.id),
      due_date: String(info.event.startStr),
    },
    {
      withCredentials: true,
    });
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
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventChange={handleEventChange}
        />
      </div>
    </div>
  )
}

export default Calendar;
