import { useEffect, useState, memo } from 'react';
import { IoSearch, IoPlay, IoChevronUp, IoChevronDown } from 'react-icons/io5';
import { Button } from '@nextui-org/react';
import { axiosInstance } from '../axiosInstance';

import HeaderText from '../component/HeaderText';
import MusicCard from '../component/MusicCard';

import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';

function MusicScreen({ playlistControl, lang, isDark, audioRef, customPlaylist, setCustomPlaylist, imgDisable, anim }) {
  const color = isDark ? darkColor : lightColor;

  const [searchStr, setSearchStr] = useState('');
  const [isFilterPress, setFilterPress] = useState(false);

  const [musics, setMusics] = useState([]);

  useEffect(async () => {
    if (!searchStr.length) {
      const res = await axiosInstance.get('/music');
      setMusics(res.data.data.reverse());
    }
  }, [searchStr]);

  const search = async () => {
    const res = await axiosInstance.put('/music/search', {
      searchStr,
    });

    setMusics(res.data.data.reverse());
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', flexShrink: 0, gap: '20px' }}>
      <HeaderText isDark={isDark}>
        {{ kor: '커버곡', eng: 'Cover Song', jpn: 'カバー曲' }[lang]}
        <div style={{ float: 'right' }}>
          <Button
            style={{ height: '34px', marginTop: '12px' }}
            auto
            disabled={!musics?.length}
            size='sm'
            color={'error'}
            iconRight
            icon={<IoPlay size={17} style={{ marginLeft: '-6px' }} />}
            onClick={() => {
              playlistControl.change(musics);
              audioRef.current.play();
            }}
          >
            {{ kor: `${musics?.length}곡 재생`, jpn: `${musics?.length}曲再生`, eng: `Play ${musics?.length} songs` }[lang]}
          </Button>
        </div>
      </HeaderText>
      <div>
        <div style={{ width: '100%', height: '35px' }}>
          <div
            style={{
              float: 'left',
              backgroundColor: color.lightGray,
              width: searchStr ? '86%' : '100%',
              height: '100%',
              borderRadius: '8px',
              display: 'grid',
              gridTemplateColumns: '17px 1fr',
              padding: '0 13px',
              transition: 'width ease 0.3s 0s',
            }}
          >
            <IoSearch style={{ height: '100%', color: color.darkGray }} />
            <input
              style={{ border: 'none', background: 'none', height: '100%', color: color.darkGray, fontSize: '16px' }}
              placeholder={{ kor: '제목 및 가수...', eng: 'Enter the title or singer', jpn: 'タイトルと歌手を入力してください' }[lang]}
              onChange={(e) => setSearchStr(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') search();
              }}
            />
          </div>
          <div
            className='searchButton'
            style={{
              width: searchStr ? '13%' : '0%',
              opacity: searchStr ? '100%' : '0%',
              overflow: 'hidden',
              height: '100%',
              float: 'right',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '15px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              transition: 'width ease 0.3s 0s, opacity ease 0.3s 0s',
            }}
          >
            <Button light color='error' auto onClick={() => search()}>
              {{ kor: '검색', eng: 'Go', jpn: '検索' }[lang]}
            </Button>
          </div>
        </div>
        <div style={{ overflow: 'hidden', marginTop: '5px' }}>
          <div
            style={{
              height: '200px',
              borderRadius: '10px',
              backgroundColor: color.superLightGray,
              marginTop: isFilterPress ? 0 : '-200px',
              opacity: isFilterPress ? '100%' : 0,
              transition: 'margin ease-in-out 0.4s 0s, opacity ease-in-out 0.3s 0s',
            }}
          ></div>
        </div>

        <div
          style={{
            marginTop: '2px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '15px',
            color: color.gray,
          }}
          onClick={() => setFilterPress(!isFilterPress)}
        >
          {{ kor: '필터', eng: 'Filter', jpn: 'フィルター' }[lang]}
          {isFilterPress ? <IoChevronUp style={{ marginLeft: '5px' }} /> : <IoChevronDown style={{ marginLeft: '5px' }} />}
        </div>
      </div>
      <div>
        {musics?.length !== 0 &&
          musics.map((music, key) => {
            return (
              <MusicCard
                audioRef={audioRef}
                playlistControl={playlistControl}
                key={key}
                music={music}
                lang={lang}
                isDark={isDark}
                customPlaylist={customPlaylist}
                setCustomPlaylist={setCustomPlaylist}
                imgDisable={imgDisable}
                anim={anim}
              ></MusicCard>
            );
          })}
      </div>
    </div>
  );
}

export default memo(MusicScreen);
