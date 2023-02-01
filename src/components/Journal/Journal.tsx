import './Journal.scss'
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

function Journal() {
  // TODO: time blocker / management

  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState<[]>([]);

  async function createTask() {
    await axios.post(import.meta.env.VITE_URL + '/tasks/create', {
      Title: title,
      DueDate: dueDate,
    },
    {
      withCredentials: true,
    })
  }

  async function getTasks() {
    const res = await axios.get(import.meta.env.VITE_URL + '/tasks', 
    {
      withCredentials: true,
    });
    setTasks(res.data);
  }

  const { status } = useQuery('tasks', getTasks);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  return (
    <div className="Journal">
      <input className="RegisterInput" placeholder="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button className="RegisterButton" onClick={createTask}>Create Task</button>

      <h1>Tasks:</h1>
      {
        tasks.map((task: any) => (
          <div key={task.ID}>
             <p>id: {task.ID} title: {task.Title} timeSpent: {task.TimeSpent} current: {task.Current} completed: {task.Completed}</p>
          </div>
        ))
      }
    </div>
  )
}

export default Journal;
