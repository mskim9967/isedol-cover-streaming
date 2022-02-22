import PlaylistCard from '../component/PlaylistCard';
import HeaderText from '../component/HeaderText';

import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';

function PlaylistScreen({ lang, isDark }) {
  const color = isDark ? darkColor : lightColor;
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', flexShrink: 0, gap: '20px' }}>
      <HeaderText isDark={isDark}>{{ kor: '재생 목록', eng: 'Playlist', jpn: '再生リスト' }[lang]}</HeaderText>

      <div>
        <div style={{ fontSize: '19px', fontWeight: '600', letterSpacing: '-0.6px' }}>
          {{ kor: '아이돌별 추천', eng: 'Suggestion by idol', jpn: 'アイドル別おすすめ' }[lang]}
        </div>
        <div style={{ margin: '0 0 0 -20px', padding: '0px 20px', left: 0, width: '100vw', display: 'flex', gap: '10px', overflow: 'auto' }}>
          <PlaylistCard lang={lang} theme={'all'} />
          <PlaylistCard lang={lang} theme={'gosegu'} />
          <PlaylistCard lang={lang} theme={'ine'} />
          <PlaylistCard lang={lang} theme={'viichan'} />
          <PlaylistCard lang={lang} theme={'jingburger'} />
          <PlaylistCard lang={lang} theme={'jururu'} />
          <PlaylistCard lang={lang} theme={'lilpa'} />
        </div>
      </div>

      <div>
        <div style={{ fontSize: '19px', fontWeight: '600', letterSpacing: '-0.6px' }}>
          {{ kor: '장르별 추천', eng: 'Suggestion by genre', jpn: 'ジャンル別 おすすめ' }[lang]}
        </div>
        <div style={{ margin: '0px -20px', padding: '0px 20px', left: 0, width: '100vw', display: 'flex', gap: '10px', overflow: 'auto' }}>
          <PlaylistCard lang={lang} theme={'korea'} />
          <PlaylistCard lang={lang} theme={'japan'} />
          <PlaylistCard lang={lang} theme={'world'} />
        </div>
      </div>
      <div>
        <div style={{ fontSize: '19px', fontWeight: '600', letterSpacing: '-0.6px' }}>
          {{ kor: '나의 플레이리스트', eng: 'My playlist', jpn: '僕のプレイリスト' }[lang]}
        </div>
        <div style={{ margin: '0px -20px', padding: '0px 20px', left: 0, width: '100vw', display: 'flex', gap: '10px', overflow: 'auto' }}></div>
      </div>
    </div>
  );
}

export default PlaylistScreen;
