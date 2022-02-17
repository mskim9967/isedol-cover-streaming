import color from '../static/color';
import PlaylistCard from '../component/PlaylistCard';

function PlaylistScreen() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', flexShrink: 0, gap: '20px' }}>
      <div style={{ borderBottom: `solid 1px ${color.lightGray}`, paddingBottom: '7px' }}>
        <div style={{ fontSize: '32px', fontWeight: '600', letterSpacing: '-0.6px' }}>재생 목록</div>
      </div>

      <div>
        <div style={{ fontSize: '19px', fontWeight: '500', letterSpacing: '-0.6px' }}>아이돌 별 추천</div>
        <div style={{ margin: '0px -20px', padding: '0px 20px', left: 0, width: '100vw', display: 'flex', gap: '10px', overflow: 'auto' }}>
          <PlaylistCard idol={'segu'} />
          <PlaylistCard idol={'ine'} />
          <PlaylistCard idol={'chan'} />
          <PlaylistCard idol={'jing'} />
          <PlaylistCard idol={'ruru'} />
          <PlaylistCard idol={'lilpa'} />
        </div>
      </div>

      <div>
        <div style={{ fontSize: '19px', fontWeight: '500', letterSpacing: '-0.6px' }}>아이돌 별 추천</div>
        <div style={{ margin: '0px -20px', padding: '0px 20px', left: 0, width: '100vw', display: 'flex', gap: '10px', overflow: 'auto' }}>
          <PlaylistCard idol={'segu'} />
          <PlaylistCard idol={'ine'} />
          <PlaylistCard idol={'chan'} />
          <PlaylistCard idol={'jing'} />
          <PlaylistCard idol={'ruru'} />
          <PlaylistCard idol={'lilpa'} />
        </div>
      </div>
      <div>
        <div style={{ fontSize: '19px', fontWeight: '500', letterSpacing: '-0.6px' }}>아이돌 별 추천</div>
        <div style={{ margin: '0px -20px', padding: '0px 20px', left: 0, width: '100vw', display: 'flex', gap: '10px', overflow: 'auto' }}>
          <PlaylistCard idol={'segu'} />
          <PlaylistCard idol={'ine'} />
          <PlaylistCard idol={'chan'} />
          <PlaylistCard idol={'jing'} />
          <PlaylistCard idol={'ruru'} />
          <PlaylistCard idol={'lilpa'} />
        </div>
      </div>
    </div>
  );
}

export default PlaylistScreen;
