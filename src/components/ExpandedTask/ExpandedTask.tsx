import './ExpandedTask.scss';
import ProgressBar from './ProgressBar/ProgressBar';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import dayjs from 'dayjs';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);

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
      setErrorSnackbarOpen(true);
    }
  }

  async function getNotes() {
    const res = await axios.get(import.meta.env.VITE_URL + `/notes/${expandedTaskID}`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      setExpandedTaskNotes(res.data);
    } else {
      setErrorSnackbarOpen(true);
    }
  }

  function handleSnackbarClose() {
    setErrorSnackbarOpen(false);
  };

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
        { expandedTaskCompleted ? 
            <CheckBoxIcon className="TaskCompleted" onClick={() => toggleCompleted(expandedTaskID, true) } />
          : 
            <CheckBoxOutlineBlankIcon className="TaskCompleted" onClick={() => toggleCompleted(expandedTaskID, false) } /> }
        {/* TODO: change circle icon*/}
      </div>

      <ProgressBar />

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

      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message="oops, something went wrong!"
        action={
          <div>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        }
      />
    </div>
  )
}

export default ExpandedTask;
