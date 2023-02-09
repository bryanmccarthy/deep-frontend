
interface ExpandedTaskProps {
  showExpandedTask: boolean;
  setShowExpandedTask: (show: boolean) => void;
}

function ExpandedTask({ showExpandedTask, setShowExpandedTask }: ExpandedTaskProps) {

  return (
    <div className="ExpandedTask" style={{ visibility: showExpandedTask ? "visible" : "hidden" }}>
      Expanded Task
    </div>
  )
}

export default ExpandedTask;
