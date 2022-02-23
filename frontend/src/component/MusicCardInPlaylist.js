import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';
import gosegu from '../static/image/segu_300_300.webp';
import viichan from '../static/image/chan_300_300.webp';
import jururu from '../static/image/ruru_300_300.webp';
import lilpa from '../static/image/lilpa_300_300.webp';
import jingburger from '../static/image/jing_300_300.webp';
import ine from '../static/image/ine_300_300.webp';
import all from '../static/image/all_300_300.webp';
import { IoClose, IoChevronUp, IoChevronDown } from 'react-icons/io5';

import { Button } from '@nextui-org/react';

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
        onClick={() => {
          if (idx === nowIdx) return;
          setNowIdx(idx);
          setLoad(!load);
        }}
      >
        <img
          style={{ height: customPlaylist ? '70%' : '100%', aspectRatio: '1/1', borderRadius: '3px', marginRight: '12px' }}
          src={image[music.singer]}
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
        {(idx !== nowIdx || customPlaylist) && (
          <>
            <Button
              style={{ height: '90%' }}
              size='xs'
              auto
              light
              icon={<IoClose color={color.darkGray} size={19} />}
              onClick={() => {
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
            <div>
              <Button
                style={{ height: '30px' }}
                size='xs'
                auto
                light
                icon={<IoChevronUp color={color.darkGray} size={19} />}
                onClick={() => {
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
              <Button
                style={{ height: '30px' }}
                size='xs'
                auto
                light
                icon={
                  <IoChevronDown
                    color={color.darkGray}
                    size={19}
                    onClick={() => {
                      if (customPlaylist) {
                        if (idx === customPlaylist.length - 1) return;
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
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MusicCardInPlaylist;
