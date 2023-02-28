import './ExpandedTask.scss';
import axios from 'axios';
import { useState } from 'react';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

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
      title: noteTitle,
      task_id: expandedTaskID,
    },
    {
      withCredentials: true,
    });
  }

  async function toggleCompleted(id: number, completed: boolean) {
    await axios.put(import.meta.env.VITE_URL + '/tasks/update/completed', {
      id: id,
      completed: !completed,
    },
    {
      withCredentials: true,
    });
    setExpandedTaskCompleted(!completed);
  }

  return (
    <div className="ExpandedTask" style={{ visibility: showExpandedTask ? "visible" : "hidden" }}>
      <button className="CloseButton" onClick={handleCloseExpandedTask}><KeyboardReturnIcon fontSize="large" /></button>
      <div className="TaskInfoHeader">
        <div>{ expandedTaskTitle }</div>
        <div>
          { expandedTaskDifficulty === 0 ? <FiberManualRecordIcon fontSize="small" /> : expandedTaskDifficulty === 1 ? <div><FiberManualRecordIcon fontSize="small" /> <FiberManualRecordIcon fontSize="small" /></div> : <div><FiberManualRecordIcon fontSize="small" /> <FiberManualRecordIcon fontSize="small" /> <FiberManualRecordIcon fontSize="small" /></div> }
        </div>
        { expandedTaskCompleted ? <CheckCircleIcon className="TaskCompleted" onClick={() => toggleCompleted(expandedTaskID, true) } /> : <CircleOutlinedIcon className="TaskCompleted" onClick={() => toggleCompleted(expandedTaskID, false) } /> }
      </div>
      <div className="TaskNotes">
        Notes:
        {
          expandedTaskNotes.map((note: any) => {
            return (
              <div className="Note" key={note.id}>
                <div>{ note.title }</div>
              </div>
            )
          })
        }

        <div className="NewNote" style={{paddingTop:'5em'}}>
          <input className="NoteTitleInput" type="text" placeholder="Title" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
          <button className="CreateNoteButton" onClick={createNote}>Add Note</button>
        </div>

      </div>
    </div>
  )
}

export default ExpandedTask;
