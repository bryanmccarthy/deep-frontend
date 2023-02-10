import './ExpandedTask.scss'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

interface ExpandedTaskProps {
  showExpandedTask: boolean;
  setShowExpandedTask: (show: boolean) => void;
  expandedTaskData: any;
}

function ExpandedTask({ showExpandedTask, setShowExpandedTask, expandedTaskData }: ExpandedTaskProps) {

  console.log('expandedTaskData: ', expandedTaskData) // TODO: reference for index of data

  const handleCloseExpandedTask = () => {
    setShowExpandedTask(false);
  }

  return (
    <div className="ExpandedTask" style={{ visibility: showExpandedTask ? "visible" : "hidden" }}>
      <button className="CloseButton" onClick={handleCloseExpandedTask}><KeyboardReturnIcon /></button>
      <div className="TaskData">
        Task Data:
        { expandedTaskData }
      </div>
    </div>
  )
}

export default ExpandedTask;
