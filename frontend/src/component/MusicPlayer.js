import { IoPlay, IoPlayForward, IoPlayBack, IoChevronDown, IoPause } from 'react-icons/io5';
import { useSwipeable } from 'react-swipeable';

import MusicPlay from './MusicPlay';
import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';
import { Button } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { axiosInstance } from '../axiosInstance';

import gosegu from '../static/image/segu_300_300.webp';
import viichan from '../static/image/chan_300_300.webp';
import jururu from '../static/image/ruru_300_300.webp';
import lilpa from '../static/image/lilpa_300_300.webp';
import jingburger from '../static/image/jing_300_300.webp';
import ine from '../static/image/ine_300_300.webp';
import all from '../static/image/all_300_300.webp';

const member = {
  ine: { kor: '아이네', eng: 'INE', jpn: 'アイネ' },
  jingburger: { kor: '징버거', eng: 'JINGBURGER', jpn: 'ジンバーガー' },
  lilpa: { kor: '릴파', eng: 'LILPA', jpn: 'リルパ' },
  jururu: { kor: '주르르', eng: 'JURURU', jpn: 'ジュルル' },
  gosegu: { kor: '고세구', eng: 'Gosegu', jpn: 'ゴセグ' },
  viichan: { kor: '비챤', eng: 'VIICHAN', jpn: 'ゔぃちゃん' },
  all: { kor: '이세계 아이돌', eng: 'Isegye Idol', jpn: 'イセドル' },
  null: { kor: '', eng: '', jpn: '' },
};

const image = {
  ine,
  jingburger,
  lilpa,
  jururu,
  gosegu,
  viichan,
  all,
};

function MusicPlayer({ playlist, isActive, setActive, isDark, lang, playlistControl, nowIdx, setNowIdx, setLoad, load, setPlaylist }) {
  const color = isDark ? darkColor : lightColor;

  const swipeHandler = useSwipeable({
    onSwipedDown: () => {
      setActive(false);
    },
    onSwipedUp: () => {
      setActive(true);
    },
  });

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
  const audioRef = useRef(null);

  const pauseAudio = () => {
    setPause(true);
    audioRef.current.pause();
  };

  const reloadAudio = () => {
    audioRef.current.src = `${axiosInstance.defaults.baseURL}/music/streaming/${music.fileName}.mp3`;
    audioRef.current.autoplay = true;
    audioRef.current.load();
  };

  const playAudio = () => {
    setPause(false);
    audioRef.current.play();
    audioRef.current.volume = 0.6;
  };

  const repeat = () => {
    audioRef.current.currnetTime = 0;
    setLoad(!load);
  };

  const playNext = () => {
    setNowIdx((nowIdx + 1) % playlist.length);
    setLoad(!load);
  };

  const playPrev = () => {
    if (audioRef.current.currentTime <= 2) {
      setNowIdx((playlist.length + nowIdx - 1) % playlist.length);
      setLoad(!load);
    } else audioRef.current.currentTime = 0.0;
  };

  const audioControl = { pauseAudio, reloadAudio, playAudio, playNext, playPrev, repeat };

  useEffect(() => {
    if (!music.oSingerKor) return;
    reloadAudio();
    playAudio();
  }, [music]);

  useEffect(async () => {
    if (nowIdx === -1) return;
    // playlist reload
    if (nowIdx === -2) {
      setNowIdx(0);
      return;
    }
    const res = await axiosInstance.get(`/music/${playlist[nowIdx].id}`);
    setMusic(res.data.data);
  }, [load]);

  useEffect(() => {
    if (isPause) pauseAudio();
    else playAudio();
  }, [isPause]);

  return (
    <div
      {...swipeHandler}
      style={{
        position: 'absolute',
        zIndex: 999,
        width: '100%',
        transition: 'height ease 0.3s 0s, transform ease 0.3s 0s',
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        bottom: 0,
        ...(isActive ? { height: '100%' } : { height: '66px', transform: 'translateY(-70px)' }),
      }}
    >
      <audio ref={audioRef} />
      <div style={{ width: '100%', height: '100%', opacity: isActive ? 0 : 1, transition: 'opacity 0.7s 0s' }}>
        {!isActive && (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 5px 8px 16px',
            }}
          >
            <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center' }} onClick={(e) => setActive(true)}>
              <img
                style={{ height: '47px', aspectRatio: '1/1', borderRadius: '4px', ...(!music.oSingerKor && { display: 'none' }) }}
                src={image[music?.singer]}
              />
              <div style={{ lineHeight: '1.0', marginLeft: '14px' }}>
                <div style={{ fontSize: '15.4px', fontWeight: '400', marginTop: '5px' }}>
                  {{ kor: music.titleKor, eng: music.titleEng, jpn: music.titleJpn }[lang]}
                </div>
                <div style={{ fontSize: '13px', fontWeight: '300', marginTop: '4px', ...(!music.oSingerKor && { display: 'none' }) }}>
                  {`${member[music?.singer][lang]} / ${{ kor: music?.oSingerKor, eng: music?.oSingerEng, jpn: music?.oSingerJpn }[lang]}`}
                </div>
              </div>
            </div>
            <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
              <Button
                style={{ height: '90%' }}
                size='xs'
                auto
                light
                icon={!audioRef.current?.paused ? <IoPause size={30} color={color.textBlack} /> : <IoPlay size={30} color={color.textBlack} />}
                onClick={() => {
                  if (!isPause) {
                    pauseAudio();
                    audioRef.current.pause();
                  } else {
                    playAudio();
                    audioRef.current.play();
                  }
                }}
              />
              <Button
                style={{ height: '90%' }}
                size='xs'
                auto
                light
                icon={<IoPlayForward size={20} color={color.textBlack} />}
                onClick={() => playNext()}
              />
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          zIndex: isActive ? 0 : -1,
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.3s 0s',
        }}
      >
        <div style={{ position: 'absolute', top: 13, right: 13 }}>
          <Button
            onClick={() => setActive(false)}
            style={{ height: '40px' }}
            size='xs'
            auto
            light
            icon={<IoChevronDown size={30} color={color.darkGray} />}
          />
        </div>

        {music.oSingerKor && (
          <MusicPlay
            playlistControl={playlistControl}
            music={music}
            playlist={playlist}
            isActive={isActive}
            setActive={setActive}
            lang={lang}
            isDark={isDark}
            setNowIdx={setNowIdx}
            nowIdx={nowIdx}
            audioRef={audioRef}
            isPause={isPause}
            setPause={setPause}
            audioControl={audioControl}
            load={load}
            setLoad={setLoad}
            setPlaylist={setPlaylist}
          />
        )}
      </div>
    </div>
  );
}

export default MusicPlayer;
