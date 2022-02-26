import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';
import {
  IoChevronUp,
  IoChevronDown,
  IoShareOutline,
  IoPencil,
  IoTrash,
  IoClipboardOutline,
  IoCloudDownloadOutline,
  IoCloudUploadOutline,
} from 'react-icons/io5';
import { Button, Modal, Input, Loading } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import MusicCardInPlaylist from './MusicCardInPlaylist';
import { axiosInstance } from '../axiosInstance';

function CustomPlaylistEdit({ setModalActive, playlistControl, music, lang, isDark, audioRef, customPlaylist, setCustomPlaylist, imgDisable }) {
  const color = isDark ? darkColor : lightColor;
  const [keyModal, setKeyModal] = useState(false);
  const [downloadKeyModa, setDownloadKeyModal] = useState(false);
  const [downloadKey, setDownloadKey] = useState('');
  const [isLoading, setLoading] = useState(false);

  const [key, setKey] = useState('');

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
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <div
          style={{
            fontSize: '20px',
            fontWeight: '500',
            color: color.textBlack,
            marginRight: '6px',
          }}
        >
          {{ kor: '플레이리스트 편집', jpn: 'プレイリスト編集', eng: 'Edit playlist' }[lang]}
        </div>
        <Button
          size='xs'
          auto
          light
          icon={<IoCloudDownloadOutline color={color.darkGray} size={20} />}
          onClick={(e) => {
            e.stopPropagation();
            setDownloadKeyModal(true);
          }}
        />
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
                      fontSize: '16px',
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
                    <div style={{ heght: '100%', display: 'flex', alignItems: 'center', gap: 2 }}>
                      {`${playlist.name} (${playlist.data.length})`}
                      {idx === openIdx ? <IoChevronUp style={{ marginLeft: '5px' }} /> : <IoChevronDown style={{ marginLeft: '5px' }} />}
                    </div>

                    <div style={{ heght: '100%', display: 'flex', alignItems: 'center' }}>
                      <Button
                        style={{ height: '90%' }}
                        size='xs'
                        auto
                        light
                        icon={<IoCloudUploadOutline color={color.darkGray} size={20} />}
                        onClick={async (e) => {
                          e.stopPropagation();
                          let list = '';
                          playlist.data.forEach((e) => {
                            list += e.id + ',';
                          });
                          const res = await axiosInstance.post('/playlist', {
                            value: list.slice(0, -1),
                          });
                          setKeyModal(true);
                          setKey(res.data.data.key);
                        }}
                      />
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
                            imgDisable={imgDisable}
                            length={playlist.data.length}
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

      <Modal
        autoMargin
        noPadding
        closeButton
        open={downloadKeyModa}
        onClose={() => setDownloadKeyModal(false)}
        width='280px'
        css={{ backgroundColor: isDark ? '#1c1c1c' : '#ffffff' }}
      >
        <div style={{ color: color.textBlack, padding: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <div style={{ fontSize: '16px', fontWeight: '500', wordBreak: 'keep-all', marginBottom: '3px' }}>
            {
              {
                kor: '아래에 키를 입력하여 플레이리스트를 가져옵니다',
                jpn: '以下にキーを入力してプレイリストを取得します',
                eng: 'Enter the key below to get the playlist',
              }[lang]
            }
          </div>
          <Input width='200px' placeholder='Key' onChange={(e) => setDownloadKey(e.target.value)} />
          <div style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
            {isLoading ? (
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Loading type='points' color='error' size='lg' />
              </div>
            ) : (
              <Button
                css={{ fontSize: '15px' }}
                color='error'
                disabled={downloadKey?.length !== 6}
                auto
                onClick={async () => {
                  setLoading(true);
                  const res = await axiosInstance.get(`/playlist/${downloadKey}`, { validateStatus: false });
                  if (!res.data.data) {
                    alert({ kor: '키가 유효하지 않습니다', jpn: '鍵が有効ではありません', eng: 'Key is not valid' }[lang]);
                    setLoading(false);
                    return;
                  }
                  let data = [];
                  let ids = res.data.data.value.split(',');
                  console.log(ids);
                  for (let id of ids) {
                    const musicRes = await axiosInstance.get(`/music/${id}`);
                    data.push(musicRes.data.data);
                  }
                  let name = '';
                  while (name !== null) {
                    name = prompt({ kor: '새 플레이리스트 이름', jpn: 'プレイリス新しいプレイリストの名前', eng: "New playlist's name" }[lang]);
                    if (name !== null) {
                      name = name.trim();
                      if (!name || name.length === 0)
                        alert({ kor: '이름이 비어있습니다', jpn: '名前があいています', eng: 'The name is empty' }[lang]);
                      else if (name.length > 10) alert({ kor: '이름이 너무 깁니다', jpn: '名前があいています', eng: 'The name is empty' }[lang]);
                      else if (customPlaylist.find((e) => e.name === name))
                        alert({ kor: '이름이 중복됩니다', jpn: '名前が長すぎます', eng: 'The name too long' }[lang]);
                      else {
                        setCustomPlaylist([...customPlaylist, { name, data }]);
                        setDownloadKeyModal(false);
                        break;
                      }
                    }
                  }
                  setLoading(false);
                }}
              >
                {{ kor: '가져오기', eng: 'Import', jpn: '取り込み' }[lang]}
              </Button>
            )}
          </div>
        </div>
      </Modal>
      <Modal
        autoMargin
        noPadding
        closeButton
        open={keyModal}
        onClose={() => setKeyModal(false)}
        width='280px'
        css={{ backgroundColor: isDark ? '#1c1c1c' : '#ffffff' }}
      >
        <div style={{ color: color.textBlack, padding: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <div style={{ fontSize: '16px', fontWeight: '500', wordBreak: 'keep-all' }}>
            {
              {
                kor: '아래의 키 값을 다른 브라우저에 입력해주세요',
                jpn: '以下のキー値を他のブラウザに入力してください',
                eng: 'Please enter the KEY below in another browser',
              }[lang]
            }
          </div>
          <div
            style={{
              width: '200px',
              height: '50px',
              borderRadius: '20px',
              backgroundColor: color.lightGray,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: color.textBlack,
              fontWeight: '600',
              fontSize: '24px',
              position: 'relative',
            }}
            onClick={() => {
              navigator.clipboard.writeText(key);
            }}
          >
            {key}
            <div style={{ position: 'absolute', right: 14, marginTop: '5px' }}>
              <IoClipboardOutline
                onClick={() => {
                  navigator.clipboard.writeText(key);
                }}
              />
            </div>
          </div>
          <div style={{ fontSize: '14px', fontWeight: '400', opacity: '65%' }}>
            {
              {
                kor: '키는 3일간 유효합니다',
                jpn: 'キーは3日間有効です',
                eng: 'the key is valid for 3 days',
              }[lang]
            }
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CustomPlaylistEdit;
