import { useEffect, useState, memo, useRef } from 'react';
import { IoSearch, IoPlay, IoChevronUp, IoChevronDown, IoRefresh, IoLogoYoutube, IoChevronUpOutline } from 'react-icons/io5';
import { Button, Loading } from '@nextui-org/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { axiosInstance } from '../axiosInstance';

import HeaderText from '../component/HeaderText';
import MusicCard from '../component/MusicCard';

import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';

function iOSnPWA() {
  return (
    window.matchMedia('(display-mode: standalone)').matches &&
    (['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
      (navigator.userAgent.includes('Mac') && 'ontouchend' in document))
  );
}

const idols = [
  { key: 'all', kor: '단체곡', eng: 'ALL', jpn: '単体曲' },
  { key: 'ine', kor: '아이네', eng: 'INE', jpn: 'アイネ' },
  { key: 'jingburger', kor: '징버거', eng: 'JINGBURGER', jpn: 'ジンバーガー' },
  { key: 'lilpa', kor: '릴파', eng: 'LILPA', jpn: 'リルパ' },
  { key: 'jururu', kor: '주르르', eng: 'JURURU', jpn: 'ジュルル' },
  { key: 'gosegu', kor: '고세구', eng: 'GOSEGU', jpn: 'ゴセグ' },
  { key: 'viichan', kor: '비챤', eng: 'VIICHAN', jpn: 'ゔぃちゃん' },
];

const nations = [
  { key: 'kor', kor: '한식', eng: 'K-POP', jpn: 'K-POP' },
  { key: 'jpn', kor: '일식', eng: `J-POP`, jpn: 'J-POP' },
  { key: 'eng', kor: '양식', eng: 'Western POP', jpn: 'Western POP' },
];

function MusicScreen({ playlistControl, lang, isDark, customPlaylist, setCustomPlaylist, imgDisable, anim, audio }) {
  const color = isDark ? darkColor : lightColor;

  const [searchStr, setSearchStr] = useState('');
  const [isFilterPress, setFilterPress] = useState(false);
  const [selectedIdols, setSelectedIdols] = useState([]);
  const [selectedNations, setSelectedNations] = useState([]);
  const [isFull, setFull] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [searchButtonActive, setSearchButtonActive] = useState(false);
  const [musics, setMusics] = useState([]);
  const [shownMusics, setShownMusics] = useState([]);
  const [reload, setReload] = useState(false);
  const [youtube, setYoutube] = useState(false);
  const ref = useRef(null);

  useEffect(async () => {
    setSelectedIdols([]);
    setSelectedNations([]);
    setYoutube(false);
    setFull(false);
    setLoading(true);
    const res = await axiosInstance.get('/music');
    setLoading(false);
    setMusics(res.data.data.sort(() => Math.random() - 0.5));
  }, [reload]);

  useEffect(() => {
    setSearchButtonActive(searchStr || selectedIdols?.length || selectedNations?.length || isFull || youtube);
  }, [searchStr, selectedIdols, selectedNations, isFull, youtube]);

  useEffect(() => {
    setShownMusics([...musics.slice(0, 20)]);
  }, [musics]);

  const search = async () => {
    setLoading(true);
    const res = await axiosInstance.put('/music/search', {
      ...(searchStr?.length && { searchStr }),
      ...(selectedIdols?.length && { singers: [...selectedIdols] }),
      ...(selectedNations?.length && { nations: [...selectedNations] }),
      ...(isFull === true && { full: true }),
    });
    setLoading(false);
    if (youtube) setMusics(res.data.data.filter((e) => e.youtubeUrl !== ''));
    else setMusics(res.data.data);
  };

  return (
    <div
      style={{
        paddingBottom: '20px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        gap: '20px',
      }}
    >
      <div
        style={{
          position: 'fixed',
          zIndex: 1,
          left: 15,
          bottom: iOSnPWA() ? 160 : 150,
          width: '37px',
          height: '37px',
          borderRadius: '50%',
          backgroundColor: color.lightGray,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `2px 2px 10px -5px ${color.shadow}`,
        }}
        onClick={() => {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }}
      >
        <IoChevronUpOutline color={color.textBlack} size={22} style={{ marginBottom: 2 }} />
      </div>
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
              audio.current.play();
            }}
          >
            {{ kor: `${musics?.length}곡 재생`, jpn: `${musics?.length}曲再生`, eng: `Play ${musics?.length} songs` }[lang]}
          </Button>
        </div>
      </HeaderText>
      <div ref={ref}>
        <div style={{ width: '100%', height: '35px' }}>
          <div
            style={{
              float: 'left',
              backgroundColor: color.lightGray,
              width: searchButtonActive ? '86%' : '100%',
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
              width: searchButtonActive ? '13%' : '0%',
              opacity: searchButtonActive ? '100%' : '0%',
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
            <Button css={{ fontSize: '15px' }} light color='error' auto onClick={() => search()}>
              {{ kor: '검색', eng: 'Go', jpn: '検索' }[lang]}
            </Button>
          </div>
        </div>
        <div style={{ overflow: 'hidden', marginTop: '5px', maxHeight: '300px' }}>
          <div
            style={{
              borderRadius: '10px',
              backgroundColor: color.superLightGray,
              marginTop: isFilterPress ? 0 : '-300px',
              opacity: isFilterPress ? '100%' : 0,
              transition: 'margin ease-in-out 0.4s 0s, opacity ease-in-out 0.3s 0s',
            }}
          >
            <div style={{ padding: '15px 20px', display: 'flex', flexDirection: 'column', gap: 18, fontSize: '15px' }}>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                {idols.map((idol) => {
                  return (
                    <div
                      style={{
                        backgroundColor: eval(`color.${idol.key}`),
                        padding: '4px 11px',
                        borderRadius: '10px',
                        color: '#f3f3f3',
                        opacity: selectedIdols.includes(idol.key) ? '100%' : '24%',
                        ...(!selectedIdols.includes(idol.key) && { filter: 'grayscale(80%)' }),
                        transition: 'opacity ease-in-out 0.2s 0s, filter ease-in-out 0.2s 0s',
                      }}
                      onClick={() => {
                        if (selectedIdols.includes(idol.key)) {
                          setSelectedIdols([...selectedIdols.filter((e) => e !== idol.key)]);
                        } else setSelectedIdols([...selectedIdols, idol.key]);
                      }}
                    >
                      {idol[lang]}
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                {nations.map((idol) => {
                  return (
                    <div
                      style={{
                        backgroundColor: eval(`color.${idol.key}`),
                        padding: '4px 11px',
                        borderRadius: '10px',
                        color: '#f3f3f3',
                        opacity: selectedNations.includes(idol.key) ? '100%' : '24%',
                        ...(!selectedNations.includes(idol.key) && { filter: 'grayscale(80%)' }),
                        transition: 'opacity ease-in-out 0.2s 0s, filter ease-in-out 0.2s 0s',
                      }}
                      onClick={() => {
                        if (selectedNations.includes(idol.key)) {
                          setSelectedNations([...selectedNations.filter((e) => e !== idol.key)]);
                        } else setSelectedNations([...selectedNations, idol.key]);
                      }}
                    >
                      {idol[lang]}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
                <div
                  style={{
                    backgroundColor: eval(`color.isedol`),
                    padding: '4px 11px',
                    borderRadius: '10px',
                    color: '#f3f3f3',
                    opacity: isFull ? '100%' : '24%',
                    ...(!isFull && { filter: 'grayscale(80%)' }),
                    transition: 'opacity ease-in-out 0.2s 0s, filter ease-in-out 0.2s 0s',
                  }}
                  onClick={() => {
                    setFull(!isFull);
                  }}
                >
                  {{ kor: '풀버전', eng: 'Full Version', jpn: 'フルバージョン' }[lang]}
                </div>
                <div
                  style={{
                    backgroundColor: '#ff2828',
                    padding: '4px 11px',
                    borderRadius: '10px',
                    color: '#f3f3f3',
                    opacity: youtube ? '100%' : '24%',
                    ...(!youtube && { filter: 'grayscale(80%)' }),
                    transition: 'opacity ease-in-out 0.2s 0s, filter ease-in-out 0.2s 0s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                  onClick={() => {
                    setYoutube(!youtube);
                  }}
                >
                  <IoLogoYoutube size={17} />
                  Official
                </div>
              </div>
            </div>
          </div>
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
            position: 'relative',
          }}
        >
          <div onClick={() => setFilterPress(!isFilterPress)}>
            {{ kor: '필터', eng: 'Filter', jpn: 'フィルター' }[lang]}
            {isFilterPress ? <IoChevronUp style={{ marginLeft: '5px' }} /> : <IoChevronDown style={{ marginLeft: '5px' }} />}
          </div>
          <div style={{ position: 'absolute', right: 0, margin: '0 0 0 20px' }} onClick={() => setReload(!reload)}>
            <IoRefresh size={18} style={{ marginLeft: '5px' }} />
          </div>
        </div>
      </div>
      <div>
        {isLoading ? (
          <div style={{ width: '100%', marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
            <Loading type='points' color='error' size='lg' />
          </div>
        ) : musics?.length !== 0 ? (
          <InfiniteScroll
            style={{ paddingBottom: '20px' }}
            dataLength={shownMusics.length}
            next={() => {
              setTimeout(() => {
                setShownMusics([...shownMusics, ...musics.slice(shownMusics.length, shownMusics.length + 20)]);
              }, 1000);
            }}
            scrollableTarget='scrollableDiv'
            hasMore={shownMusics.length !== musics.length}
            loader={
              <div style={{ width: '100%', marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                <Loading type='points' color='error' size='lg' />
              </div>
            }
          >
            {shownMusics.map((music, key) => {
              return (
                <MusicCard
                  playlistControl={playlistControl}
                  key={key}
                  music={music}
                  lang={lang}
                  isDark={isDark}
                  customPlaylist={customPlaylist}
                  setCustomPlaylist={setCustomPlaylist}
                  imgDisable={imgDisable}
                  anim={anim}
                  audio={audio}
                ></MusicCard>
              );
            })}
          </InfiniteScroll>
        ) : (
          <div style={{ width: '100%', marginTop: '30px', display: 'flex', justifyContent: 'center', opacity: '50%', fontSize: '22px' }}>
            {{ kor: '검색 결과가 없습니다 :(', eng: 'Nothing found :(', jpn: '検索結果がありません :(' }[lang]}
          </div>
        )}
        <div style={{ height: '180px' }} />
      </div>
    </div>
  );
}

export default memo(MusicScreen);
