import './Journal.scss'
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

function Journal() {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState<[]>([]);

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

  async function updateTask() {
    const res = await axios.put(import.meta.env.VITE_URL + '/tasks/update', {
      ID: 1,
      Title: 'updated title',
      TimeSpent: 0,
      Current: false,
      Completed: false,
    },
    {
      withCredentials: true,
    });
    console.log(res);
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
      <button className="UpdateTaskButton" onClick={updateTask}>Update Task</button> 
      {/* // TODO: test remove update task with id 1 */}
    </div>
  )
}

export default Journal;
