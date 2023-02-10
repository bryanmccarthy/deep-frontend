import './NewTask.scss';

interface NewTaskProps {
  showNewTask: boolean;
  setShowNewTask: (show: boolean) => void;
}

function NewTask({ showNewTask, setShowNewTask }: NewTaskProps) {

  function handleCloseNewTask() {
    setShowNewTask(false);
  }
  
  return (
    <div className="NewTask" style={{ visibility: showNewTask ? "visible" : "hidden" }}>
      <button className="CloseButton" onClick={handleCloseNewTask}>&times;</button>
      {/* TODO: Implement */}
    </div>
  )
}

export default NewTask;
