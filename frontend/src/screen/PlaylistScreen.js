import PlaylistCard from '../component/PlaylistCard';
import HeaderText from '../component/HeaderText';

import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';
import { Button, Modal } from '@nextui-org/react';
import CustomPlaylist from '../component/CustomPlaylist';
import { useState } from 'react';
import CustomPlaylistEdit from '../component/CustomPlaylistEdit';

const idols = ['gosegu', 'ine', 'viichan', 'jingburger', 'jururu', 'lilpa'].sort(() => Math.random() - 0.5);
const nations = ['kor', 'jpn', 'eng'].sort(() => Math.random() - 0.5);

function PlaylistScreen({ audioRef, lang, isDark, playlistControl, customPlaylist, setCustomPlaylist }) {
  const color = isDark ? darkColor : lightColor;
  const [isModalActive, setModalActive] = useState(false);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', flexShrink: 0, gap: '20px' }}>
      <HeaderText isDark={isDark}>{{ kor: '재생 목록', eng: 'Playlist', jpn: '再生リスト' }[lang]}</HeaderText>

      <div>
        <div style={{ fontSize: '19px', fontWeight: '600', letterSpacing: '-0.6px' }}>
          {{ kor: '아이돌별 추천', eng: 'Suggestion by idol', jpn: 'アイドル別おすすめ' }[lang]}
        </div>
        <div style={{ margin: '0 0 0 -20px', padding: '0px 20px', left: 0, width: '100vw', display: 'flex', gap: '10px', overflow: 'auto' }}>
          <PlaylistCard audioRef={audioRef} lang={lang} theme={'all'} type={'idol'} playlistControl={playlistControl} />
          {idols.map((e, idx) => {
            return <PlaylistCard audioRef={audioRef} key={idx} lang={lang} theme={e} type={'idol'} playlistControl={playlistControl} />;
          })}
        </div>
      </div>

      <div>
        <div style={{ fontSize: '19px', fontWeight: '600', letterSpacing: '-0.6px' }}>
          {{ kor: '장르별 추천', eng: 'Suggestion by genre', jpn: 'ジャンル別 おすすめ' }[lang]}
        </div>
        <div style={{ margin: '0px -20px', padding: '0px 20px', left: 0, width: '100vw', display: 'flex', gap: '10px', overflow: 'auto' }}>
          {nations.map((e, idx) => {
            return <PlaylistCard audioRef={audioRef} key={idx} lang={lang} theme={e} type={'nation'} playlistControl={playlistControl} />;
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
            {{ kor: '수정', eng: 'Modify', jpn: '修整' }[lang]}
          </Button>
        </div>
        <div style={{ margin: '0px -20px', padding: '0px 20px', left: 0, width: '100vw', display: 'flex', gap: '10px', overflow: 'auto' }}>
          <PlaylistCard audioRef={audioRef} lang={lang} theme={'like'} type={'custom'} playlistControl={playlistControl} />
          {customPlaylist.map((e, idx) => {
            return (
              <PlaylistCard
                audioRef={audioRef}
                key={idx}
                lang={lang}
                theme={e.name}
                type={'custom'}
                playlistControl={playlistControl}
                customPlaylist={customPlaylist}
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
        open={isModalActive}
        onClose={() => setModalActive(false)}
      >
        <CustomPlaylistEdit
          setModalActive={setModalActive}
          customPlaylist={customPlaylist}
          setCustomPlaylist={setCustomPlaylist}
          lang={lang}
          isDark={isDark}
        />
      </Modal>
    </div>
  );
}

export default PlaylistScreen;
