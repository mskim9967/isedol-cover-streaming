import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';
import { IoClose, IoChevronUp, IoChevronDown } from 'react-icons/io5';
import { memo } from 'react';
import { Button } from '@nextui-org/react';

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

const member = {
  ine: { kor: '아이네', eng: 'INE', jpn: 'アイネ' },
  jingburger: { kor: '징버거', eng: 'JINGBURGER', jpn: 'ジンバーガー' },
  lilpa: { kor: '릴파', eng: 'LILPA', jpn: 'リルパ' },
  jururu: { kor: '주르르', eng: 'JURURU', jpn: 'ジュルル' },
  gosegu: { kor: '고세구', eng: 'GOSEGU', jpn: 'ゴセグ' },
  viichan: { kor: '비챤', eng: 'VIICHAN', jpn: 'ゔぃちゃん' },
  all: { kor: '이세계 아이돌', eng: 'Isegye Idol', jpn: 'イセドル' },
  null: { kor: '', eng: '', jpn: '' },
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

function MusicCardInPlaylist({
  playlistControl,
  music,
  lang,
  isDark,
  load,
  setLoad,
  playlist,
  setPlaylist,
  nowIdx,
  setNowIdx,
  idx,
  customPlaylist,
  setCustomPlaylist,
  name,
  imgDisable,
  length,
}) {
  const color = isDark ? darkColor : lightColor;

  return (
    <div
      style={{
        height: '72px',
        padding: '8px 0 8px 8px',
        width: '100%',
        ...(idx !== 0 && { borderTop: `solid 0.5px ${color.lightGray}` }),
        display: 'flex',
      }}
    >
      <div
        style={{ height: '100%', display: 'flex', alignItems: 'center', flexGrow: 1 }}
        onClick={(e) => {
          e.stopPropagation();
          if (!customPlaylist) {
            if (idx === nowIdx) return;
            setNowIdx(idx);
            setLoad(!load);
          }
        }}
      >
        <img
          style={{ height: customPlaylist ? '70%' : '100%', aspectRatio: '1/1', borderRadius: '3px', marginRight: '12px' }}
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
      <div style={{ float: 'right', height: '100%', display: 'flex', alignItems: 'center', flexGrow: 0 }}>
        {((!customPlaylist && idx !== nowIdx) || (customPlaylist && length !== 1)) && (
          <>
            <IoClose
              className='button'
              color={color.darkGray}
              size={19}
              style={{ margin: '10px 7px' }}
              onClick={(e) => {
                e.stopPropagation();

                if (customPlaylist) {
                  if (
                    !window.confirm(
                      {
                        kor: '플레이리스트에서 제거하시겠습니까?',
                        jpn: 'プレイリストから削除しますか?',
                        eng: 'Do you want to remove it from your playlist?',
                      }[lang]
                    )
                  )
                    return;
                  let temp = [...customPlaylist];
                  temp.forEach((e, i) => {
                    if (e.name === name) {
                      e.data.splice(idx, 1);
                    }
                  });
                  setCustomPlaylist([...temp]);
                } else {
                  if (idx < nowIdx) setNowIdx(nowIdx - 1);
                  let temp = playlist;
                  temp.splice(idx, 1);
                  setPlaylist([...temp]);
                }
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <IoChevronUp
                className='button'
                color={color.darkGray}
                size={19}
                style={{ margin: '7px 10px' }}
                onClick={(e) => {
                  e.stopPropagation();

                  if (customPlaylist) {
                    if (idx === 0) return;
                    let temp = [...customPlaylist];
                    temp.forEach((e, i) => {
                      if (e.name === name) {
                        [e.data[idx - 1], e.data[idx]] = [e.data[idx], e.data[idx - 1]];
                      }
                    });
                    setCustomPlaylist([...temp]);
                  } else {
                    if (idx === 0) return;
                    let temp = playlist;
                    [temp[idx - 1], temp[idx]] = [temp[idx], temp[idx - 1]];
                    if (idx - 1 === nowIdx) setNowIdx(nowIdx + 1);
                    setPlaylist([...temp]);
                  }
                }}
              />

              <IoChevronDown
                className='button'
                color={color.darkGray}
                size={19}
                style={{ margin: '7px 10px' }}
                onClick={(e) => {
                  e.stopPropagation();

                  if (customPlaylist) {
                    let len = customPlaylist.find((e) => e.name === name).data.length;
                    if (idx === len - 1) return;
                    let temp = [...customPlaylist];
                    temp.forEach((e, i) => {
                      if (e.name === name) {
                        [e.data[idx], e.data[idx + 1]] = [e.data[idx + 1], e.data[idx]];
                      }
                    });
                    setCustomPlaylist([...temp]);
                  } else {
                    if (idx === playlist.length - 1) return;
                    let temp = playlist;
                    [temp[idx], temp[idx + 1]] = [temp[idx + 1], temp[idx]];
                    if (idx + 1 === nowIdx) setNowIdx(nowIdx - 1);
                    setPlaylist([...temp]);
                  }
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default memo(MusicCardInPlaylist);
