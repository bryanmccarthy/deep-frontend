import './Journal.scss'

type Style = {
  color: string;
  backgroundColor: string;
}

interface JournalProps {
  style: Style;
}

function Journal({ style }: JournalProps) {
  // TODO: time blocker / management
  // TODO: deep work journal
  return (
    <div className="Journal" style={{color: style.color, backgroundColor: style.backgroundColor}}>
      <h1>Journal</h1> 
    </div>
  )
}

export default Journal;
