import { useEffect, useState, memo } from 'react';
import { useSwipeable } from 'react-swipeable';

import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';
import { axiosInstance } from '../axiosInstance';
import { IoLogoYoutube, IoLogoTwitch, IoLogoTwitter, IoLogoInstagram, IoLogoSoundcloud, IoPlay } from 'react-icons/io5';

const member = {
  ine: { kor: '아이네', eng: 'INE', jpn: 'アイネ' },
  jingburger: { kor: '징버거', eng: 'JINGBURGER', jpn: 'ジンバーガー' },
  lilpa: { kor: '릴파', eng: 'LILPA', jpn: 'リルパ' },
  jururu: { kor: '주르르', eng: 'JURURU', jpn: 'ジュルル' },
  gosegu: { kor: '고세구', eng: 'GOSEGU', jpn: 'ゴセグ' },
  viichan: { kor: '비챤', eng: 'VIICHAN', jpn: 'ゔぃちゃん' },
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

const snss = ['twitch', 'youtube', 'instagram', 'twitter', 'soundCloud'];

function IdolCard({ idol, isDark, lang, youtubes }) {
  const color = isDark ? darkColor : lightColor;

  const swipeHandler = useSwipeable({
    onSwiped: ({ event }) => {
      event.stopPropagation();
    },
  });

  return (
    <div style={{ padding: '120px 20px 200px 20px', width: '100%', display: 'flex', flexDirection: 'column', gap: 30 }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontSize: '15px', fontWeight: '200', opacity: '60%', paddingBottom: '24px' }}>
          {
            {
              ine: '으으으으음~ 하이네!',
              jingburger: '승장↗형 아이도↗루 징~바가~',
              lilpa: '에블바디 세이~ 릴하릴하!',
              jururu: '참을 수 없어욧!',
              gosegu: '감사합니다~ 킹~아!',
              viichan: '자꾸 나를 꼬시잖아~',
            }[idol]
          }
        </div>
        <img
          src={require(`../static/image/profile_${idol}.png`)}
          style={{
            width: '70%',
            maxWidth: '300px',
            boxShadow: `0px 16px 13px -20px ${color.shadow}`,
            borderRadius: '30px',
          }}
        />
        <div
          style={{
            marginTop: '25px',
            padding: '0 24px',
            height: '50px',
            borderRadius: '25px 5px 25px 15px',
            backgroundColor: eval(`color.${idol}`),
            fontSize: '28px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            color: '#ffffff',
            boxShadow: `0px 3px 10px -5px ${color.shadow}`,
          }}
        >
          {member[idol]['kor']}
          <div style={{ fontSize: '14px', fontWeight: '300', marginLeft: '10px', display: 'flex', flexDirection: 'column', marginTop: '2px' }}>
            <div>{member[idol]['eng']}</div>
            <div style={{ marginTop: '-6px' }}> {member[idol]['jpn']}</div>
          </div>
        </div>
        <div style={{ marginTop: '30px', display: 'flex', gap: 16 }}>
          {snss.map((sns) => {
            return (
              <>
                {snsLink[idol][sns] && (
                  <div
                    style={{
                      height: '50px',
                      width: '50px',
                      borderRadius: '50%',
                      ...(sns !== 'instagram'
                        ? { backgroundColor: eval(`color.${sns}`) }
                        : { background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }),
                      boxShadow: `0px 3px 10px -5px ${color.shadow}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={() => {
                      window.open(snsLink[idol][sns], '_blank');
                    }}
                  >
                    {sns === 'twitch' ? (
                      <IoLogoTwitch size={25} color={'#ffffff'} />
                    ) : sns === 'youtube' ? (
                      <IoLogoYoutube size={25} color={'#ffffff'} />
                    ) : sns === 'instagram' ? (
                      <IoLogoInstagram size={25} color={'#ffffff'} />
                    ) : sns === 'twitter' ? (
                      <IoLogoTwitter size={25} color={'#ffffff'} />
                    ) : (
                      <IoLogoSoundcloud style={{ marginTop: -1 }} size={28} color={'#ffffff'} />
                    )}
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
      <div>
        <div style={{ fontWeight: '500', fontSize: '23px', color: color.textBlack, opacity: '97%', marginBottom: '3px' }}>
          최근 영상 보기
          <div style={{ marginLeft: '4px', fontWeight: '100', fontSize: '18px', display: 'inline-block' }}>Recent videos</div>
        </div>

        <div {...swipeHandler} style={{ position: 'absolute', width: '100vw', left: 0, overflow: 'auto' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <div style={{ width: '20px', flexShrink: 0 }} />
            {youtubes &&
              youtubes?.items?.map((item) => {
                return (
                  <div
                    className='playlistCard'
                    style={{
                      position: 'relative',
                      width: '213.3px',
                      height: '120px',
                      flexShrink: 0,
                      background: `linear-gradient(#00000055, #00000055), url(${item?.snippet?.thumbnails?.medium?.url})`,
                      backgroundSize: 'contain',
                      borderRadius: '20px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onClick={() => window.open(`https://youtu.be/${item?.contentDetails.upload.videoId}`, '_blank')}
                  >
                    <div
                      style={{
                        color: '#ffffff',
                        textShadow: '0.6px 0.6px 1.5px #000000',
                        fontWeight: '600',
                        padding: '6px 12px',
                        wordBreak: 'break-all',
                        fontSize: '15px',
                        letterSpacing: '-0.3px',
                        lineHeight: '16px',
                      }}
                    >
                      {item?.snippet?.title}
                    </div>
                  </div>
                );
              })}
            <div style={{ width: '20px', flexShrink: 0 }} />
          </div>
        </div>
      </div>
      <div style={{ height: '90px' }} />
    </div>
  );
}

export default memo(IdolCard);
