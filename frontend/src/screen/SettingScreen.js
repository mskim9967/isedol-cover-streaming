import { IoEarth, IoMoon } from 'react-icons/io5';

import { Switch, Button } from '@nextui-org/react';
import color from '../static/color';
import HeaderText from '../component/HeaderText';
import SettingLine from '../component/SettingLine';

function SettingScreen({ lang, setLang }) {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', flexShrink: 0, gap: '20px' }}>
      <HeaderText>{{ kor: '설정', eng: 'Setting', jpn: '設定' }[lang]}</HeaderText>
      <div style={{ width: '100%', borderRadius: '10px', backgroundColor: 'white' }}>
        <SettingLine>
          <div style={{ display: 'flex', alignItems: 'center' }}>{{ kor: '언어', eng: 'Language', jpn: '言語' }[lang]}</div>
          <Button.Group ghost size='sm'>
            <Button onClick={() => setLang('kor')}>한국어</Button>
            <Button onClick={() => setLang('eng')}>Eng</Button>
            <Button onClick={() => setLang('jpn')}>日本語</Button>
          </Button.Group>
        </SettingLine>
        <SettingLine>
          <div style={{ display: 'flex', alignItems: 'center' }}>{{ kor: '다크모드', eng: 'Dark Mode', jpn: '暗いモード' }[lang]}</div>
          <Switch />
        </SettingLine>
        <SettingLine isLast>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {{ kor: '애니메이션 비활성화', eng: 'Disable Animation', jpn: 'アニメーションの無効化' }[lang]}
          </div>
          <Switch />
        </SettingLine>
      </div>
      <div
        style={{
          width: '100%',
          borderRadius: '10px',
          backgroundColor: 'white',
          padding: '20px',
          color: color.darkGray,
          fontWeight: '300',
          fontSize: '14px',
        }}
      >
        본 서비스는 공식이 아닌 팬들이 운영하는 서비스이며, 모든 커버송의 저작권은 이세계 아이돌(WAK Entertainment)에 있습니다.
      </div>

      <div
        style={{
          width: '100%',
          borderRadius: '10px',
          backgroundColor: 'white',
          padding: '20px',
          color: color.darkGray,
          fontWeight: '300',
          fontSize: '14px',
        }}
      >
        본 서비스는 비영리 목적으로 운영되며, 사용된 일러스트들은 사용 허가를 받았음을 밝힙니다. <br />
        또한, Github에서 프로젝트 소스코드를 확인하실 수 있습니다.
      </div>
    </div>
  );
}

export default SettingScreen;
