import color from '../static/color';

function HeaderText({ children }) {
  return (
    <div style={{ borderBottom: `solid 1px ${color.lightGray}`, paddingBottom: '7px' }}>
      <div style={{ fontSize: '32px', fontWeight: '600', letterSpacing: '-0.6px' }}>{children}</div>
    </div>
  );
}

export default HeaderText;
