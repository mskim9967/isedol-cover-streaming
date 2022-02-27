import { useState, useRef, useEffect, memo } from 'react';
import { IoPause, IoPlay, IoPlayForward, IoPlayBack, IoHeartOutline, IoHeart, IoLogoYoutube, IoShuffle } from 'react-icons/io5';
import { MdOutlinePlaylistAdd, MdQueueMusic, MdRepeatOne, MdRepeat, MdShuffle } from 'react-icons/md';
import { Button, Modal } from '@nextui-org/react';
import MusicPlaylist from './MusicPlaylist';

import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';
import CustomPlaylist from './CustomPlaylist';

import gosegu from '../static/image/gosegu_300_300.png';
import viichan from '../static/image/viichan_300_300.png';
import jururu from '../static/image/jururu_300_300.png';
import lilpa from '../static/image/lilpa_300_300.png';
import jingburger from '../static/image/jingburger_300_300.png';
import ine from '../static/image/ine_300_300.png';
import all from '../static/image/all_300_300.webp';

import lgosegu from '../static/image/logo_gosegu_300_300.png';
import lviichan from '../static/image/logo_viichan_300_300.png';
import ljururu from '../static/image/logo_jururu_300_300.png';
import llilpa from '../static/image/logo_lilpa_300_300.png';
import ljingburger from '../static/image/logo_jingburger_300_300.png';
import line from '../static/image/logo_ine_300_300.png';
import lall from '../static/image/logo_all_300_300.png';

