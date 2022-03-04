import { IoPlay, IoPlayForward, IoChevronDown, IoPause } from 'react-icons/io5';
import { useSwipeable } from 'react-swipeable';

import MusicPlay from './MusicPlay';
import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';
import { Button } from '@nextui-org/react';
import { memo } from 'react';

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
function iOSnPWA() {
  return (
    window.matchMedia('(display-mode: standalone)').matches &&
    (['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
      (navigator.userAgent.includes('Mac') && 'ontouchend' in document))
  );
}
function MusicPlayer({
  playlist,
  isActive,
  setActive,
  isDark,
  lang,
  playlistControl,
  nowIdx,
  setNowIdx,
  setLoad,
  load,
  setPlaylist,
  customPlaylist,
  setCustomPlaylist,
  imgDisable,
  anim,
  music,
  audio,
  audioControl,
  isPause,
  height,
}) {
  const color = isDark ? darkColor : lightColor;

  const swipeHandler = useSwipeable({
    onSwipeStart: (e) => {
      if (e.dir === 'Up') setActive(true);
    },
  });

  return (
    <div
      {...swipeHandler}
      style={{
        position: 'absolute',
        zIndex: 999,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        transition: ' transform ease 0.2s 0s',
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.76)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        bottom: 0,
        ...(!isActive && { transform: iOSnPWA() ? `translateY(calc(${height}px - 150px))` : `translateY(calc(${height}px - 140px))` }),
      }}
    >
      <div style={{ width: '100%', height: '100%', opacity: isActive ? 0 : 1, transition: 'opacity 0.6s 0s' }}>
        {!isActive && (
          <div
            style={{
              width: '100%',
              height: '66px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 5px 8px 16px',
            }}
          >
            <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center' }} onClick={(e) => setActive(true)}>
              <img
                style={{ height: '47px', aspectRatio: '1/1', borderRadius: '4px', ...(!music.oSingerKor && { display: 'none' }) }}
                src={imgDisable ? logoimage[music?.singer] : image[music?.singer]}
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
                icon={!isPause ? <IoPause size={30} color={color.textBlack} /> : <IoPlay size={30} color={color.textBlack} />}
                onClick={() => {
                  if (!isPause) {
                    audioControl.pause();
                    audio.current.pause();
                  } else {
                    audioControl.play();
                    audio.current.play();
                  }
                }}
              />
              <Button
                style={{ height: '90%' }}
                size='xs'
                auto
                light
                icon={<IoPlayForward size={20} color={color.textBlack} />}
                onClick={() => {
                  audioControl.playNext();
                  audio.current.play();
                }}
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
            isPause={isPause}
            audioControl={audioControl}
            load={load}
            setLoad={setLoad}
            setPlaylist={setPlaylist}
            customPlaylist={customPlaylist}
            setCustomPlaylist={setCustomPlaylist}
            imgDisable={imgDisable}
            anim={anim}
            audio={audio}
          />
        )}
      </div>
    </div>
  );
}

export default memo(MusicPlayer);
