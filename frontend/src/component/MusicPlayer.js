import { IoPlay, IoPlayForward, IoPlayBack, IoChevronDown } from 'react-icons/io5';
import { useSwipeable } from 'react-swipeable';

import MusicPlay from './MusicPlay';
import chan from '../static/image/segu_300_300.webp';
import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';
import { Button } from '@nextui-org/react';

function MusicPlayer({ isActive, setActive, isDark }) {
  const color = isDark ? darkColor : lightColor;

  const swipeHandler = useSwipeable({
    onSwipedDown: () => {
      setActive(false);
    },
    onSwipedUp: () => {
      setActive(true);
    },
  });

  return (
    <div
      {...swipeHandler}
      style={{
        position: 'absolute',
        zIndex: 999,
        width: '100%',
        transition: 'height ease 0.3s 0s, transform ease 0.3s 0s',
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        bottom: 70,
        ...(isActive ? { height: '100%', transform: 'translateY(70px)' } : { height: '66px' }),
      }}
      onClick={() => {
        if (!isActive) setActive(true);
      }}
    >
      <div style={{ width: '100%', height: '100%', opacity: isActive ? 0 : 1, transition: 'opacity 0.7s 0s' }}>
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
              <img style={{ height: '47px', aspectRatio: '1/1', borderRadius: '4px' }} src={chan} />
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
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: isActive ? 1 : 0, transition: 'opacity 0.3s 0s' }}>
        <div style={{ position: 'absolute', top: 13, right: 13 }}>
          <Button
            onClick={() => setActive(false)}
            style={{ height: '40px' }}
            size='xs'
            auto
            light
            icon={<IoChevronDown size={30} color={color.darkGray} />}
          />
        </div>

        <MusicPlay isActive={isActive} setActive={setActive} isDark={isDark} />
      </div>
    </div>
  );
}

export default MusicPlayer;
