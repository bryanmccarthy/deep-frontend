import './Calendar.scss';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"

interface CalendarProps {
  setPage: (page: string) => void;
  tasks: any;
  setExpandedTaskID: (id: any) => void;
  setExpandedTaskTitle: (title: any) => void;
  setExpandedTaskDifficulty: (difficulty: any) => void;
  setExpandedTaskDueDate: (dueDate: any) => void;
  setExpandedTaskCompleted: (completed: any) => void;
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
    console.log(events)
    return events;
  }

  function handleEventClick(info: any) {
    setPage('expandedTask');
    setExpandedTaskID(info.event.id);
    setExpandedTaskTitle(info.event.title);
    setExpandedTaskDifficulty(info.event._def.extendedProps.difficulty);
    setExpandedTaskDueDate(info.event.startStr);
    setExpandedTaskCompleted(info.event._def.extendedProps.completed);
  }

  function handleDateClick(info: any) {
    console.log(info.dateStr); // TODO: prompt user to create new task with this date
  }

  function handleEventChange(info: any) {
    console.log(info.event.id); // TODO: update task due date
    console.log(info.event.startStr); // The new date
  }

  return (
    <div className="Calendar">
      <div className="FullCalendar">
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
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
