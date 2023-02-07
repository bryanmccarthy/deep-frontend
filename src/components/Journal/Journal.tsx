import './Journal.scss'
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

function Journal() {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState<[]>([]);

  // Create task initially with title
  async function createTask() {
    await axios.post(import.meta.env.VITE_URL + '/tasks/create', {
      Title: title,
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
