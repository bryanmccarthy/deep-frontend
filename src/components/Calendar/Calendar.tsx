import './Calendar.scss';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function Calendar({ tasks }: { tasks: any}) {

  function parseTasks(tasks: any) {
    let events: any = [];
    tasks.forEach((task: any) => {
      events.push({
        title: task.title,
        date: task.due_date,
        allDay: true
      })
    })
    return events;
  }

  return (
    <div className="Calendar">
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={parseTasks(tasks)}
        displayEventTime={false}
      />
    </div>
  )
}

export default Calendar;
