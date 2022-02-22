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

const member = {
  ine: { kor: '아이네', eng: 'INE', jpn: 'アイネ' },
  jingburger: { kor: '징버거', eng: 'JINGBURGER', jpn: 'ジンバーガー' },
  lilpa: { kor: '릴파', eng: 'LILPA', jpn: 'リルパ' },
  jururu: { kor: '주르르', eng: 'JURURU', jpn: 'ジュルル' },
  gosegu: { kor: '고세구', eng: 'Gosegu', jpn: 'ゴセグ' },
  viichan: { kor: '비챤', eng: 'VIICHAN', jpn: 'ゔぃちゃん' },
  null: { kor: '', eng: '', jpn: '' },
};

const image = {
  ine,
  jingburger,
  lilpa,
  jururu,
  gosegu,
  viichan,
};

function MusicPlayer({ playlist, isActive, setActive, isDark, lang, playlistControl, nowIdx, setNowIdx }) {
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
    audioRef.current.load();
  };

  const playAudio = () => {
    setPause(false);
    audioRef.current.play();
    audioRef.current.volume = 0.6;
  };

  const playNext = () => {
    setNowIdx((nowIdx + 1) % playlist.length);
  };

  const playPrev = () => {
    if (audioRef.current.currentTime <= 2) setNowIdx((playlist.length + nowIdx - 1) % playlist.length);
    else audioRef.current.currentTime = 0.0;
  };

  const audioControl = { pauseAudio, reloadAudio, playAudio, playNext, playPrev };

  useEffect(() => {
    if (!music.oSingerKor) return;
    reloadAudio();
    playAudio();
  }, [music]);

  useEffect(() => {
    if (nowIdx === -1) return;
    setMusic(playlist[nowIdx]);
  }, [nowIdx]);

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
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
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
                src={image[music.singer]}
              />
              <div style={{ marginLeft: '14px' }}>
                <div style={{ fontSize: '16px', fontWeight: '400', marginTop: '5px' }}>
                  {{ kor: music.titleKor, eng: music.titleEng, jpn: music.titleJpn }[lang]}
                </div>
                <div style={{ fontSize: '13px', fontWeight: '300', marginTop: '-2px', ...(!music.oSingerKor && { display: 'none' }) }}>
                  {`${member[music.singer][lang]} / ${{ kor: music.oSingerKor, eng: music.oSingerEng, jpn: music.oSingerJpn }[lang]}`}
                </div>
              </div>
            </div>
            <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
              <Button
                style={{ height: '90%' }}
                size='xs'
                auto
                light
                icon={!isPause ? <IoPause size={30} color={color.textBlack} /> : <IoPlay size={30} color={color.textBlack} />}
                onClick={() => (!isPause ? pauseAudio() : playAudio())}
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
          />
        )}
      </div>
    </div>
  );
}

export default MusicPlayer;
