import PlaylistCard from '../component/PlaylistCard';
import HeaderText from '../component/HeaderText';

import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';
import { Button, Modal } from '@nextui-org/react';
import { useState, memo, useEffect } from 'react';
import CustomPlaylistEdit from '../component/CustomPlaylistEdit';

const idols = ['gosegu', 'ine', 'viichan', 'jingburger', 'jururu', 'lilpa'].sort(() => Math.random() - 0.5);
const nations = ['kor', 'jpn', 'eng'].sort(() => Math.random() - 0.5);

function PlaylistScreen({ lang, isDark, playlistControl, customPlaylist, setCustomPlaylist, imgDisable, anim, audio }) {
  const color = isDark ? darkColor : lightColor;
  const [isModalActive, setModalActive] = useState(false);
  const [customPlaylistShuffle, setCustomPlaylistShuffle] = useState([]);

  useEffect(() => {
    setCustomPlaylistShuffle([...customPlaylist.slice(0).sort(() => Math.random() - 0.5)]);
  }, []);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', flexShrink: 0, gap: '20px' }}>
      <HeaderText isDark={isDark}>{{ kor: '재생 목록', eng: 'Playlist', jpn: '再生リスト' }[lang]}</HeaderText>

      <div>
        <div style={{ fontSize: '19px', fontWeight: '600', letterSpacing: '-0.6px' }}>
          {{ kor: '아이돌별 추천', eng: 'Suggestion by idol', jpn: 'アイドル別おすすめ' }[lang]}
        </div>
        <div style={{ margin: '0 0 0 -20px', padding: '0px 20px', left: 0, width: '100vw', display: 'flex', overflow: 'auto', gap: '10px' }}>
          <PlaylistCard audio={audio} lang={lang} theme={'all'} type={'idol'} playlistControl={playlistControl} imgDisable={imgDisable} />
          {idols.map((e, idx) => {
            return (
              <PlaylistCard audio={audio} key={idx} lang={lang} theme={e} type={'idol'} playlistControl={playlistControl} imgDisable={imgDisable} />
            );
          })}
        </div>
      </div>

      <div>
        <div style={{ fontSize: '19px', fontWeight: '600', letterSpacing: '-0.6px' }}>
          {{ kor: '장르별 추천', eng: 'Suggestion by genre', jpn: 'ジャンル別 おすすめ' }[lang]}
        </div>
        <div style={{ margin: '0px -20px', padding: '0px 20px', left: 0, width: '100vw', display: 'flex', gap: '10px', overflow: 'auto' }}>
          {nations.map((e, idx) => {
            return (
              <PlaylistCard audio={audio} key={idx} lang={lang} theme={e} type={'nation'} playlistControl={playlistControl} imgDisable={imgDisable} />
            );
          })}
        </div>
      </div>
      <div>
        <div
          style={{
            fontSize: '19px',
            fontWeight: '600',
            letterSpacing: '-0.6px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {{ kor: '나의 플레이리스트', eng: 'My playlist', jpn: '僕のプレイリスト' }[lang]}

          <Button
            size='xs'
            color='error'
            auto
            light
            css={{ fontWeight: '500', fontSize: '16px' }}
            onClick={() => {
              setModalActive(true);
            }}
          >
            {{ kor: '편집', eng: 'Edit', jpn: '編集' }[lang]}
          </Button>
        </div>
        <div style={{ margin: '0px -20px', padding: '0px 20px', left: 0, width: '100vw', display: 'flex', gap: '10px', overflow: 'auto' }}>
          <PlaylistCard audio={audio} lang={lang} theme={'like'} type={'custom'} playlistControl={playlistControl} imgDisable={imgDisable} />
          {customPlaylistShuffle.map((e, idx) => {
            return (
              <PlaylistCard
                audio={audio}
                key={idx}
                lang={lang}
                theme={e.name}
                type={'custom'}
                playlistControl={playlistControl}
                customPlaylist={customPlaylist}
                imgDisable={imgDisable}
              />
            );
          })}
        </div>
      </div>
      <Modal
        css={{
          backgroundColor: isDark ? '#1c1c1c' : '#ffffff',
          width: '95%',
          maxWidth: '900px',
          margin: '0 auto',
        }}
        closeButton
        animated={anim}
        open={isModalActive}
        onClose={() => setModalActive(false)}
      >
        <CustomPlaylistEdit
          setModalActive={setModalActive}
          customPlaylist={customPlaylist}
          setCustomPlaylist={setCustomPlaylist}
          lang={lang}
          isDark={isDark}
          imgDisable={imgDisable}
        />
      </Modal>
    </div>
  );
}

export default memo(PlaylistScreen);
