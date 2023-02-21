import './ExpandedTask.scss';
import axios from 'axios';
import { useState } from 'react';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

interface ExpandedTaskProps {
  showExpandedTask: boolean;
  handleCloseExpandedTask: () => void;
  expandedTaskID: number;
  expandedTaskTitle: string;
  expandedTaskDifficulty: number;
  expandedTaskTimeSpent: number;
  expandedTaskCompleted: boolean;
  setExpandedTaskCompleted: (completed: boolean) => void;
  expandedTaskNotes: [];
}

function ExpandedTask({ showExpandedTask, handleCloseExpandedTask, expandedTaskID, expandedTaskTitle, expandedTaskDifficulty,
                       expandedTaskTimeSpent, expandedTaskCompleted, setExpandedTaskCompleted, expandedTaskNotes }: ExpandedTaskProps) {
  const [noteTitle, setNoteTitle] = useState<string>('');

  async function createNote() {
    await axios.post(import.meta.env.VITE_URL + '/notes/create', {
      Title: noteTitle,
      TaskID: expandedTaskID,
    },
    {
      withCredentials: true,
    });
  }

  async function toggleCompleted(id: number, completed: boolean) {
    await axios.put(import.meta.env.VITE_URL + '/tasks/update/completed', {
      ID: id,
      Completed: !completed,
    },
    {
      withCredentials: true,
    });
    setExpandedTaskCompleted(!completed);
  }

  function formattedTimeSpent(timeSpent: number) {
    const hours = Math.floor(timeSpent / 60);
    const minutes = timeSpent % 60;

    return `${hours}h ${minutes}m`;
  }

  return (
    <div className="ExpandedTask" style={{ visibility: showExpandedTask ? "visible" : "hidden" }}>
      <button className="CloseButton" onClick={handleCloseExpandedTask}><KeyboardReturnIcon fontSize="large" /></button>
      <div className="TaskInfoHeader">
        <div>{ expandedTaskTitle }</div>
        { expandedTaskDifficulty === 0 ? <div style={{ color: 'green' }}>Easy</div> : expandedTaskDifficulty === 1 ? <div style={{ color: 'orange' }}>Medium</div> : <div style={{ color: 'red' }}>Hard</div> }
        <div>{ formattedTimeSpent(expandedTaskTimeSpent) }</div>
        { expandedTaskCompleted ? <CheckCircleIcon className="TaskCompleted" onClick={() => toggleCompleted(expandedTaskID, true) } /> : <CircleOutlinedIcon className="TaskCompleted" onClick={() => toggleCompleted(expandedTaskID, false) } /> }
      </div>
    </div>
  )
}

export default ExpandedTask;
