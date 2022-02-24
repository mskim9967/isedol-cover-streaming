import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';

function SettingLine({ children, isLast, isDark }) {
  const color = isDark ? darkColor : lightColor;

  return (
    <div
      style={{
        height: '48px',
        width: '100%',
        padding: '0 16px 0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontWeight: '500',
        fontSize: '16px',
        ...(!isLast && { borderBottom: `solid 0.5px ${color.lightGray}` }),
      }}
    >
      {children}
    </div>
  );
}

export default SettingLine;
