import './Calendar.scss';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"

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
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        events={parseTasks(tasks)}
        displayEventTime={false}
        editable={true} // TODO: update task due date when event is dragged
        dateClick={(info) => {
          console.log(info.dateStr) // TODO: prompt user to create new task with this date
        }}
      />
    </div>
  )
}

export default Calendar;
