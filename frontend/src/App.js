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
    titleEng: 'Loading...',
    titleKor: '로딩 중...',
    titleJpn: 'Loading...',
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
    localStorage.setItem('isDark', JSON.stringify(isDark));
    document.body.style.backgroundColor = color.bgLight;
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
  let noSleep = new NoSleep();

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
    audio.current.addEventListener(
      'canplaythrough',
      () => {
        play();
      },
      false
    );
    document.addEventListener(
      'keydown',
      (e) => {
        if (e.repeat) return;
        if (e.code === 'Space') {
          if (audio.current.paused) {
            pause();
          } else {
            play();
          }
        }
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
    pause();
    setNowIdx((nowIdx + 1) % playlist.length);
    setLoad(!load);
  };

  const playPrev = () => {
    pause();
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
        height,
        width: '100vw',
        color: color.textBlack,
      }}
    >
      <audio ref={audio} />
      <div
        style={{
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: screen === 'setting' ? color.bgLittleLight : color.bgLight,
        }}
      >
        <div
          id='scrollbarDisable'
          style={{
            height: '100%',
            width: '100%',
            padding: '50px 20px 180px 20px',
            overflow: 'auto',
            ...(screen !== 'playlist' && { display: 'none' }),
          }}
        >
          <PlaylistScreen
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

        <div
          id='scrollableDiv'
          style={{
            height: '100%',
            width: '100%',
            padding: '50px 20px 0 20px',
            overflow: 'auto',
            ...(screen !== 'music' && { display: 'none' }),
          }}
        >
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
        <div
          id='scrollbarDisable'
          style={{
            height: '100%',
            width: '100%',
            ...(screen !== 'idol' && { display: 'none' }),
          }}
        >
          <IdolScreen lang={lang} isDark={isDark} height={height} />
        </div>
        <div
          id='scrollbarDisable'
          style={{
            height: '100%',
            width: '100%',
            padding: '50px 20px 0 20px',
            overflow: 'auto',
            ...(screen !== 'setting' && { display: 'none' }),
          }}
        >
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
          <div style={{ height: '180px' }} />
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
        audio={audio}
        audioControl={audioControl}
        isPause={isPause}
        music={music}
        customPlaylist={customPlaylist}
        setCustomPlaylist={setCustomPlaylist}
        imgDisable={imgDisable}
        anim={anim}
        height={height}
      />
      <BottomTab screen={screen} setScreen={setScreen} isMusicPlayerActive={isMusicPlayerActive} lang={lang} isDark={isDark} />
    </div>
  );
}

export default memo(App);
