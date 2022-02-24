import { useEffect } from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';

import { Switch, Button } from '@nextui-org/react';
import HeaderText from '../component/HeaderText';
import SettingLine from '../component/SettingLine';

import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';

function SettingScreen({ lang, setLang, isDark, setDark, anim, setAnim, imgDisable, setImgDisable }) {
  const color = isDark ? darkColor : lightColor;

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', flexShrink: 0, gap: '20px' }}>
      <HeaderText isDark={isDark}>{{ kor: '설정', eng: 'Setting', jpn: '設定' }[lang]}</HeaderText>
      <div style={{ width: '100%', borderRadius: '10px', backgroundColor: color.settingBg }}>
        <SettingLine isDark={isDark}>
          <div style={{ display: 'flex', alignItems: 'center' }}>{{ kor: '언어', eng: 'Language', jpn: '言語' }[lang]}</div>
          <Button.Group color='error' ghost borderWeight='light' size='sm'>
            <Button onClick={() => setLang('kor')}>한국어</Button>
            <Button onClick={() => setLang('eng')}>Eng</Button>
            <Button onClick={() => setLang('jpn')}>日本語</Button>
          </Button.Group>
        </SettingLine>
        <SettingLine isDark={isDark}>
          <div style={{ display: 'flex', alignItems: 'center' }}>{{ kor: '다크 모드', eng: 'Dark mode', jpn: '暗いモード' }[lang]}</div>
          <Switch
            bordered={isDark}
            color='error'
            initialChecked={isDark}
            onChange={() => {
              setDark(!isDark);
            }}
          />
        </SettingLine>
        <SettingLine isDark={isDark}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {{ kor: '애니메이션 비활성화', eng: 'Disable animation', jpn: 'アニメーションの無効化' }[lang]}
          </div>
          <Switch
            bordered={isDark}
            color='error'
            initialChecked={!anim}
            onChange={() => {
              setAnim(!anim);
            }}
            color='error'
          />
        </SettingLine>
        <SettingLine isDark={isDark} isLast>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {{ kor: '일러스트 숨기기', eng: 'Hide illustration', jpn: 'イラスト非表示' }[lang]}
          </div>
          <Switch
            bordered={isDark}
            color='error'
            initialChecked={imgDisable}
            onChange={() => {
              setImgDisable(!imgDisable);
            }}
          />
        </SettingLine>
      </div>

      <div style={{ width: '100%', borderRadius: '10px', backgroundColor: color.settingBg }}>
        <SettingLine isDark={isDark}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {{ kor: '앱으로 설치', eng: 'Install App', jpn: 'アプリケーションのインストール' }[lang]}
          </div>
          <IoChevronForwardOutline onClick={() => {}} />
        </SettingLine>
        <SettingLine isDark={isDark} isLast>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {{ kor: '수동 설치 방법', eng: 'How to install manually', jpn: '手動取付方法' }[lang]}
          </div>
          <IoChevronForwardOutline />
        </SettingLine>
      </div>

      <div style={{ width: '100%', borderRadius: '10px', backgroundColor: color.settingBg }}>
        <SettingLine isDark={isDark} isLast>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {{ kor: '저장된 데이터 지우기', eng: 'Clear saved data', jpn: '保存されたデータを削除' }[lang]}
          </div>
          <IoChevronForwardOutline
            onClick={() => {
              if (
                window.confirm(
                  {
                    kor: '브라우저에 저장된 관련 데이터를 모두 지웁니다',
                    eng: 'Erase all relevant data stored in your browser',
                    jpn: 'ブラウザに保存された関連データをすべて削除します',
                  }[lang]
                )
              )
                localStorage.clear();
            }}
          />
        </SettingLine>
      </div>

      <div
        style={{
          width: '100%',
          borderRadius: '10px',
          backgroundColor: color.settingBg,
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
          backgroundColor: color.settingBg,
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
