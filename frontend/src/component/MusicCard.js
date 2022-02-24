import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';

import gosegu from '../static/image/gosegu_300_300.png';
import viichan from '../static/image/viichan_300_300.png';
import jururu from '../static/image/jururu_300_300.png';
import lilpa from '../static/image/lilpa_300_300.png';
import jingburger from '../static/image/jingburger_300_300.png';
import ine from '../static/image/ine_300_300.png';
import all from '../static/image/all_300_300.webp';

import lgosegu from '../static/image/logo_gosegu_300_300.png';
import lviichan from '../static/image/logo_viichan_300_300.png';
import ljururu from '../static/image/logo_jururu_300_300.png';
import llilpa from '../static/image/logo_lilpa_300_300.png';
import ljingburger from '../static/image/logo_jingburger_300_300.png';
import line from '../static/image/logo_ine_300_300.png';
import lall from '../static/image/logo_all_300_300.png';

import { MdOutlinePlaylistAdd } from 'react-icons/md';
import { IoPlay, IoClose, IoChevronUp, IoChevronDown } from 'react-icons/io5';

import { Button, Modal } from '@nextui-org/react';
import CustomPlaylist from './CustomPlaylist';
import { useState } from 'react';

const member = {
  ine: { kor: '아이네', eng: 'INE', jpn: 'アイネ' },
  jingburger: { kor: '징버거', eng: 'JINGBURGER', jpn: 'ジンバーガー' },
  lilpa: { kor: '릴파', eng: 'LILPA', jpn: 'リルパ' },
  jururu: { kor: '주르르', eng: 'JURURU', jpn: 'ジュルル' },
  gosegu: { kor: '고세구', eng: 'Gosegu', jpn: 'ゴセグ' },
  viichan: { kor: '비챤', eng: 'VIICHAN', jpn: 'ゔぃちゃん' },
  all: { kor: '이세계 아이돌', eng: 'Isegye Idol', jpn: 'イセドル' },
};

const image = {
  ine,
  jingburger,
  lilpa,
  jururu,
  gosegu,
  viichan,
  all,
};

const logoimage = {
  all: lall,
  gosegu: lgosegu,
  viichan: lviichan,
  jururu: ljururu,
  lilpa: llilpa,
  jingburger: ljingburger,
  ine: line,
};

function MusicCard({ playlistControl, music, lang, isDark, audioRef, customPlaylist, setCustomPlaylist, imgDisable, anim }) {
  const color = isDark ? darkColor : lightColor;
  const [isModalActive, setModalActive] = useState(false);

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
        <img
          style={{ height: '100%', aspectRatio: '1/1', borderRadius: '3px', marginRight: '12px' }}
          src={imgDisable ? logoimage[music.singer] : image[music.singer]}
        />
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
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', flexGrow: 0 }}>
        <Button
          style={{ height: '90%' }}
          size='xs'
          auto
          light
          onClick={() => {
            setModalActive(true);
          }}
          icon={<MdOutlinePlaylistAdd color={color.darkGray} size={19} />}
        />
        <Button
          style={{ height: '90%' }}
          size='xs'
          auto
          light
          icon={<IoPlay color={color.darkGray} size={19} />}
          onClick={() => {
            playlistControl.add(music);
            audioRef.current.play();
          }}
        />
      </div>
      <Modal
        css={{ backgroundColor: isDark ? '#1c1c1c' : '#ffffff', width: '85%', maxWidth: '500px', margin: '0 auto' }}
        closeButton
        open={isModalActive}
        animated={anim}
        onClose={() => setModalActive(false)}
      >
        <CustomPlaylist
          setModalActive={setModalActive}
          music={music}
          customPlaylist={customPlaylist}
          setCustomPlaylist={setCustomPlaylist}
          lang={lang}
          isDark={isDark}
        />
      </Modal>
    </div>
  );
}

export default MusicCard;
