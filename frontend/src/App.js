import BottomTab from './component/BottomTab';
import MusicPlayer from './component/MusicPlayer';
import { useState, useEffect, memo, useRef } from 'react';
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
  const [lang, setLang] = useState(JSON.parse(localStorage.getItem('lang')) || 'kor');
  const [anim, setAnim] = useState(JSON.parse(localStorage.getItem('anim')) || true);
  const [isDark, setDark] = useState(
    JSON.parse(localStorage.getItem('isDark')) ||
      (localStorage.getItem('isDark') === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const [imgDisable, setImgDisable] = useState(JSON.parse(localStorage.getItem('imgDisable')));
  const [playlist, setPlaylist] = useState([]);
  const [customPlaylist, setCustomPlaylist] = useState([...JSON.parse(localStorage.getItem('playlists') || '[]')]);
  const [nowIdx, setNowIdx] = useState(-1);
  const [load, setLoad] = useState(false);
  const audioRef = useRef(null);

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
    // default os theme
    localStorage.setItem('isDark', JSON.stringify(isDark));
  }, [isDark]);
  useEffect(() => {
    localStorage.setItem('lang', JSON.stringify(lang));
  }, [lang]);
  useEffect(() => {
    localStorage.setItem('imgDisable', JSON.stringify(imgDisable));
  }, [imgDisable]);
  useEffect(() => {
    localStorage.setItem('playlists', JSON.stringify(customPlaylist));
  }, [customPlaylist]);
  const resizeHandler = () => {
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <div
      className={`App ${!anim && 'disableAnim'}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: window.innerHeight,
        width: '100vw',
        overflow: 'hidden',
        color: color.textBlack,
      }}
    >
      <audio ref={audioRef} />

      <div
        style={{
          height: '100%',
          width: '100%',
          overflow: 'scroll',
          padding: '50px 20px 170px 20px',
          backgroundColor: screen === 'setting' ? color.bgLittleLight : color.bgLight,
        }}
      >
        {screen === 'playlist' && (
          <PlaylistScreen
            playlistControl={playlistControl}
            lang={lang}
            isDark={isDark}
            playlistControl={playlistControl}
            customPlaylist={customPlaylist}
            setCustomPlaylist={setCustomPlaylist}
            imgDisable={imgDisable}
            anim={anim}
            audioRef={audioRef}
          />
        )}
        <div style={{ ...(screen !== 'music' && { display: 'none' }) }}>
          <MusicScreen
            playlistControl={playlistControl}
            lang={lang}
            isDark={isDark}
            customPlaylist={customPlaylist}
            setCustomPlaylist={setCustomPlaylist}
            imgDisable={imgDisable}
            anim={anim}
            audioRef={audioRef}
          />
        </div>
        {screen === 'idol' && <IdolScreen lang={lang} isDark={isDark} />}
        {screen === 'setting' && (
          <SettingScreen
            lang={lang}
            setLang={setLang}
            isDark={isDark}
            setDark={setDark}
            anim={anim}
            audioRef={audioRef}
            setAnim={setAnim}
            imgDisable={imgDisable}
            setImgDisable={setImgDisable}
          />
        )}
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
        audioRef={audioRef}
        customPlaylist={customPlaylist}
        setCustomPlaylist={setCustomPlaylist}
        imgDisable={imgDisable}
        anim={anim}
      />
      <BottomTab screen={screen} setScreen={setScreen} isMusicPlayerActive={isMusicPlayerActive} lang={lang} isDark={isDark} />
    </div>
  );
}

export default memo(App);
