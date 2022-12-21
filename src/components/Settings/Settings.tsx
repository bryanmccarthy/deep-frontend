import './Settings.scss'
import { useEffect, useRef } from 'react';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';

interface SettingsProps {
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
}

function Settings({ showSettings, setShowSettings }: SettingsProps) {
  const ref = useRef<HTMLInputElement>(null);

  const mode = 'dark'; // TODO: Inplement dark mode

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
      <div className="SettingsList">
        <div className="SettingsItem">
          <label>Dark Mode</label>
          { mode === 'dark' ? <BsToggleOn className="SettingsToggle" /> : <BsToggleOff className="SettingsToggle" /> }
        </div>
      </div>
    </div>
  )
}

export default Settings;
