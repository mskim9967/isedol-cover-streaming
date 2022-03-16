import { useEffect, useRef, useState, memo } from 'react';
import { axiosInstance } from '../axiosInstance';
import IdolPage from '../component/IdolPage';
import { useSwipeable } from 'react-swipeable';
import { throttle } from 'lodash';

import darkColor from '../static/darkColor';
import lightColor from '../static/lightColor';
import isdlogo from '../static/image/isdlogo.png';
import allbg from '../static/image/allbg.png';

import inethumb from '../static/image/ine_thumb.png';
import jingburgerthumb from '../static/image/jingburger_thumb.png';
import lilpathumb from '../static/image/lilpa_thumb.png';
import jururuthumb from '../static/image/jururu_thumb.png';
import goseguthumb from '../static/image/gosegu_thumb.png';
import viichanthumb from '../static/image/viichan_thumb.png';

const thumbImg = {
  ine: inethumb,
  jingburger: jingburgerthumb,
  lilpa: lilpathumb,
  jururu: jururuthumb,
  gosegu: goseguthumb,
  viichan: viichanthumb,
};
let beforeY = 0;

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

const snsLink = {
  ine: {
    youtube: 'https://www.youtube.com/channel/UCroM00J2ahCN6k-0-oAiDxg',
    twitch: 'https://www.twitch.tv/vo_ine',
    instagram: 'https://www.instagram.com/ine_hamine',
  },
  jingburger: {
    youtube: 'https://www.youtube.com/c/%EC%A7%95%EB%B2%84%EA%B1%B0',
    twitch: 'https://www.twitch.tv/jingburger',
    instagram: 'https://www.instagram.com/jing_burger/',
    twitter: 'https://twitter.com/jing_burger',
  },
  lilpa: {
    youtube: 'https://youtube.com/channel/UC-oCJP9t47v7-DmsnmXV38Q',
    twitch: 'https://www.twitch.tv/lilpaaaaaa',
    instagram: 'https://www.instagram.com/lilpaaaaaa_/',
    soundCloud: 'https://soundcloud.com/bhdred9q6qtd',
  },
  jururu: {
    twitch: 'https://www.twitch.tv/cotton__123',
    youtube: 'https://www.youtube.com/channel/UCTifMx1ONpElK5x6B4ng8eg',
    instagram: 'https://www.instagram.com/ju_ruru_/?hl=ko',
    twitter: 'https://twitter.com/jururu_twitch',
  },
  gosegu: {
    youtube: 'https://www.youtube.com/channel/UCV9WL7sW6_KjanYkUUaIDfQ',
    twitch: 'https://www.twitch.tv/gosegugosegu',
    instagram: 'https://www.instagram.com/gosegu_official',
  },
  viichan: {
    youtube: 'https://www.youtube.com/channel/UCs6EwgxKLY9GG4QNUrP5hoQ',
    twitch: 'https://www.twitch.tv/viichan6',
    instagram: 'https://www.instagram.com/viichan6/',
    twitter: 'https://twitter.com/viichan6',
    soundCloud: 'https://soundcloud.com/viichan6',
  },
};

const idols = ['ine', 'jingburger', 'lilpa', 'jururu', 'gosegu', 'viichan'];

