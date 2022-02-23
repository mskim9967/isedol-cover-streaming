import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';
import gosegu from '../static/image/segu_300_300.webp';
import viichan from '../static/image/chan_300_300.webp';
import jururu from '../static/image/ruru_300_300.webp';
import lilpa from '../static/image/lilpa_300_300.webp';
import jingburger from '../static/image/jing_300_300.webp';
import ine from '../static/image/ine_300_300.webp';
import all from '../static/image/all_300_300.webp';
import { IoChevronUp, IoChevronDown, IoClose, IoPencil, IoTrash } from 'react-icons/io5';

import { Button } from '@nextui-org/react';
import { useState } from 'react';
import MusicCardInPlaylist from './MusicCardInPlaylist';

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

function CustomPlaylistEdit({ setModalActive, playlistControl, music, lang, isDark, audioRef, customPlaylist, setCustomPlaylist }) {
  const color = isDark ? darkColor : lightColor;
  const [openIdx, setOpenIdx] = useState(-1);

  return (
    <div
      style={{
        width: '100%',
        padding: '3px 20px 20px 20px',
        backgroundColor: isDark ? '#1c1c1c' : '#ffffff',
        display: 'flex',
        gap: 4,
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxHeight: '80vh',
        overflow: 'auto',
      }}
    >
      <div style={{ width: '100%' }}>
        <div
          style={{
            float: 'left',
            marginBottom: '10px',
            marginLeft: '3px',
            fontSize: '20px',
            fontWeight: '500',
            color: color.textBlack,
          }}
        >
          {{ kor: '플레이리스트 편집', jpn: 'プレイリスト編集', eng: 'Edit playlist' }[lang]}
        </div>
      </div>

      <div>
        {customPlaylist?.length !== 0 && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {customPlaylist.map((playlist, idx) => {
              return (
                <>
                  <div
                    style={{
                      width: '100%',
                      height: '50px',
                      fontSize: '22px',
                      fontWeight: '500',
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: color.textBlack,
                      ...(idx !== 0 && { borderTop: `solid ${color.lightGray} 1px` }),
                      padding: '0 0 0 10px',
                    }}
                    onClick={() => {
                      if (idx === openIdx) setOpenIdx(-1);
                      else setOpenIdx(idx);
                    }}
                  >
                    <div style={{ heght: '100%', display: 'flex', alignItems: 'center' }}>
                      {playlist.name}
                      {idx === openIdx ? <IoChevronUp style={{ marginLeft: '5px' }} /> : <IoChevronDown style={{ marginLeft: '5px' }} />}
                    </div>
                    <div style={{ heght: '100%', display: 'flex', alignItems: 'center' }}>
                      <Button
                        style={{ height: '90%' }}
                        size='xs'
                        auto
                        light
                        icon={<IoTrash color={color.darkGray} size={20} />}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            !window.confirm(
                              {
                                kor: '플레이리스트를 삭제하시겠습니까?',
                                jpn: 'プレイリストを削除しますか?',
                                eng: 'Do you want to remove this playlist?',
                              }[lang]
                            )
                          )
                            return;
                          let temp = customPlaylist;
                          temp.splice(idx, 1);
                          setCustomPlaylist([...temp]);
                        }}
                      />
                      <Button
                        style={{ height: '90%' }}
                        size='xs'
                        auto
                        light
                        icon={<IoPencil color={color.darkGray} size={20} />}
                        onClick={(e) => {
                          e.stopPropagation();
                          let name = window.prompt(
                            {
                              kor: '변경할 이름을 입력하세요',
                              jpn: 'プ変更する名前を入力してください',
                              eng: 'Enter the name you want to change',
                            }[lang]
                          );
                          name = name.trim();
                          if (!name || name.length === 0)
                            alert({ kor: '이름이 비어있습니다', jpn: '名前があいています', eng: 'The name is empty' }[lang]);
                          else if (name.length > 10) alert({ kor: '이름이 너무 깁니다', jpn: '名前があいています', eng: 'The name is empty' }[lang]);
                          else if (customPlaylist.find((e) => e.name === name))
                            alert({ kor: '이름이 중복됩니다', jpn: '名前が長すぎます', eng: 'The name too long' }[lang]);
                          else {
                            let temp = customPlaylist;
                            temp[idx].name = name;
                            setCustomPlaylist([...temp]);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div
                      style={{
                        borderRadius: '10px',
                        marginTop: idx === openIdx ? 0 : `-${playlist.data.length * 90}px`,
                        opacity: idx === openIdx ? '100%' : 0,
                        transition: 'margin ease-in-out 0.4s 0s, opacity ease-in-out 0.4s 0s',
                        marginBottom: '14px',
                        padding: '0 0 0 5px',
                        textAlign: 'left',
                        backgroundColor: color.lightGray,
                      }}
                    >
                      {playlist.data.map((music, idx) => {
                        return (
                          <MusicCardInPlaylist
                            key={idx}
                            idx={idx}
                            music={music}
                            lang={lang}
                            isDark={isDark}
                            playlist={playlist}
                            customPlaylist={customPlaylist}
                            setCustomPlaylist={setCustomPlaylist}
                            name={playlist.name}
                          />
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomPlaylistEdit;
