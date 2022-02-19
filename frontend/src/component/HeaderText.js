import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';

function HeaderText({ children, isDark }) {
  const color = isDark ? darkColor : lightColor;

  return (
    <div style={{ borderBottom: `solid 1px ${color.lightGray}`, paddingBottom: '7px' }}>
      <div style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '-0.6px' }}>{children}</div>
    </div>
  );
}

export default HeaderText;
