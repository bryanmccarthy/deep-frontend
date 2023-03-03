import './ExpandedTask.scss';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import dayjs from 'dayjs';

type ExpandedTaskProps = {
  expandedTaskID: number;
  expandedTaskTitle: string;
  expandedTaskDifficulty: number;
  expandedTaskDueDate: string;
  expandedTaskCompleted: boolean;
  setExpandedTaskCompleted: (completed: boolean) => void;
}

function ExpandedTask({ expandedTaskID, expandedTaskTitle, expandedTaskDifficulty, expandedTaskDueDate, expandedTaskCompleted, setExpandedTaskCompleted }: ExpandedTaskProps) {
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [expandedTaskNotes, setExpandedTaskNotes] = useState<[]>([]);

  async function createNote() {
    const res = await axios.post(import.meta.env.VITE_URL + '/notes/create', {
      title: noteTitle,
      task_id: expandedTaskID,
    },
    {
      withCredentials: true,
    });

    if (res.status === 200) {
      getNotes();
    } else {
      // TODO: display error snackbar
    }
  }

  async function toggleCompleted(id: number, completed: boolean) {
    const res = await axios.put(import.meta.env.VITE_URL + '/tasks/update/completed', {
      id: id,
      completed: !completed,
    },
    {
      withCredentials: true,
    });

    if (res.status === 200) {
      setExpandedTaskCompleted(!completed);
    } else {
      // TODO: display error snackbar
    }
  }

  async function getNotes() {
    const res = await axios.get(import.meta.env.VITE_URL + `/notes/${expandedTaskID}`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      setExpandedTaskNotes(res.data);
    }
  }

  // Fetch notes on page load
  const { status } = useQuery('tasks', getNotes);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  return (
    <div className="ExpandedTask">
      <div className="TaskInfoHeader">
        <div>{ expandedTaskTitle }</div>
        <div>
          { expandedTaskDifficulty === 0 ? <FiberManualRecordIcon className="DifficultyIcon" /> : expandedTaskDifficulty === 1 ? <div><FiberManualRecordIcon className="DifficultyIcon" /> <FiberManualRecordIcon className="DifficultyIcon" /></div> : <div><FiberManualRecordIcon className="DifficultyIcon" /> <FiberManualRecordIcon className="DifficultyIcon" /> <FiberManualRecordIcon className="DifficultyIcon" /></div> }
        </div>
        <div>{ dayjs(expandedTaskDueDate).format('MM/DD/YYYY') }</div>
        { expandedTaskCompleted ? <CheckCircleIcon className="TaskCompleted" onClick={() => toggleCompleted(expandedTaskID, true) } /> : <CircleOutlinedIcon className="TaskCompleted" onClick={() => toggleCompleted(expandedTaskID, false) } /> }
      </div>

      <div className="TaskProgress">
        task progress bar goes here
      </div>

      {/* TODO: Notes */}
      <div className="TaskNotes">
        Notes carousel goes here
        {
          expandedTaskNotes.map((note: any) => {
            return (
              <div className="Note" key={note.id}>
                <div>{ note.title }</div>
              </div>
            )
          })
        }

        <div className="NewNote">
          <input className="NoteTitleInput" type="text" placeholder="Title" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
          <button className="CreateNoteButton" onClick={createNote}>Add Note</button>
        </div>
      </div>

      <div className="TaskCurrentNote">
        <textarea className="TaskCurrentNoteText"></textarea>
      </div>
    </div>
  )
}

export default ExpandedTask;
