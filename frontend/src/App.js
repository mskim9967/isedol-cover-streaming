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
import { axiosInstance } from './axiosInstance';
import NoSleep from 'nosleep.js';

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
  const [music, setMusic] = useState({
    titleEng: 'Empty',
    titleKor: '비어있음',
    titleJpn: '空',
    oSingerEng: '',
    oSingerKor: '',
    oSingerEng: '',
    singer: 'null',
    youtubeUrl: '',
  });
  const [isPause, setPause] = useState(true);

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
    setPlaylist([...temp]);
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
  var noSleep = new NoSleep();

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    document.addEventListener(
      'click',
      function enableNoSleep() {
        document.removeEventListener('click', enableNoSleep, false);
        noSleep.enable();
      },
      false
    );

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const audio = useRef(null);

  const reload = () => {
    audio.current.src = `${axiosInstance.defaults.baseURL}/music/streaming/${music.fileName}.mp3`;
    audio.current.load();
    play();
  };

  const pause = () => {
    audio.current.pause();
    setPause(true);
  };

  const play = () => {
    audio.current.play();
    setPause(false);
  };

  const repeat = () => {
    audio.current.currentTime = 0;
    play();
  };

  const playNext = () => {
    setNowIdx((nowIdx + 1) % playlist.length);
    setLoad(!load);
  };

  const playPrev = () => {
    if (audio.current.currentTime <= 2) {
      setNowIdx((playlist.length + nowIdx - 1) % playlist.length);
      setLoad(!load);
    } else repeat();
  };

  useEffect(() => {
    if (!music.oSingerKor) return;
    reload(nowIdx, playlist);
  }, [music]);

  useEffect(async () => {
    const res = await axiosInstance.get(`/music/${playlist[nowIdx].id}`);
    setMusic(res.data.data);
  }, [load]);

  const audioControl = { pause, reload, play, playNext, playPrev, repeat };

  return (
    <div
      className={`App ${!anim && 'disableAnim'}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: window.innerHeight,
        width: '100vw',
        color: color.textBlack,
      }}
    >
      <audio ref={audio} />
      <div
        id='scrollableDiv'
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
            audio={audio}
            audioControl={audioControl}
            isPause={isPause}
            music={music}
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
            audio={audio}
            audioControl={audioControl}
            isPause={isPause}
            music={music}
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
            audio={audio}
            audioControl={audioControl}
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
        audio={audio}
        audioControl={audioControl}
        isPause={isPause}
        music={music}
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
