import { useState, useRef, useEffect } from 'react';
import { IoPause, IoPlay, IoPlayForward, IoPlayBack, IoHeartOutline, IoHeart, IoChevronDown } from 'react-icons/io5';
import { MdOutlinePlaylistAdd, MdQueueMusic } from 'react-icons/md';
import { useSwipeable } from 'react-swipeable';
import { Button } from '@nextui-org/react';
import MusicPlaylist from './MusicPlaylist';

import chan from '../static/image/segu_300_300.webp';
import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';

const totalTime = 206;

function MusicPlay({ isActive, setActive, isDark }) {
  const color = isDark ? darkColor : lightColor;
  const [currentTime, setCurrentTime] = useState(60);
  const [sx, setSx] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const [isLiked, setLiked] = useState(false);
  const [isPlaylistActive, setPlaylistActive] = useState(false);
  const [animStart, setAnimStart] = useState(false);

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

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '60px 0 25px 0',
        display: 'grid',
        gridTemplateRows: '7.5fr 1.5fr 1fr',
      }}
    >
      {!isPlaylistActive && (
        <div style={{ display: 'grid', gridTemplateRows: '5fr 1.2fr 0.8fr', opacity: !animStart ? 1 : 0, transition: 'opacity ease 0.3s 0s' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              style={{ width: '74%', maxWidth: '300px', aspectRatio: '1/1', borderRadius: '6%', boxShadow: `0px 2px 13px -5px ${color.shadow}` }}
              src={chan}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 3 }}>
            <div style={{ fontSize: '21px', fontWeight: '400', color: color.textDarkBlack }}>정말로 사랑한다면</div>
            <div style={{ fontSize: '14px', fontWeight: '300' }}>고세구 / 버스커버스커</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div style={{ position: 'relative', width: '80%' }}>
              <div
                style={{
                  position: 'absolute',
                  zIndex: -1,
                  left: `calc(${(currentTime / totalTime) * 100}% - 5px)`,
                  top: '-3px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: color.segu,
                }}
              />
              <div style={{ position: 'absolute', top: '7px', letterSpacing: '-0.3px', fontSize: '13.5px', fontWeight: '500', color: color.segu }}>
                {`${String(Math.floor(currentTime / 60)).padStart(2, '0')}:${String(Math.floor(currentTime % 60)).padStart(2, '0')}`}
              </div>
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '7px',
                  letterSpacing: '-0.3px',
                  fontSize: '13.5px',
                  fontWeight: '500',
                  color: color.segu,
                }}
              >
                {`${String(Math.floor(totalTime / 60)).padStart(2, '0')}:${String(Math.floor(totalTime % 60)).padStart(2, '0')}`}
              </div>
              <div
                ref={progressbarRef}
                style={{ width: '100%', height: '3px', border: '20px', backgroundColor: color.segu, borderRadius: '3px' }}
                onTouchStart={(e) => {
                  const percentage = (e.touches[0].clientX - sx) / progressbarRef.current.clientWidth;
                  if (percentage >= 0 && percentage <= 1) setCurrentTime(percentage * totalTime);
                }}
                onTouchMove={(e) => {
                  const percentage = (e.touches[0].clientX - sx) / progressbarRef.current.clientWidth;
                  if (percentage >= 0 && percentage <= 1) setCurrentTime(percentage * totalTime);
                }}
              />
            </div>
          </div>
        </div>
      )}
      {isPlaylistActive && (
        <div style={{ overflow: 'auto', opacity: animStart ? 1 : 0, transition: 'opacity ease 0.3s 0s' }}>
          <MusicPlaylist isActive={isActive} setActive={setActive} isDark={isDark} />
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30 }}>
        <Button style={{ height: '70%' }} size='xs' auto light icon={<IoPlayBack size={40} color={color.segu} />} />
        <Button
          onClick={() => setPlaying(!isPlaying)}
          style={{ height: '70%' }}
          size='xs'
          auto
          light
          icon={isPlaying ? <IoPlay size={60} color={color.segu} /> : <IoPause size={60} color={color.segu} />}
        />
        <Button style={{ height: '70%' }} size='xs' auto light icon={<IoPlayForward size={40} color={color.segu} />} />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 60,
          opacity: '70%',
        }}
      >
        <Button style={{ height: '70%' }} size='xs' auto light icon={<MdOutlinePlaylistAdd size={26} color={color.segu} />} />
        <Button
          onClick={() => setLiked(!isLiked)}
          style={{ height: '70%' }}
          size='xs'
          auto
          light
          icon={isLiked ? <IoHeart color={color.segu} size={26} /> : <IoHeartOutline size={26} color={color.segu} />}
        />
        <Button
          onClick={() => setPlaylistActive(!isPlaylistActive)}
          style={{ height: '70%' }}
          size='xs'
          auto
          light
          icon={<MdQueueMusic size={26} color={color.segu} />}
        />
      </div>
    </div>
  );
}

export default MusicPlay;
