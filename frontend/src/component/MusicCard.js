import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';
import segu from '../static/image/segu_300_300.webp';
import chan from '../static/image/chan_300_300.webp';
import ruru from '../static/image/ruru_300_300.webp';
import lilpa from '../static/image/lilpa_300_300.webp';
import jing from '../static/image/jing_300_300.webp';
import ine from '../static/image/ine_300_300.webp';
import { MdOutlinePlaylistAdd } from 'react-icons/md';
import { IoPause, IoPlay, IoPlayForward, IoPlayBack, IoHeartOutline, IoHeart, IoChevronDown } from 'react-icons/io5';

import { Button } from '@nextui-org/react';

function MusicCard({ lang, isDark }) {
  const color = isDark ? darkColor : lightColor;

  return (
    <div
      style={{
        height: '72px',
        padding: '8px 8px',
        borderBottom: `solid 0.5px ${color.lightGray}`,
      }}
    >
      <div style={{ height: '100%', float: 'left', display: 'flex', alignItems: 'center' }}>
        <img style={{ height: '100%', aspectRatio: '1/1', borderRadius: '3px', marginRight: '12px' }} src={ine} />
        <div>
          <div style={{ fontWeight: '400', fontSize: '16px', color: color.textDarkBlack }}>부엉이</div>
          <div style={{ marginTop: '-3px', fontWeight: '400', fontSize: '13px', color: color.darkGray }}>아이네 / Kokia</div>
        </div>
      </div>
      <div style={{ height: '100%', float: 'right', display: 'flex', alignItems: 'center' }}>
        <Button style={{ height: '90%' }} size='xs' auto light icon={<MdOutlinePlaylistAdd color={color.darkGray} size={25} />} />
        <Button style={{ height: '90%' }} size='xs' auto light icon={<IoPlay color={color.darkGray} size={24} />} />
      </div>
    </div>
  );
}

export default MusicCard;
