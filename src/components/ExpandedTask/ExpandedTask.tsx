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
  expandedTaskTimeSpent: number;
}

function ExpandedTask({ expandedTaskID, expandedTaskTitle, expandedTaskDifficulty, expandedTaskDueDate, expandedTaskCompleted, setExpandedTaskCompleted, expandedTaskProgress, expandedTaskTimeSpent }: ExpandedTaskProps) {
  const [expandedTaskNotes, setExpandedTaskNotes] = useState<any>([]);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);
  const [openNoteID, setOpenNoteID] = useState<number | null>(null);
  const [openNoteContent, setOpenNoteContent] = useState<string>('');
  const [updatedTitle, setUpdatedTitle] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

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

  async function handleExpandedTaskLoad() {
    // Calculate time remaining for expanded task
    calculateTimeRemaining();

    const res = await axios.get(import.meta.env.VITE_URL + `/notes/${expandedTaskID}`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      if (res.data.length === 0) return; // no notes

      setExpandedTaskNotes(res.data);
      setOpenNoteID(res.data[0].id);
      setOpenNoteContent(res.data[0].content);
    } else {
      setErrorSnackbarOpen(true);
    }
  }

  function calculateTimeRemaining() {
    const progressDecimal = expandedTaskProgress / 100;
    const timeSpent = Math.floor(expandedTaskTimeSpent / 60);

    // Calculate time remaining for expanded task
    switch(expandedTaskDifficulty) {
      case 1:
        if(progressDecimal !== 0) {
          setTimeRemaining(Math.floor(25 - (25 * progressDecimal)));
        } else {
          setTimeRemaining(25 - timeSpent);
        }
        break;
      case 2:
        if(progressDecimal !== 0) {
          setTimeRemaining(Math.floor(45 - (45 * progressDecimal)));
        } else {
          setTimeRemaining(45 - timeSpent);
        }
        break;
      case 3:
        if(progressDecimal !== 0) {
          setTimeRemaining(Math.floor(90 - (90 * progressDecimal)));
        } else {
          setTimeRemaining(90 - timeSpent);
        }
        break;
      case 4:
        if(progressDecimal !== 0) {
          setTimeRemaining(Math.floor(180 - (180 * progressDecimal)));
        } else {
          setTimeRemaining(180 - timeSpent);
        }
        break;
      case 5:
        if(progressDecimal !== 0) {
          setTimeRemaining(Math.floor(300 - (300 * progressDecimal)));
        } else {
          setTimeRemaining(300 - timeSpent);
        }
        break;
      default:
        setTimeRemaining(0);
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

  async function handleUpdateNoteTitle(e: any, id: number) {
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

  function handleDoubleClick(e: any) {
    e.target.readOnly = false; // Make input editable
  }

  const { status } = useQuery('expandedTaskLoad', handleExpandedTaskLoad);

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
        expandedTaskTimeSpent={expandedTaskTimeSpent}
        timeRemaining={timeRemaining}
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
