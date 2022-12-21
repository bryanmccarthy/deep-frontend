import './Settings.scss'
import { useEffect, useRef } from 'react';

interface SettingsProps {
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
}

function Settings({ showSettings, setShowSettings }: SettingsProps) {
  const ref = useRef<HTMLInputElement>(null);

  const handleCloseSettings = () => {
    setShowSettings(false);
  }
  
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div ref={ref} className="Settings" style={{ visibility: showSettings ? "visible" : "hidden" }}>
      <button className="CloseButton" onClick={handleCloseSettings}>&times;</button>
      <h1>Settings</h1>
    </div>
  )
}

export default Settings;
