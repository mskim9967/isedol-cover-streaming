import BottomTab from './component/BottomTab';
import MusicPlayer from './component/MusicPlayer';
import { useState, useEffect } from 'react';
import PlaylistScreen from './screen/PlaylistScreen';
import IdolScreen from './screen/IdolScreen';
import SettingScreen from './screen/SettingScreen';
import MusicScreen from './screen/MusicScreen';
import lightColor from './static/lightColor';
import darkColor from './static/darkColor';
import './index.css';

function App() {
  const [isMusicPlayerActive, setMusicPlayerActive] = useState(false);
  const [screen, setScreen] = useState('playlist');
  const [height, setHeight] = useState(window.innerHeight);
  const [lang, setLang] = useState('kor');
  const [anim, setAnim] = useState(JSON.parse(localStorage.getItem('anim')));
  const [isDark, setDark] = useState(JSON.parse(localStorage.getItem('isDark')));

  const color = isDark ? darkColor : lightColor;

  useEffect(() => {
    localStorage.setItem('anim', JSON.stringify(anim));
  }, [anim]);
  useEffect(() => {
    localStorage.setItem('isDark', JSON.stringify(isDark));
  }, [isDark]);

  return (
    <div
      className={`App ${!anim && 'disableAnim'}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: height,
        width: window.innerWidth,
        overflow: 'hidden',
        color: color.textBlack,
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          overflow: 'scroll',
          padding: '50px 20px 170px 20px',
          backgroundColor: screen === 'setting' ? color.bgLittleLight : color.bgLight,
        }}
      >
        {screen === 'playlist' ? (
          <PlaylistScreen lang={lang} isDark={isDark} />
        ) : screen === 'music' ? (
          <MusicScreen lang={lang} isDark={isDark} />
        ) : screen === 'idol' ? (
          <IdolScreen lang={lang} isDark={isDark} />
        ) : (
          <SettingScreen lang={lang} setLang={setLang} isDark={isDark} setDark={setDark} anim={anim} setAnim={setAnim} />
        )}
      </div>
      <MusicPlayer isActive={isMusicPlayerActive} setActive={setMusicPlayerActive} lang={lang} isDark={isDark} />
      <BottomTab screen={screen} setScreen={setScreen} isMusicPlayerActive={isMusicPlayerActive} lang={lang} isDark={isDark} />
    </div>
  );
}

export default App;
