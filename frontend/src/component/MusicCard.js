import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';
import gosegu from '../static/image/segu_300_300.webp';
import viichan from '../static/image/chan_300_300.webp';
import jururu from '../static/image/ruru_300_300.webp';
import lilpa from '../static/image/lilpa_300_300.webp';
import jingburger from '../static/image/jing_300_300.webp';
import ine from '../static/image/ine_300_300.webp';
import { MdOutlinePlaylistAdd } from 'react-icons/md';
import { IoPlay } from 'react-icons/io5';

import { Button } from '@nextui-org/react';

const member = {
  ine: { kor: '아이네', eng: 'INE', jpn: 'アイネ' },
  jingburger: { kor: '징버거', eng: 'JINGBURGER', jpn: 'ジンバーガー' },
  lilpa: { kor: '릴파', eng: 'LILPA', jpn: 'リルパ' },
  jururu: { kor: '주르르', eng: 'JURURU', jpn: 'ジュルル' },
  gosegu: { kor: '고세구', eng: 'Gosegu', jpn: 'ゴセグ' },
  viichan: { kor: '비챤', eng: 'VIICHAN', jpn: 'ゔぃちゃん' },
};

const image = {
  ine,
  jingburger,
  lilpa,
  jururu,
  gosegu,
  viichan,
};

function MusicCard({ playlistControl, music, lang, isDark, inPlayer }) {
  const color = isDark ? darkColor : lightColor;

  return (
    <div
      style={{
        height: '72px',
        padding: '8px 0 8px 8px',
        width: '100%',
        borderBottom: `solid 0.5px ${color.lightGray}`,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        <img style={{ height: '100%', aspectRatio: '1/1', borderRadius: '3px', marginRight: '12px' }} src={image[music.singer]} />
        <div style={{ overflow: 'hidden' }}>
          <div
            style={{
              fontWeight: '400',
              fontSize: '15px',
              color: color.textDarkBlack,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              lineHeight: '1.1',
            }}
          >
            {{ kor: music.titleKor, eng: music.titleEng, jpn: music.titleJpn }[lang]}
          </div>
          <div style={{ lineHeight: '1.0', marginTop: '5px', fontWeight: '400', fontSize: '12.4px', color: color.darkGray, opacity: '90%' }}>
            {`${member[music.singer][lang]} / ${{ kor: music?.oSingerKor, eng: music?.oSingerEng, jpn: music?.oSingerJpn }[lang]}`}
          </div>
        </div>
      </div>
      {!inPlayer && (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', flexGrow: 0 }}>
          <Button style={{ height: '90%' }} size='xs' auto light icon={<MdOutlinePlaylistAdd color={color.darkGray} size={19} />} />
          <Button
            style={{ height: '90%' }}
            size='xs'
            auto
            light
            icon={<IoPlay color={color.darkGray} size={19} />}
            onClick={() => {
              playlistControl.add(music);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default MusicCard;
