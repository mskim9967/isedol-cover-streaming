import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';
import MusicCard from './MusicCard';
import { useSwipeable } from 'react-swipeable';

function MusicPlaylist({ lang, isActive, setActive, isDark }) {
  const color = isDark ? darkColor : lightColor;

  const swipeHandler = useSwipeable({
    onSwiped: ({ event }) => {
      event.stopPropagation();
    },
  });
  return (
    <div {...swipeHandler} style={{ padding: '0 25px', overflow: 'auto', borderRadius: '20px' }}>
      <MusicCard lang={lang} isDark={isDark}></MusicCard>
      <MusicCard lang={lang} isDark={isDark}></MusicCard>
      <MusicCard lang={lang} isDark={isDark}></MusicCard>
      <MusicCard lang={lang} isDark={isDark}></MusicCard>
      <MusicCard lang={lang} isDark={isDark}></MusicCard>
      <MusicCard lang={lang} isDark={isDark}></MusicCard>
      <MusicCard lang={lang} isDark={isDark}></MusicCard>
      <MusicCard lang={lang} isDark={isDark}></MusicCard>
      <MusicCard lang={lang} isDark={isDark}></MusicCard>
      <MusicCard lang={lang} isDark={isDark}></MusicCard>
    </div>
  );
}

export default MusicPlaylist;
