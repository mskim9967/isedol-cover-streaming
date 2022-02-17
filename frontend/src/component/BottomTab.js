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
import color from '../static/color';

function BottomTab({ screen, setScreen, isMusicPlayerActive }) {
  const iconSize = 30;
  return (
    <div
      className='bottomTab'
      style={{
        position: 'absolute',
        zIndex: 999,
        bottom: 0,
        height: '70px',
        width: '100%',
        borderTop: `solid 1px ${color.lightGray}`,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        backgroundColor: 'rgba(250, 250, 250, 0.8)',
        transition: 'transform ease 0.3s 0s',
        backdropFilter: 'blur(6px)',
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
        <div style={{ marginTop: 2 }}>재생 목록</div>
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
        <div style={{ marginTop: 2 }}>커버곡</div>
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
        <div style={{ marginTop: 2 }}>이세돌</div>
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
        <div style={{ marginTop: 2 }}>설정</div>
      </div>
    </div>
  );
}

export default BottomTab;
