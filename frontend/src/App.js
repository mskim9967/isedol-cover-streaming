import BottomTab from './component/BottomTab';
import MusicPlayer from './component/MusicPlayer';
import { useState, useEffect, memo } from 'react';
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
  const [playlist, setPlaylist] = useState([]);
  const [nowIdx, setNowIdx] = useState(-1);
  const [load, setLoad] = useState(false);

  const add = (music) => {
    let idx = playlist.findIndex((e) => e.id === music.id);

    if (idx !== -1) setNowIdx(idx);
    else {
      setNowIdx(playlist.length);
      setPlaylist([...playlist, music]);
    }
    setLoad(!load);
  };

  const remove = (id) => {
    let temp = playlist.filter((e) => {
      return e.id !== id;
    });
    setPlaylist(temp);
  };

  const change = (ids) => {
    setPlaylist([...ids]);
    setNowIdx(0);
    setLoad(!load);
  };

  useEffect(() => {}, [playlist]);

  const playlistControl = { add, remove, change };

  const color = isDark ? darkColor : lightColor;

  useEffect(() => {
    if (anim === null) setAnim(true);
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
        width: '100vw',
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
        <div style={{ ...(screen !== 'playlist' && { display: 'none' }) }}>
          <PlaylistScreen playlistControl={playlistControl} lang={lang} isDark={isDark} playlistControl={playlistControl} />
        </div>
        <div style={{ ...(screen !== 'music' && { display: 'none' }) }}>
          <MusicScreen playlistControl={playlistControl} lang={lang} isDark={isDark} />
        </div>
        <div style={{ ...(screen !== 'idol' && { display: 'none' }) }}>
          <IdolScreen lang={lang} isDark={isDark} />
        </div>
        <div style={{ ...(screen !== 'setting' && { display: 'none' }) }}>
          <SettingScreen lang={lang} setLang={setLang} isDark={isDark} setDark={setDark} anim={anim} setAnim={setAnim} />
        </div>
      </div>
      <MusicPlayer
        playlist={playlist}
        setPlaylist={setPlaylist}
        playlistControl={playlistControl}
        isActive={isMusicPlayerActive}
        setActive={setMusicPlayerActive}
        lang={lang}
        isDark={isDark}
        nowIdx={nowIdx}
        setNowIdx={setNowIdx}
        load={load}
        setLoad={setLoad}
      />
      <BottomTab screen={screen} setScreen={setScreen} isMusicPlayerActive={isMusicPlayerActive} lang={lang} isDark={isDark} />
    </div>
  );
}

export default memo(App);