function IdolScreen({ lang, isDark, height, screen }) {
  const color = isDark ? darkColor : lightColor;

  const [videos, setVideos] = useState();
  const [selectedIdol, setSelectedIdol] = useState('');
  const [popupActive, setPopupActive] = useState(true);
  const [twitchPressed, setTwitchPressed] = useState(false);
  const [onAir, setOnAir] = useState(null);
  useEffect(async () => {
    if (!selectedIdol) return;
    const res = await axiosInstance.get(`/openApi/twitch/${selectedIdol}`);
    if (res.data.data.data[0]) setOnAir(res.data.data.data[0]);
    else setOnAir(null);
  }, [selectedIdol]);

  useEffect(async () => {
    if (screen !== 'idol') return;
    const res = await axiosInstance.get('/openApi/youtube');
    setVideos(res.data.data);
  }, [screen]);

  useEffect(() => {}, [selectedIdol]);

  const throttled = useRef(
    throttle((e) => {
      console.log(beforeY, e.target.scrollTop);
      if (e.target.scrollTop < 100) setPopupActive(true);
      else {
        if (beforeY + 15 < e.target.scrollTop) setPopupActive(false);
        else if (beforeY - 15 > e.target.scrollTop) setPopupActive(true);
      }

      beforeY = e.target.scrollTop;
    }, 400)
  );
  const swipeHandler = useSwipeable({
    onSwipedRight: () => {
      setSelectedIdol(idols[Math.max(0, idols.indexOf(selectedIdol) - 1)]);
    },
    onSwipedLeft: () => {
      setSelectedIdol(idols[Math.min(idols.indexOf(selectedIdol) + 1, 5)]);
    },
  });

  useEffect(() => {
    setPopupActive(true);
    setOnAir(null);
  }, [selectedIdol]);

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          position: 'fixed',
          right: 0,
          top: 150,
          zIndex: 10,
          width: '152px',
          height: '90px',
          backgroundColor: color.twitch,
          boxShadow: `0px 3px 10px -5px ${color.shadow}`,
          borderRadius: '14px 0 0 14px',
          transform: !onAir ? 'translateX(155px)' : twitchPressed ? 'translateX(0)' : 'translateX(124px)',
          transition: 'transform ease 0.5s 0s',
        }}
        onClick={() => setTwitchPressed(!twitchPressed)}
      >
        <div
          style={{
            position: 'absolute',
            fontSize: '16px',
            fontWeight: '600',
            color: '#ffffff',
            transform: 'rotate(0.75turn) translateX(-34px) translateY(-18.4px)',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#ff0000',
              boxShadow: `0px 0px 2px 0px #ff0000`,
              display: 'inline-block',
              marginRight: '3.8px',
            }}
          ></div>
          ON AIR
        </div>

        <img
          style={{ float: 'right', borderRadius: '0 0 0 5px' }}
          src={onAir?.thumbnail_url.replace('{width}', '124').replace('{height}', '70')}
          onClick={(e) => {
            e.stopPropagation();
            window.open(snsLink[selectedIdol]['twitch'], '_blank');
          }}
        />
        <div
          style={{
            float: 'right',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '124px',
            padding: '1px 5px',
            fontSize: '12px',
            fontWeight: '500',
            color: '#ffffff',
          }}
        >
          {onAir?.title}
        </div>
      </div>
      <div
        style={{
          width: '100%',
          position: 'fixed',
          zIndex: 10,
          left: 0,
          top: popupActive ? 24 : -56,
          transition: 'top ease 0.3s 0s',
          height: '50px',
        }}
      >
        <div
          style={{
            margin: '0 auto',
            width: '94%',
            height: '100%',
            padding: '0 1px',
            backgroundColor: isDark ? '#222222' : '#ffffff',
            borderRadius: '25px',
            boxShadow: `0px 2px 10px -6px ${color.shadow}`,
            display: 'flex',
            color: color.textWhite,
            overflow: 'hidden',
          }}
        >
          {idols.map((idol) => {
            return (
              <div
                style={{
                  transition: 'flex ease 0.3s 0s',
                  padding: '0 3px',
                  flex: selectedIdol === idol ? 2.1 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => {
                  if (selectedIdol === idol) setSelectedIdol('');
                  else setSelectedIdol(idol);
                }}
              >
                <div
                  style={{
                    width: selectedIdol === idol ? '100%' : '41px',
                    transition: 'width ease 0.3s 0s',
                    borderRadius: '20px',
                    backgroundColor: eval(`color.${idol}`),
                    height: '41px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      zIndex: 10,
                      width: '41px',
                      height: '41px',
                      borderRadius: '50%',
                      zIndex: 20,
                      backgroundImage: `url(${thumbImg[idol]})`,
                      backgroundSize: 'cover',
                      border: `solid ${eval(`color.${idol}`)} 2px`,
                      float: 'left',
                    }}
                  />

                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      flexDirection: 'column',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '41px',
                      marginRight: '-32px',
                      marginTop: '0.3px',
                      color: '#ffffff',
                    }}
                  >
                    {member[idol].kor}

                    <div
                      style={{
                        fontSize: '9.2px',
                        fontWeight: '200',
                        letterSpacing: '-0.5px',
                        marginTop: '-5px',
                      }}
                    >
                      {member[idol].eng}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          opacity: '' === selectedIdol ? 1 : 0,
          transition: 'opacity ease 0.5s 0s, transform ease 0.5s 0s',
        }}
      >
        <div style={{ zIndex: 0, position: 'absolute', bottom: 0, left: 0, width: '100vw', display: 'flex', justifyContent: 'center' }}>
          <img src={allbg}></img>
        </div>
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            height: height - 95,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 7,
            color: color.darkGray,
          }}
        >
          <div style={{ fontSize: '25px', fontWeight: '100', fontStyle: 'italic', width: '150px', display: 'flex', justifyContent: 'center' }}>
            차원을 넘어,
          </div>
          <div style={{ fontSize: '16px', fontWeight: '100', width: '150px', display: 'flex', justifyContent: 'center' }}>안녕하세요</div>
          <img style={{ width: '63%', maxWidth: '300px', margin: '2px' }} src={isdlogo}></img>
          <div style={{ fontSize: '16px', fontWeight: '100', width: '150px', display: 'flex', justifyContent: 'center' }}>입니다</div>
        </div>
      </div>

      <div id='scrollbarDisable' {...swipeHandler}>
        {idols.map((idol) => {
          return (
            <div
              onScroll={(e) => throttled.current(e)}
              style={{
                top: 0,
                position: 'absolute',
                width: '100vw',
                height,
                overflow: 'auto',
                opacity: idol === selectedIdol ? 1 : 0,
                zIndex: idol === selectedIdol ? 2 : 0,

                transform:
                  idol === selectedIdol
                    ? 'translateX(0px)'
                    : idols.indexOf(selectedIdol) > idols.indexOf(idol)
                    ? 'translateX(-100px)'
                    : 'translateX(100px)',
                transition: 'opacity ease 0.5s 0s, transform ease 0.5s 0s',
              }}
            >
              <IdolPage youtubes={videos && videos[idol]} idol={idol} isDark={isDark} lang={lang}></IdolPage>
            </div>
          );
        })}
      </div>

      {/* <div style={{ position: 'absolute', width: '100vw', left: 0, overflow: 'auto' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ width: '20px', flexShrink: 0 }} />
          {videos &&
            videos['gosegu']?.items.map((item) => {
              return <YouTube opts={opts} videoId={item.contentDetails.upload.videoId}></YouTube>;
            })}
          <div style={{ width: '20px', flexShrink: 0 }} />
        </div>
      </div> */}
    </div>
  );
}

export default memo(IdolScreen);
