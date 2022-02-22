import PlaylistCard from '../component/PlaylistCard';
import HeaderText from '../component/HeaderText';

import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';

const idols = ['all', 'gosegu', 'ine', 'viichan', 'jingburger', 'jururu', 'lilpa'].sort(() => Math.random() - 0.5);
const nations = ['kor', 'jpn', 'eng'].sort(() => Math.random() - 0.5);
function PlaylistScreen({ lang, isDark, playlistControl }) {
  const color = isDark ? darkColor : lightColor;
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', flexShrink: 0, gap: '20px' }}>
      <HeaderText isDark={isDark}>{{ kor: '재생 목록', eng: 'Playlist', jpn: '再生リスト' }[lang]}</HeaderText>

      <div>
        <div style={{ fontSize: '19px', fontWeight: '600', letterSpacing: '-0.6px' }}>
          {{ kor: '아이돌별 추천', eng: 'Suggestion by idol', jpn: 'アイドル別おすすめ' }[lang]}
        </div>
        <div style={{ margin: '0 0 0 -20px', padding: '0px 20px', left: 0, width: '100vw', display: 'flex', gap: '10px', overflow: 'auto' }}>
          {idols.map((e, idx) => {
            return <PlaylistCard key={idx} lang={lang} theme={e} type={'idol'} playlistControl={playlistControl} />;
          })}
        </div>
      </div>

      <div>
        <div style={{ fontSize: '19px', fontWeight: '600', letterSpacing: '-0.6px' }}>
          {{ kor: '장르별 추천', eng: 'Suggestion by genre', jpn: 'ジャンル別 おすすめ' }[lang]}
        </div>
        <div style={{ margin: '0px -20px', padding: '0px 20px', left: 0, width: '100vw', display: 'flex', gap: '10px', overflow: 'auto' }}>
          {nations.map((e, idx) => {
            return <PlaylistCard key={idx} lang={lang} theme={e} type={'nation'} playlistControl={playlistControl} />;
          })}
        </div>
      </div>
      <div>
        <div style={{ fontSize: '19px', fontWeight: '600', letterSpacing: '-0.6px' }}>
          {{ kor: '나의 플레이리스트', eng: 'My playlist', jpn: '僕のプレイリスト' }[lang]}
        </div>
        <div style={{ margin: '0px -20px', padding: '0px 20px', left: 0, width: '100vw', display: 'flex', gap: '10px', overflow: 'auto' }}>
          <PlaylistCard lang={lang} theme={'like'} type={'custom'} playlistControl={playlistControl} />
        </div>
      </div>
    </div>
  );
}

export default PlaylistScreen;
