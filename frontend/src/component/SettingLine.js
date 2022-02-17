import color from '../static/color';

function SettingLine({ children, isLast }) {
  return (
    <div
      style={{
        height: '48px',
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
