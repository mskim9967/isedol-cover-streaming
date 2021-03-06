import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';
import MusicCardInPlaylist from './MusicCardInPlaylist';
import { useEffect, useRef, memo } from 'react';

function MusicPlaylist({
  isPlaylistActive,
  playlist,
  lang,
  isActive,
  setActive,
  isDark,
  playlistControl,
  setNowIdx,
  nowIdx,
  load,
  setLoad,
  setPlaylist,
  shuffle,
  imgDisable,
  setPlaylistActive,
}) {
  const color = isDark ? darkColor : lightColor;
  const focusRef = useRef(null);

  useEffect(() => {
    focusRef.current.scrollIntoView({ block: 'center' });
  }, [isPlaylistActive, shuffle]);

  return (
    <div style={{ padding: '0 25px', overflow: 'auto', borderRadius: '20px' }}>
      {playlist.map((music, idx) => {
        return (
          <div ref={idx === nowIdx ? focusRef : null} style={{ ...(nowIdx === idx && { opacity: '40%' }) }} key={idx}>
            <MusicCardInPlaylist
              music={music}
              lang={lang}
              isDark={isDark}
              load={load}
              setLoad={setLoad}
              setPlaylist={setPlaylist}
              setNowIdx={setNowIdx}
              nowIdx={nowIdx}
              idx={idx}
              playlist={playlist}
              imgDisable={imgDisable}
            ></MusicCardInPlaylist>
          </div>
        );
      })}
      <div style={{ height: '150px' }}></div>
    </div>
  );
}

export default memo(MusicPlaylist);
