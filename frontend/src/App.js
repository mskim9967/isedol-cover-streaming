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
  const [lang, setLang] = useState('kor');

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
      <div style={{ height: '100%', width: '100%', overflow: 'scroll', padding: '50px 20px 170px 20px', backgroundColor: color.bgLight }}>
        {screen === 'playlist' ? (
          <PlaylistScreen lang={lang} />
        ) : screen === 'music' ? (
          <MusicPlayer lang={lang} />
        ) : screen === 'idol' ? (
          <IdolScreen lang={lang} />
        ) : (
          <SettingScreen lang={lang} setLang={setLang} />
        )}
      </div>
      <MusicPlayer isActive={isMusicPlayerActive} setActive={setMusicPlayerActive} lang={lang} />
      <BottomTab screen={screen} setScreen={setScreen} isMusicPlayerActive={isMusicPlayerActive} lang={lang} />
    </div>
  );
}

export default App;
