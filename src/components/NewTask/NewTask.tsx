import './NewTask.scss';
import axios from 'axios';
import { useState } from 'react';

interface NewTaskProps {
  showNewTask: boolean;
  setShowNewTask: (show: boolean) => void;
}

function NewTask({ showNewTask, setShowNewTask }: NewTaskProps) {
  const [title, setTitle] = useState('');

  // Create task initially with title
  async function createTask() {
    await axios.post(import.meta.env.VITE_URL + '/tasks/create', {
      Title: title,
    },
    {
      withCredentials: true,
    });
  }

  function handleCloseNewTask() {
    setShowNewTask(false);
  }
  
  return (
    <div className="NewTask" style={{ visibility: showNewTask ? "visible" : "hidden" }}>
      <button className="CloseButton" onClick={handleCloseNewTask}>&times;</button>
      {/* TODO: Style */}
      <input className="TitleInput" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button className="CreateTaskButton" onClick={createTask}>+</button>
    </div>
  )
}

export default NewTask;
