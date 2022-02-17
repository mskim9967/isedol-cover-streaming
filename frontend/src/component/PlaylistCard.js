import { useState } from 'react';
import { IoPause, IoPlay, IoPlayForward, IoPlayBack } from 'react-icons/io5';
import segu from '../static/image/segu_300_300.webp';
import chan from '../static/image/chan_300_300.webp';
import ruru from '../static/image/ruru_300_300.webp';
import lilpa from '../static/image/lilpa_300_300.webp';
import jing from '../static/image/jing_300_300.webp';
import ine from '../static/image/ine_300_300.webp';
import color from '../static/color';

const imgMap = {
  segu,
  chan,
  ruru,
  lilpa,
  jing,
  ine,
};

const colorMap = {
  segu: color.segu,
  chan: color.chan,
  ruru: color.ruru,
  lilpa: color.lilpa,
  jing: color.jing,
  ine: color.ine,
};

const nameMap = {
  segu: '고세구',
  chan: '비챤',
  ruru: '주르르',
  lilpa: '릴파',
  jing: '징버거',
  ine: '아이네',
};

function PlaylistCard({ idol }) {
  return (
    <div
      style={{
        width: '200px',
        margin: '10px 0',
        flexShrink: 0,
        borderRadius: '7px',
        boxShadow: `2px 2px 10px -5px ${color.shadow}`,
        overflow: 'hidden',
        backgroundColor: colorMap[idol],
      }}
    >
      <img style={{ width: '100%', aspectRatio: '1/1' }} src={imgMap[idol]} />
      <div
        style={{
          width: '100%',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color.textWhite,
          fontWeight: '500',
          fontSize: '14px',
        }}
      >
        {`${nameMap[idol]}의 플레이리스트`}
      </div>
    </div>
  );
}

export default PlaylistCard;