const member = {
  ine: { kor: '아이네', eng: 'INE', jpn: 'アイネ' },
  jingburger: { kor: '징버거', eng: 'JINGBURGER', jpn: 'ジンバーガー' },
  lilpa: { kor: '릴파', eng: 'LILPA', jpn: 'リルパ' },
  jururu: { kor: '주르르', eng: 'JURURU', jpn: 'ジュルル' },
  gosegu: { kor: '고세구', eng: 'GOSEGU', jpn: 'ゴセグ' },
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

const logoimage = {
  all: lall,
  gosegu: lgosegu,
  viichan: lviichan,
  jururu: ljururu,
  lilpa: llilpa,
  jingburger: ljingburger,
  ine: line,
};

function MusicPlay({
  music,
  playlist,
  isActive,
  setActive,
  isDark,
  lang,
  playlistControl,
  setNowIdx,
  nowIdx,
  audioRef,
  isPause,
  setPause,
  audioControl,
  load,
  setLoad,
  setPlaylist,
  imgDisable,
  customPlaylist,
  setCustomPlaylist,
  anim,
}) {
  const color = isDark ? darkColor : lightColor;
  const [currentTime, setCurrentTime] = useState(60);
  const [percentage, setPercentage] = useState(0.0);
  const [sx, setSx] = useState(0);
  const [isLiked, setLiked] = useState(false);
  const [isPlaylistActive, setPlaylistActive] = useState(false);
  const [animStart, setAnimStart] = useState(false);
  const [likes, setLikes] = useState([...JSON.parse(localStorage.getItem('likes') || '[]')]);
  const [isRepeat, setRepeat] = useState(false);
  const [isModalActive, setModalActive] = useState(false);

  const repeatRef = useRef(false);
  const [shuffle, setShuffle] = useState(false);

  const progressbarRef = useRef(null);

  useEffect(() => {
    setSx((window.innerWidth - progressbarRef.current.clientWidth) / 2);
  }, []);

  useEffect(() => {
    if (isActive) setPlaylistActive(false);
  }, [isActive]);

  useEffect(() => {
    setAnimStart(isPlaylistActive);
  }, [isPlaylistActive]);

  useEffect(() => {
    let timerId;
    if (!isPause) {
      timerId = setInterval(() => {
        setCurrentTime(audioRef.current.currentTime);
        if (audioRef.current.currentTime >= audioRef.current.duration) {
          if (repeatRef.current) {
            audioControl.repeat();
          } else {
            audioControl.playNext();
          }
        }
      }, 250);
    } else {
      setCurrentTime(audioRef.current.currentTime);
      clearInterval(timerId);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [isPause, music]);

  useEffect(() => {
    setPercentage(0);
    if (likes.find((e) => e.id === music?.id)) setLiked(true);
    else setLiked(false);
    setLikes([...JSON.parse(localStorage.getItem('likes') || '[]')]);
  }, [music]);

  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify([...likes]));
  }, [likes]);

  useEffect(() => {
    if (isLiked) {
      if (likes.find((e) => e.id === music?.id) === undefined) setLikes([...likes, music]);
    } else {
      setLikes([...likes.filter((e) => e.id !== music?.id)]);
    }
  }, [isLiked]);

  useEffect(() => {
    audioRef.current.currentTime = percentage * audioRef.current.duration || 0;
    setCurrentTime(audioRef.current.currentTime);
  }, [percentage]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={() => {
        if (isPlaylistActive) setPlaylistActive(false);
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          maxHeight: '800px',
          maxWidth: '600px',
          padding: '45px 0 20px 0',
          display: 'grid',
          gridTemplateRows: '7fr 1.5fr 1fr',
        }}
      >
        {!isPlaylistActive && (
          <div style={{ display: 'grid', gridTemplateRows: '5fr 1.2fr 0.8fr', opacity: !animStart ? 1 : 0, transition: 'opacity ease 0.3s 0s' }}>
            <div
              onClick={() => {
                if (!isPlaylistActive) setPlaylistActive(true);
              }}
              style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <div
                style={{
                  width: '74%',
                  maxWidth: '300px',
                  aspectRatio: '1/1',
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <img
                  style={{
                    width: '100%',
                    aspectRatio: '1/1',
                    borderRadius: '6%',
                    boxShadow: `0px 2px 13px -5px ${color.shadow}`,
                    position: 'absolute',
                  }}
                  src={imgDisable ? logoimage[music.singer] : image[music.singer]}
                />
                {music.youtubeUrl && (
                  <div
                    style={{
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bottom: 5,
                      width: '50px',
                      height: '36px',
                      backgroundColor: color.bgLight,
                      boxShadow: `0px 2px 10px -6px ${color.shadow}`,
                      borderRadius: '18px',
                      bottom: -21,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      audioControl.pauseAudio();
                      window.open(music.youtubeUrl, '_blank');
                    }}
                  >
                    <IoLogoYoutube color='#ff0000' size={20} />
                  </div>
                )}
              </div>
            </div>
            <div
              onClick={() => {
                if (!isPlaylistActive) setPlaylistActive(true);
              }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 3 }}
            >
              <div
                style={{
                  fontSize: '21px',
                  fontWeight: '400',
                  color: color.textDarkBlack,
                  padding: '0px 40px',
                  textAlign: 'center',
                  lineHeight: '1.1',
                  wordBreak: 'keep-all',
                }}
              >
                {{ kor: music.titleKor, eng: music.titleEng, jpn: music.titleJpn }[lang]}
              </div>
              <div style={{ fontSize: '14px', fontWeight: '300', marginTop: '0px' }}>
                {`${member[music.singer][lang]} / ${{ kor: music.oSingerKor, eng: music.oSingerEng, jpn: music.oSingerJpn }[lang]}`}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <div style={{ position: 'relative', width: '80%' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: `calc(${(currentTime / audioRef.current.duration) * 100}% - 5px)`,
                    top: '7px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: eval(`color.${music.singer}`),
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '18px',
                    letterSpacing: '-0.3px',
                    fontSize: '13.5px',
                    fontWeight: '500',
                    color: eval(`color.${music.singer}`),
                  }}
                >
                  {`${String(Math.floor(currentTime / 60)).padStart(2, '0')}:${String(Math.floor(currentTime % 60)).padStart(2, '0')}`}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '18px',
                    letterSpacing: '-0.3px',
                    fontSize: '13.5px',
                    fontWeight: '500',
                    color: eval(`color.${music.singer}`),
                  }}
                >
                  {`${String(Math.floor((audioRef.current.duration || 0) / 60)).padStart(2, '0')}:${String(
                    Math.floor((audioRef.current.duration || 0) % 60)
                  ).padStart(2, '0')}`}
                </div>
                <div
                  ref={progressbarRef}
                  style={{ width: '100%', height: '23px', display: 'flex', alignItems: 'center' }}
                  onTouchStart={(e) => {
                    let calc = (e.touches[0].clientX - sx) / progressbarRef.current.clientWidth;
                    if (calc >= 0 && calc <= 1) setPercentage(calc);
                  }}
                  onTouchMove={(e) => {
                    let calc = (e.touches[0].clientX - sx) / progressbarRef.current.clientWidth;
                    if (calc >= 0 && calc <= 1) setPercentage(calc);
                  }}
                >
                  <div
                    style={{
                      width: `${(currentTime / audioRef.current.duration) * 100}%`,
                      height: '3px',
                      backgroundColor: eval(`color.${music.singer}`),
                      borderRadius: '3px',
                      zIndex: -1,
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      height: '3px',
                      backgroundColor: eval(`color.${music.singer}`),
                      zIndex: -1,
                      borderRadius: '3px',
                      opacity: '50%',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          style={{ overflow: 'auto', opacity: animStart ? 1 : 0, transition: 'opacity ease 0.3s 0s', ...(!isPlaylistActive && { display: 'none' }) }}
          onClick={(e) => {
            e.stopPropagation();
            setPlaylistActive(false);
          }}
        >
          <MusicPlaylist
            isPlaylistActive={isPlaylistActive}
            playlistControl={playlistControl}
            playlist={playlist}
            isActive={isActive}
            setActive={setActive}
            isDark={isDark}
            lang={lang}
            setNowIdx={setNowIdx}
            nowIdx={nowIdx}
            load={load}
            setLoad={setLoad}
            setPlaylist={setPlaylist}
            shuffle={shuffle}
            imgDisable={imgDisable}
            setPlaylistActive={setPlaylistActive}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80%',
              height: '100%',
              maxWidth: '400px',
              justifyContent: 'space-evenly',
            }}
          >
            <Button
              style={{ height: '70%' }}
              size='xs'
              auto
              light
              icon={
                <IoPlayBack
                  size={40}
                  color={eval(`color.${music.singer}`)}
                  onClick={(e) => {
                    e.stopPropagation();
                    audioControl.playPrev();
                  }}
                />
              }
            />
            <Button
              onClick={(e) => {
                e.stopPropagation();
                if (isPause) {
                  audioRef.current?.play();
                  setPause(false);
                } else {
                  audioRef.current?.pause();
                  setPause(!isPause);
                }
              }}
              style={{ height: '70%' }}
              size='xs'
              auto
              light
              icon={
                audioRef.current?.paused ? (
                  <IoPlay size={60} color={eval(`color.${music.singer}`)} />
                ) : (
                  <IoPause size={60} color={eval(`color.${music.singer}`)} />
                )
              }
            />
            <Button
              style={{ height: '70%' }}
              size='xs'
              auto
              light
              icon={
                <IoPlayForward
                  size={40}
                  color={eval(`color.${music.singer}`)}
                  onClick={(e) => {
                    e.stopPropagation();
                    audioControl.playNext();
                  }}
                />
              }
            />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '93%',
              maxWidth: '400px',
              justifyContent: 'space-evenly',
              opacity: '80%',
              height: '100%',
            }}
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                repeatRef.current = !isRepeat;
                setRepeat(!isRepeat);
              }}
              style={{ height: '70%' }}
              size='xs'
              auto
              light
              icon={
                isRepeat ? (
                  <MdRepeatOne size={23} color={eval(`color.${music.singer}`)} />
                ) : (
                  <MdRepeat size={23} color={eval(`color.${music.singer}`)} />
                )
              }
            />

            <Button
              style={{ height: '70%' }}
              size='xs'
              auto
              light
              icon={
                <MdOutlinePlaylistAdd
                  size={26}
                  color={eval(`color.${music.singer}`)}
                  onClick={(e) => {
                    e.stopPropagation();

                    setModalActive(true);
                  }}
                />
              }
            />
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setLiked(!isLiked);
              }}
              style={{ height: '70%' }}
              size='xs'
              auto
              light
              icon={
                isLiked ? (
                  <IoHeart color={eval(`color.${music.singer}`)} size={32} />
                ) : (
                  <IoHeartOutline size={32} color={eval(`color.${music.singer}`)} />
                )
              }
            />
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setPlaylistActive(!isPlaylistActive);
              }}
              style={{ height: '70%' }}
              size='xs'
              auto
              light
              icon={<MdQueueMusic size={26} color={eval(`color.${music.singer}`)} />}
            />
            <Button
              onClick={(e) => {
                e.stopPropagation();
                let id = music.id;
                let temp = playlist.sort(() => Math.random() - 0.5);
                let ii = temp.findIndex((e) => e.id === id);
                [temp[0], temp[ii]] = [temp[ii], temp[0]];
                setNowIdx(0);
                setPlaylist([...temp]);
                setShuffle(!shuffle);
              }}
              style={{ height: '70%' }}
              size='xs'
              auto
              light
              icon={<MdShuffle size={23} color={eval(`color.${music.singer}`)} />}
            />
          </div>
        </div>
      </div>
      <Modal
        css={{
          backgroundColor: isDark ? '#1c1c1c' : '#ffffff',
          width: '85%',
          maxWidth: '500px',
          margin: '0 auto',
        }}
        closeButton
        animated={anim}
        open={isModalActive}
        onClose={() => setModalActive(false)}
      >
        <CustomPlaylist
          setModalActive={setModalActive}
          music={music}
          customPlaylist={customPlaylist}
          setCustomPlaylist={setCustomPlaylist}
          lang={lang}
          isDark={isDark}
        />
      </Modal>
    </div>
  );
}

export default memo(MusicPlay);
