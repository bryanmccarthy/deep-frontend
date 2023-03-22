import './ExpandedTask.scss';
import ProgressBar from './ProgressBar/ProgressBar';
import ExpandedTaskHeader from './ExpandedTaskHeader/ExpandedTaskHeader';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import AddIcon from '@mui/icons-material/Add';
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
const accent2 = '#ccced1';

function ExpandedTask({ expandedTaskID, expandedTaskTitle, expandedTaskDifficulty, expandedTaskDueDate, expandedTaskCompleted, setExpandedTaskCompleted, expandedTaskProgress, setExpandedTaskProgress, expandedTaskTimeSpent, setExpandedTaskTimeSpent }: ExpandedTaskProps) {
  const [expandedTaskNotes, setExpandedTaskNotes] = useState<any>([]);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const [openNoteID, setOpenNoteID] = useState<number | null>(null);
  const [openNoteContent, setOpenNoteContent] = useState<string>('');
  const [updatedTitle, setUpdatedTitle] = useState<string>('');

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

  async function handleDeleteNote(e: any, id: number) {
    e.stopPropagation();
    const res = await axios.delete(import.meta.env.VITE_URL + '/notes/delete', {
      data: {
        id: id
      },
      withCredentials: true,
    });

    if (res.status === 200) {
      const updatedNotes = expandedTaskNotes.filter((note: any) => {
        return note.id !== id;
      });
      if (updatedNotes.length === 0) {
        setExpandedTaskNotes([]);
        setOpenNoteID(null);
        setOpenNoteContent('');
      } else {
        setExpandedTaskNotes(updatedNotes);
        if (id === openNoteID) {
          setOpenNoteID(updatedNotes[0].id);
          setOpenNoteContent(updatedNotes[0].content);
        }
      }
    } else {
      setErrorSnackbarOpen(true);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUpdatedTitle(e.target.value);
  }

  async function handleUpdateNoteTitle(e: React.ChangeEvent<HTMLInputElement>,id: number) {
    const res = await axios.put(import.meta.env.VITE_URL + '/notes/update/title', {
        id: id,
        title: updatedTitle,
      },
      {
      withCredentials: true,
    });

    if (res.status === 200) {
      setUpdatedTitle('');
    } else {
      setErrorSnackbarOpen(true);
    }

    e.target.readOnly = true; // Make input readonly
  }

  function handleDoubleClick(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.readOnly = false; // Make input editable
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
                <div className="Note" onClick={() => handleNoteChange(note)} key={note.id} style={{ borderTop: openNoteID === note.id ? "1px solid #FFAC1C" : "1px solid #ccced1" }}>
                  <input 
                    className="NoteTitle" 
                    type="text"
                    defaultValue={note.title}
                    placeholder="title..."
                    readOnly={true}
                    onDoubleClick={(e) => handleDoubleClick(e)}
                    onChange={(e) => handleInputChange(e)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUpdateNoteTitle(e, note.id);
                        e.currentTarget.blur(); // Unfocus input
                      } else if (e.key === 'Escape') {
                        e.currentTarget.blur(); // Unfocus input
                      }
                    }} 
                  />                  
                  <div className="NoteDeleteIcon" onClick={(e) => {handleDeleteNote(e, note.id)}}>
                      &times;
                  </div>
                </div>
              )
            })
          }
        </div>
        <AddIcon className="AddIcon" onClick={handleCreateNote} />
      </div>

      <div className="TaskCurrentNote">
        {
          openNoteID ?
            <textarea 
              className="TaskCurrentNoteText" 
              placeholder="note..." 
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
              placeholder="note..."
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
