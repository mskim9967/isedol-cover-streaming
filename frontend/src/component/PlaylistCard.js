import { useState } from 'react';
import { IoPause, IoPlay, IoPlayForward, IoPlayBack } from 'react-icons/io5';
import gosegu from '../static/image/segu_300_300.webp';
import viichan from '../static/image/chan_300_300.webp';
import jururu from '../static/image/ruru_300_300.webp';
import lilpa from '../static/image/lilpa_300_300.webp';
import jingburger from '../static/image/jing_300_300.webp';
import ine from '../static/image/ine_300_300.webp';
import japan from '../static/image/japan_300_300.webp';
import korea from '../static/image/korea_300_300.webp';
import world from '../static/image/world_300_300.webp';
import all from '../static/image/all_300_300.webp';
import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';

const imgMap = {
  all,
  gosegu,
  viichan,
  jururu,
  lilpa,
  jingburger,
  ine,
  japan,
  world,
  korea,
};

const colorMap = {
  all: lightColor.isedol,
  gosegu: lightColor.gosegu,
  viichan: lightColor.viichan,
  jururu: lightColor.jururu,
  lilpa: lightColor.lilpa,
  jingburger: lightColor.jingburger,
  ine: lightColor.ine,
  japan: '#ff0000',
  korea: '#307cff',
  world: '#007029',
};

function PlaylistCard({ theme, lang, isDark }) {
  const color = isDark ? darkColor : lightColor;

  const nameMap = {
    all: { kor: '이세돌', eng: `Isegye Idol`, jpn: 'イセドル' }[lang],
    gosegu: { kor: '고세구의', eng: `Gosegu's`, jpn: 'ゴセグの' }[lang],
    viichan: { kor: '비챤', eng: `Viichan's`, jpn: 'ゔぃちゃん' }[lang],
    jururu: { kor: '주르르의', eng: `Jururu's`, jpn: 'ジュルル' }[lang],
    lilpa: { kor: '릴파의', eng: `Lilpa's`, jpn: 'リルパ' }[lang],
    jingburger: { kor: '징버거의', eng: `Jingburger's`, jpn: ' ジンバーガー' }[lang],
    ine: { kor: '아이네의', eng: `Ine's`, jpn: 'アイネ' }[lang],
    japan: { kor: '일식', eng: `J-POP`, jpn: 'J-POP' }[lang],
    korea: { kor: '한식', eng: `K-POP`, jpn: 'K-POP' }[lang],
    world: { kor: '양식', eng: `POP`, jpn: 'POP' }[lang],
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
