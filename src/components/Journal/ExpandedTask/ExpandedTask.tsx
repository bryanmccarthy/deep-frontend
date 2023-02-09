import './ExpandedTask.scss'

interface ExpandedTaskProps {
  showExpandedTask: boolean;
  setShowExpandedTask: (show: boolean) => void;
}

function ExpandedTask({ showExpandedTask, setShowExpandedTask }: ExpandedTaskProps) {

  const handleCloseExpandedTask = () => {
    setShowExpandedTask(false);
  }

  return (
    <div className="ExpandedTask" style={{ visibility: showExpandedTask ? "visible" : "hidden" }}>
      <button className="CloseButton" onClick={handleCloseExpandedTask}>&times;</button>
      Expanded Task
    </div>
  )
}

export default ExpandedTask;
