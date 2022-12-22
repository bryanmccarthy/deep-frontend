import './Settings.scss'
import { useEffect, useRef } from 'react';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';

interface SettingsProps {
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  mode: string | null;
  setMode: (mode: string) => void;
}

function Settings({ showSettings, setShowSettings, mode, setMode }: SettingsProps) {
  const ref = useRef<HTMLInputElement>(null);

  const handleCloseSettings = () => {
    setShowSettings(false);
  }

  // Handle click outside of settings
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

  const handleModeChange = () => {
    if (mode === 'dark') {
      localStorage.setItem('mode', 'light');
      setMode('light')
    } else {
      localStorage.setItem('mode', 'dark');
      setMode('dark')
    }
  }

  return (
    <div ref={ref} className="Settings" style={{ visibility: showSettings ? "visible" : "hidden" }}>
      <button className="CloseButton" onClick={handleCloseSettings}>&times;</button>
      <div className="SettingsList">
        <div className="SettingsItem">
          <label>Dark Mode</label>
          { mode === 'dark' ? <BsToggleOn className="SettingsToggle" onClick={handleModeChange} /> : <BsToggleOff className="SettingsToggle" onClick={handleModeChange}/> }
        </div>
      </div>
    </div>
  )
}

export default Settings;
