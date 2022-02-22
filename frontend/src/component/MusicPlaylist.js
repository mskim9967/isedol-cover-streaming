import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';
import MusicCard from './MusicCard';
import { useSwipeable } from 'react-swipeable';
import { useEffect } from 'react';

function MusicPlaylist({ playlist, lang, isActive, setActive, isDark, playlistControl, setNowIdx, nowIdx }) {
  const color = isDark ? darkColor : lightColor;

  const swipeHandler = useSwipeable({
    onSwiped: ({ event }) => {
      event.stopPropagation();
    },
  });

  return (
    <div {...swipeHandler} style={{ padding: '0 25px', overflow: 'auto', borderRadius: '20px' }}>
      {playlist.map((music, idx) => {
        return (
          <div style={{ ...(nowIdx === idx && { opacity: '40%' }) }} key={idx} onClick={() => setNowIdx(idx)}>
            <MusicCard music={music} lang={lang} isDark={isDark} inPlayer></MusicCard>
          </div>
        );
      })}
    </div>
  );
}

export default MusicPlaylist;
