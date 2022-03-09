import { useEffect, useState, memo } from 'react';
import gosegu from '../static/image/gosegu_300_300.png';
import viichan from '../static/image/viichan_300_300.png';
import jururu from '../static/image/jururu_300_300.png';
import lilpa from '../static/image/lilpa_300_300.png';
import jingburger from '../static/image/jingburger_300_300.png';
import ine from '../static/image/ine_300_300.png';
import like from '../static/image/like_300_300.webp';

import lgosegu from '../static/image/logo_gosegu_300_300.png';
import lviichan from '../static/image/logo_viichan_300_300.png';
import ljururu from '../static/image/logo_jururu_300_300.png';
import llilpa from '../static/image/logo_lilpa_300_300.png';
import ljingburger from '../static/image/logo_jingburger_300_300.png';
import line from '../static/image/logo_ine_300_300.png';
import lall from '../static/image/logo_all_300_300.png';
import llike from '../static/image/logo_like_300_300.png';

import jpn from '../static/image/japan_300_300.webp';
import kor from '../static/image/korea_300_300.webp';
import eng from '../static/image/world_300_300.png';
import recent from '../static/image/recent_300_300.png';
import all from '../static/image/all_300_300.webp';
import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';
import { axiosInstance } from '../axiosInstance';

const imgMap = {
  all,
  gosegu,
  viichan,
  jururu,
  lilpa,
  jingburger,
  ine,
  jpn,
  eng,
  kor,
  like,
  recent,
};

const logoimgMap = {
  all: lall,
  gosegu: lgosegu,
  viichan: lviichan,
  jururu: ljururu,
  lilpa: llilpa,
  jingburger: ljingburger,
  ine: line,
  jpn,
  eng,
  kor,
  like: llike,
  recent,
};

const colorMap = {
  all: lightColor.isedol,
  gosegu: lightColor.gosegu,
  viichan: lightColor.viichan,
  jururu: lightColor.jururu,
  lilpa: lightColor.lilpa,
  jingburger: lightColor.jingburger,
  ine: lightColor.ine,
  jpn: '#ff0000',
  kor: '#307cff',
  eng: '#007029',
  like: lightColor.isedol,
  recent: '#98a5b3',
};

function getColor() {
  return 'hsl(' + 360 * Math.random() + ',' + (25 + 70 * Math.random()) + '%,' + (40 + 10 * Math.random()) + '%)';
}

function PlaylistCard({ theme, lang, isDark, playlistControl, type, customPlaylist, imgDisable, audio, audioControl }) {
  const color = isDark ? darkColor : lightColor;
  const [isCustom, setCustom] = useState(false);
  const [randColor, setColor] = useState(getColor());

  useEffect(() => {
    if (type === 'custom' && theme !== 'like') setCustom(true);
  }, [customPlaylist]);

  const nameMap = {
    all: { kor: '이세돌', eng: `Isegye Idol`, jpn: 'イセドル' }[lang],
    gosegu: { kor: '고세구의', eng: `Gosegu's`, jpn: 'ゴセグの' }[lang],
    viichan: { kor: '비챤의', eng: `Viichan's`, jpn: 'ゔぃちゃん' }[lang],
    jururu: { kor: '주르르의', eng: `Jururu's`, jpn: 'ジュルル' }[lang],
    lilpa: { kor: '릴파의', eng: `Lilpa's`, jpn: 'リルパ' }[lang],
    jingburger: { kor: '징버거의', eng: `Jingburger's`, jpn: ' ジンバーガー' }[lang],
    ine: { kor: '아이네의', eng: `Ine's`, jpn: 'アイネ' }[lang],
    jpn: { kor: '일식', eng: `J-POP`, jpn: 'J-POP' }[lang],
    kor: { kor: '한식', eng: `K-POP`, jpn: 'K-POP' }[lang],
    eng: { kor: '양식', eng: `Western POP`, jpn: 'Western POP' }[lang],
    like: { kor: '좋아요', eng: `Like`, jpn: '好きな' }[lang],
    recent: { kor: '최근 업로드', eng: `Recent uploaded`, jpn: '最新アップロード' }[lang],
  };

  return (
    <div
      className='playlistCard'
      style={{
        width: '200px',
        height: '265px',
        margin: '10px 0',
        flexShrink: 0,
        borderRadius: '7px',
        boxShadow: `2px 2px 10px -5px ${color.shadow}`,
        overflow: 'hidden',
        backgroundColor: isCustom ? randColor : colorMap[theme],
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={async () => {
        audio.current.play();
        audioControl.pause();
        if (type === 'custom' && theme === 'like') {
          let likes = [...JSON.parse(localStorage.getItem('likes') || '[]')];
          if (likes.length) playlistControl.change(likes.sort(() => Math.random() - 0.5));
          else alert({ kor: '좋아요 한 곡이 없습니다', jpn: 'あいています', eng: 'It is empty' }[lang]);
        } else if (type === 'custom') {
          let playlist = customPlaylist.find((e) => e.name === theme);
          playlistControl.change(playlist.data);
        } else {
          if (theme === 'all') {
            const res = await axiosInstance.get('/music');
            let data = res.data.data.sort(() => Math.random() - 0.5);
            let newData = [];
            let cnt = { ine: 0, gosegu: 0, lilpa: 0, jingburger: 0, viichan: 0, jururu: 0 };
            for (let mus of data) {
              if (mus.singer === 'all' || cnt[mus.singer] < 15) {
                newData.push(mus);
                if (mus.singer !== 'all') cnt[mus.singer]++;
              }
              if (newData.length >= 80) break;
            }
            playlistControl.change(newData.sort(() => Math.random() - 0.5));
          } else if (theme === 'recent') {
            const res = await axiosInstance.get('/music');
            playlistControl.change(res.data.data.slice(0, 80));
          } else {
            const res = await axiosInstance.put('/music/search', {
              ...(type === 'idol' && { singers: [theme] }),
              ...(type === 'nation' && { nations: [theme] }),
            });
            playlistControl.change(res.data.data.sort(() => Math.random() - 0.5).slice(0, 80));
          }
        }
      }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '1/1',
          ...(isCustom && { display: 'none' }),
          backgroundImage: `url(${imgDisable ? logoimgMap[theme] : imgMap[theme]})`,
          backgroundSize: 'cover',
        }}
      ></div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          color: color.textWhite,
          fontWeight: '500',
          fontSize: '14px',
        }}
      >
        {isCustom ? `${theme}` : `${nameMap[theme]} ${{ kor: ' 플레이리스트', eng: 'playlist', jpn: 'プレイリスト' }[lang]}`}
      </div>
    </div>
  );
}

export default memo(PlaylistCard);
