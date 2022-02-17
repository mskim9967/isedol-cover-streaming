import './App.css';
import BottomTab from './component/BottomTab';
import MusicPlayer from './component/MusicPlayer';
import { useState } from 'react';
import PlaylistScreen from './screen/PlaylistScreen';
import IdolScreen from './screen/IdolScreen';
import SettingScreen from './screen/SettingScreen';
import color from './static/color';

function App() {
  const [isMusicPlayerActive, setMusicPlayerActive] = useState(false);
  const [screen, setScreen] = useState('playlist');

  return (
    <div
      className='App'
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: window.innerHeight,
        width: window.innerWidth,
        overflow: 'hidden',
        color: color.textBlack,
      }}
    >
      <div style={{ height: '100%', width: '100%', overflow: 'scroll', padding: '50px 20px 150px 20px' }}>
        {screen === 'playlist' ? <PlaylistScreen /> : screen === 'music' ? <MusicPlayer /> : screen === 'idol' ? <IdolScreen /> : <SettingScreen />}
      </div>
      <MusicPlayer isActive={isMusicPlayerActive} setActive={setMusicPlayerActive} />
      <BottomTab screen={screen} setScreen={setScreen} isMusicPlayerActive={isMusicPlayerActive} />
    </div>
  );
}

export default App;
