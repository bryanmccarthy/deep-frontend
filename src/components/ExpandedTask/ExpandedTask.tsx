import './ExpandedTask.scss';
import ProgressBar from './ProgressBar/ProgressBar';
import ExpandedTaskHeader from './ExpandedTaskHeader/ExpandedTaskHeader';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
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
  expandedTaskProgress: number;
  setExpandedTaskProgress: (progress: number) => void;
  expandedTaskTimeSpent: number;
  setExpandedTaskTimeSpent: (timeSpent: number) => void;
}

const accent2 = '#ccced1';

function ExpandedTask({ expandedTaskID, expandedTaskTitle, expandedTaskDifficulty, expandedTaskDueDate, expandedTaskCompleted, setExpandedTaskCompleted, expandedTaskProgress, setExpandedTaskProgress, expandedTaskTimeSpent, setExpandedTaskTimeSpent }: ExpandedTaskProps) {
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [expandedTaskNotes, setExpandedTaskNotes] = useState<[]>([]);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const [openNoteID, setOpenNoteID] = useState<number | null>(null);
  const [openNoteContent, setOpenNoteContent] = useState<string>('');

  async function createNote() {
    const res = await axios.post(import.meta.env.VITE_URL + '/notes/create', {
      title: noteTitle,
      content: '',
      task_id: expandedTaskID,
    },
    {
      withCredentials: true,
    });

    if (res.status === 200) {
      getNotes();
    } else {
      setErrorSnackbarOpen(true);
    }
  }

  async function handleUpdateNoteContent() {
    const res = await axios.put(import.meta.env.VITE_URL + '/notes/update/content', {
      id: openNoteID,
      content: openNoteContent,
    },
    {
      withCredentials: true,
    });

    if (res.status !== 200) {
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

  function handleSnackbarOpen() {
    setErrorSnackbarOpen(true);
  }

  function handleSnackbarClose() {
    setErrorSnackbarOpen(false);
  };

  function handleNoteChange(note: any) {
    setOpenNoteID(note.id);
    setOpenNoteContent(note.content);
  }

  function handleContentChange(e: any) {
    setOpenNoteContent(e.target.value);
  }

  // Fetch notes on page load
  const { status } = useQuery('tasks', getNotes);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error</div>;

  return (
    <div className="ExpandedTask">
      <ExpandedTaskHeader 
        expandedTaskCompleted={expandedTaskCompleted}
        setExpandedTaskCompleted={setExpandedTaskCompleted}
        expandedTaskTitle={expandedTaskTitle} 
        expandedTaskDueDate={expandedTaskDueDate} 
        expandedTaskID={expandedTaskID}
        handleSnackbarOpen={handleSnackbarOpen}
      />

      <ProgressBar 
        expandedTaskID={expandedTaskID} 
        expandedTaskProgress={expandedTaskProgress}
        expandedTaskDifficulty={expandedTaskDifficulty} 
      />

      <div className="TaskNotes">
        {
          expandedTaskNotes.map((note: any) => {
            return (
              <div className="Note" onClick={() => handleNoteChange(note)} key={note.id} style={{ boxShadow: openNoteID === note.id ? `0 0 1em ${accent2}` : 'none'}}>
                <div className="NoteTitle">{ note.title }</div>
              </div>
            )
          })
        }
      </div>

      <div className="NewNote">
          <input 
            className="NoteTitleInput" 
            type="text" 
            placeholder="Title" 
            value={noteTitle} 
            onChange={(e) => setNoteTitle(e.target.value)} 
          />
          <button className="CreateNoteButton" onClick={createNote}>Add Note</button>
      </div>

      <div className="TaskCurrentNote">
        {
          openNoteID ?
            <textarea 
              className="TaskCurrentNoteText" 
              placeholder="begin typing..." 
              value={openNoteContent} 
              onChange={handleContentChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleUpdateNoteContent();
                  e.currentTarget.blur(); // Unfocus input
                } else if (e.key === 'Escape') {
                  e.currentTarget.blur(); // Unfocus input
                }
              }}>
            </textarea>
          :
            null
        }
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
