import './ExpandedTaskHeader.scss';
import axios from 'axios';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import dayjs from 'dayjs';

type expandedTaskHeaderProps = {
  expandedTaskCompleted: boolean;
  setExpandedTaskCompleted: (completed: boolean) => void;
  expandedTaskTitle: string;
  expandedTaskDueDate: string;
  expandedTaskID: number;
  handleSnackbarOpen: () => void;
}

function ExpandedTaskHeader({ expandedTaskCompleted, setExpandedTaskCompleted, expandedTaskTitle, expandedTaskDueDate, expandedTaskID, handleSnackbarOpen }: expandedTaskHeaderProps) {

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
      handleSnackbarOpen();
    }
  }

  return (
    <div className="ExpandedTaskHeader">
        <div className="TaskInfoHeaderLeft">
          { expandedTaskCompleted ? 
              <CheckBoxIcon className="TaskCompleted" onClick={() => toggleCompleted(expandedTaskID, true) } />
            : 
              <CheckBoxOutlineBlankIcon className="TaskCompleted" onClick={() => toggleCompleted(expandedTaskID, false) } /> 
          }
          <div className="TaskInfoHeaderTitle">{ expandedTaskTitle }</div>
        </div>
        <div>Due: { dayjs(expandedTaskDueDate).format('MM/DD/YYYY') }</div>
      </div>
  )
}

export default ExpandedTaskHeader;