import './ExpandedTask.scss';
import ProgressBar from './ProgressBar/ProgressBar';
import ExpandedTaskHeader from './ExpandedTaskHeader/ExpandedTaskHeader';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
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

const primary = '#ffffff';
const accent = '#000000';

function ExpandedTask({ expandedTaskID, expandedTaskTitle, expandedTaskDifficulty, expandedTaskDueDate, expandedTaskCompleted, setExpandedTaskCompleted, expandedTaskProgress, setExpandedTaskProgress, expandedTaskTimeSpent, setExpandedTaskTimeSpent }: ExpandedTaskProps) {
  const [expandedTaskNotes, setExpandedTaskNotes] = useState<any>([]);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const [openNoteID, setOpenNoteID] = useState<number | null>(null);
  const [openNoteContent, setOpenNoteContent] = useState<string>('');

  async function handleCreateNote() {
    const res = await axios.post(import.meta.env.VITE_URL + '/notes/create', {
      title: '',
      content: '',
      task_id: expandedTaskID,
    },
    {
      withCredentials: true,
    });

    if (res.status === 200) {
      setExpandedTaskNotes([...expandedTaskNotes, res.data]);
      setOpenNoteID(res.data.id);
      setOpenNoteContent('');
    } else {
      setErrorSnackbarOpen(true);
    }
  }

  async function handleCreateFirstNote() {
    const res = await axios.post(import.meta.env.VITE_URL + '/notes/create', {
      title: '',
      content: openNoteContent,
      task_id: expandedTaskID,
    },
    {
      withCredentials: true,
    });

    if (res.status === 200) {
      setExpandedTaskNotes([...expandedTaskNotes, res.data]);
      setOpenNoteID(res.data.id);
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

    if (res.status === 200) {
      const updatedNotes = expandedTaskNotes.map((note: any) => {
        if (note.id === openNoteID) {
          return res.data;
        } else {
          return note;
        }
      });
      setExpandedTaskNotes(updatedNotes);
    } else {
      setErrorSnackbarOpen(true);
    }
  }

  async function getNotes() {
    const res = await axios.get(import.meta.env.VITE_URL + `/notes/${expandedTaskID}`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      if (res.data.length === 0) return;

      setExpandedTaskNotes(res.data);
      setOpenNoteID(res.data[0].id);
      setOpenNoteContent(res.data[0].content);
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

  function handleNewNoteChange(e: any) {
    setOpenNoteContent(e.target.value);
  }

  // Fetch notes on page load
  const { status } = useQuery('notes', getNotes);

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
        <div className="TaskNotesHeaders">
          {
            expandedTaskNotes.map((note: any) => {
              return (
                <div className="Note" onClick={() => handleNoteChange(note)} key={note.id} style={{ backgroundColor: openNoteID === note.id ? accent : primary }}>
                  <div className="NoteTitle">{ note.title }</div>
                </div>
              )
            })
          }
        </div>
        <NoteAddIcon className="AddNoteIcon" onClick={handleCreateNote} />
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
            <textarea
              className="TaskCurrentNoteText"
              placeholder="begin typing..."
              value={openNoteContent}
              onChange={handleNewNoteChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreateFirstNote();
                  e.currentTarget.blur(); // Unfocus input
                } else if (e.key === 'Escape') {
                  e.currentTarget.blur(); // Unfocus input
                }
              }}>
            </textarea>
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
