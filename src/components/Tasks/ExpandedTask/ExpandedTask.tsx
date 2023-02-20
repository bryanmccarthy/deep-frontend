import './ExpandedTask.scss';
import axios from 'axios';
import { useState } from 'react';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

interface ExpandedTaskProps {
  showExpandedTask: boolean;
  setShowExpandedTask: (show: boolean) => void;
  expandedTaskID: number;
  expandedTaskTitle: string;
  expandedTaskDifficulty: number;
  expandedTaskTimeSpent: number;
  expandedTaskCompleted: boolean;
  expandedTaskNotes: [];
}

function ExpandedTask({ showExpandedTask, setShowExpandedTask, expandedTaskID, expandedTaskTitle, expandedTaskDifficulty, expandedTaskTimeSpent, expandedTaskCompleted, expandedTaskNotes }: ExpandedTaskProps) {
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

  const handleCloseExpandedTask = () => {
    setShowExpandedTask(false);
  }

  return (
    <div className="ExpandedTask" style={{ visibility: showExpandedTask ? "visible" : "hidden" }}>
      <button className="CloseButton" onClick={handleCloseExpandedTask}><KeyboardReturnIcon fontSize="large" /></button>
      <div className="TaskData" style={{marginTop: '5em'}}>
        Task Data:
        <div>id: {expandedTaskID}</div>
        <div>title: {expandedTaskTitle}</div>
        <div>difficulty: {expandedTaskDifficulty}</div>
        <div>time spent: {expandedTaskTimeSpent}</div>
        {expandedTaskCompleted ? <div>completed: true</div> : <div>completed: false</div>}
        Notes:
        {
          expandedTaskNotes.map((note: any) => {
            return (
              <div key={note.ID}>
                {note.Title}
              </div>
            )
          })
        }
      </div>

      <div className="NoteCreate" style={{marginTop: '5em'}}>
        <input className="NoteTitleInput" type="text" placeholder="Title" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
        <button className="CreateNoteButton" onClick={createNote}>Create Note</button>
      </div>
    </div>
  )
}

export default ExpandedTask;
