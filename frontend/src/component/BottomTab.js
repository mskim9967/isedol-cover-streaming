import {
  IoMusicalNotesOutline,
  IoMusicalNotes,
  IoPlayCircleOutline,
  IoPlayCircle,
  IoPeopleOutline,
  IoPeople,
  IoSettingsOutline,
  IoSettings,
  IoListOutline,
  IoList,
} from 'react-icons/io5';
import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';
import { memo } from 'react';

function BottomTab({ screen, setScreen, isMusicPlayerActive, lang, isDark }) {
  const color = isDark ? darkColor : lightColor;
  const iconSize = 30;
  function iOSnPWA() {
    return (
      window.matchMedia('(display-mode: standalone)').matches &&
      (['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
        (navigator.userAgent.includes('Mac') && 'ontouchend' in document))
    );
  }

  return (
    <div
      className='bottomTab'
      style={{
        position: 'absolute',
        zIndex: 999,
        bottom: 0,
        height: iOSnPWA() ? '80px' : '70px',
        ...(iOSnPWA() && { paddingBottom: '15px' }),
        width: '100%',
        borderTop: `solid 1px ${color.lightGray}`,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        backgroundColor: 'transparent',
        transition: 'transform ease 0.3s 0s',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        fontSize: 12,
        color: color.darkGray,
        ...(isMusicPlayerActive && { transform: 'translateY(70px)' }),
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          ...(screen === 'playlist' && { color: color.isedol, fontWeight: '500' }),
        }}
        onClick={() => setScreen('playlist')}
      >
        {screen === 'playlist' ? <IoPlayCircle size={iconSize} /> : <IoPlayCircleOutline size={iconSize} />}
        <div style={{ marginTop: 2 }}>{{ kor: '재생 목록', eng: 'Playlist', jpn: '再生リスト' }[lang]}</div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          ...(screen === 'music' && { color: color.isedol, fontWeight: '500' }),
        }}
        onClick={() => setScreen('music')}
      >
        {screen === 'music' ? <IoMusicalNotes size={iconSize} /> : <IoMusicalNotesOutline size={iconSize} />}
        <div style={{ marginTop: 2 }}>{{ kor: '커버곡', eng: 'Cover Song', jpn: 'カバー曲' }[lang]}</div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          ...(screen === 'idol' && { color: color.isedol, fontWeight: '500' }),
        }}
        onClick={() => setScreen('idol')}
      >
        {screen === 'idol' ? <IoPeople size={iconSize} /> : <IoPeopleOutline size={iconSize} />}
        <div style={{ marginTop: 2 }}>{{ kor: '이세돌', eng: 'Isegye Idol', jpn: 'イセドル' }[lang]}</div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          ...(screen === 'setting' && { color: color.isedol, fontWeight: '500' }),
        }}
        onClick={() => setScreen('setting')}
      >
        {screen === 'setting' ? <IoSettings size={iconSize} /> : <IoSettingsOutline size={iconSize} />}
        <div style={{ marginTop: 2 }}>{{ kor: '설정', eng: 'Setting', jpn: '設定' }[lang]}</div>
      </div>
    </div>
  );
}

export default memo(BottomTab);
