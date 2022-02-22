import { useState } from 'react';
import gosegu from '../static/image/segu_300_300.webp';
import viichan from '../static/image/chan_300_300.webp';
import jururu from '../static/image/ruru_300_300.webp';
import lilpa from '../static/image/lilpa_300_300.webp';
import jingburger from '../static/image/jing_300_300.webp';
import ine from '../static/image/ine_300_300.webp';
import jpn from '../static/image/japan_300_300.webp';
import kor from '../static/image/korea_300_300.webp';
import eng from '../static/image/world_300_300.webp';
import all from '../static/image/all_300_300.webp';
import like from '../static/image/like_300_300.webp';
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
};

function PlaylistCard({ theme, lang, isDark, playlistControl, type }) {
  const color = isDark ? darkColor : lightColor;
  const [playlist, setPlaylist] = useState([]);

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
  };

  return (
    <div
      style={{
        width: '200px',
        margin: '10px 0',
        flexShrink: 0,
        borderRadius: '7px',
        boxShadow: `2px 2px 10px -5px ${color.shadow}`,
        overflow: 'hidden',
        backgroundColor: colorMap[theme],
      }}
      onClick={async () => {
        if (type === 'custom') {
          let likes = [...JSON.parse(localStorage.getItem('likes') || '[]')];
          if (likes.length) playlistControl.change(likes);
          else alert({ kor: '좋아요 한 곡이 없습니다', jpn: 'あいています', eng: 'It is empty' }[lang]);
        } else {
          const res = await axiosInstance.put('/music/search', {
            ...(type === 'idol' && theme !== 'all' && { singers: [theme] }),
            ...(type === 'nation' && { nations: [theme] }),
          });
          playlistControl.change(res.data.data.sort(() => Math.random() - 0.5));
        }
      }}
    >
      <img style={{ width: '100%', aspectRatio: '1/1' }} src={imgMap[theme]} />
      <div
        style={{
          width: '100%',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color.textWhite,
          fontWeight: '500',
          fontSize: '14px',
        }}
      >
        {`${nameMap[theme]} ${{ kor: ' 플레이리스트', eng: 'playlist', jpn: 'プレイリスト' }[lang]}`}
      </div>
    </div>
  );
}

export default PlaylistCard;
