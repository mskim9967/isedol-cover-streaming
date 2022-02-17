import { useState } from 'react';
import { IoPause, IoPlay, IoPlayForward, IoPlayBack } from 'react-icons/io5';
import chan from '../static/image/segu_300_300.webp';

function MusicPlayer({ isActive, setActive }) {
  return (
    <div
      className={`musicPlayer ${isActive && 'active'}`}
      style={{
        position: 'absolute',
        zIndex: 999,
        width: '100%',
        transition: 'height ease 0.3s 0s, transform ease 0.3s 0s',
        backgroundColor: 'rgba(250, 250, 250, 0.8)',
        backdropFilter: 'blur(6px)',
        bottom: 70,
        ...(isActive ? { height: '100%', transform: 'translateY(70px)' } : { height: '66px' }),
      }}
      onClick={() => setActive(!isActive)}
    >
      <div style={{ width: '100%', height: '100%', opacity: isActive ? 0 : 1, transition: 'opacity 1s 0s' }}>
        {!isActive && (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 16px',
            }}
          >
            <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
              <img style={{ height: '50px', aspectRatio: '1/1', borderRadius: '4px' }} src={chan} />
              <div style={{ marginLeft: '14px' }}>
                <div style={{ fontSize: '16px', fontWeight: '400', marginTop: '5px' }}>정말로 사랑한다면</div>
                <div style={{ fontSize: '13px', fontWeight: '300', marginTop: '-2px' }}>고세구</div>
              </div>
            </div>
            <div style={{ height: '100%', display: 'flex', gap: 7, alignItems: 'center' }}>
              <IoPlayBack size={25} />
              <IoPlay size={35} />
              <IoPlayForward size={25} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MusicPlayer;
