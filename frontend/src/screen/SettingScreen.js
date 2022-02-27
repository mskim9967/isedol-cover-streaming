import { useEffect, useState, memo } from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { IoLogoAndroid, IoLogoChrome } from 'react-icons/io';

import { Switch, Button, Modal } from '@nextui-org/react';
import HeaderText from '../component/HeaderText';
import SettingLine from '../component/SettingLine';

import ios1 from '../static/image/ios1.png';
import ios2 from '../static/image/ios2.png';
import and1 from '../static/image/and1.png';
import and2 from '../static/image/and2.png';
import com1 from '../static/image/com1.png';

import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';

function SettingScreen({ lang, setLang, isDark, setDark, anim, setAnim, imgDisable, setImgDisable }) {
  const color = isDark ? darkColor : lightColor;
  const [prompt, setPrompt] = useState();
  const [isModalActive, setModalActive] = useState();
  const [modalContent, setModalContent] = useState();

  useEffect(() => {
    const handle_storePrompt = (e) => {
      e.preventDefault();
      setPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', (e) => handle_storePrompt(e));

    return () => {
      window.removeEventListener('beforeinstallprompt', (e) => handle_storePrompt(e));
    };
  }, []);

  const handle_prompt = () => {
    prompt.prompt();
    setPrompt(null);
  };

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
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {{ kor: '앱으로 설치', eng: 'Install App', jpn: 'アプリケーションのインストール' }[lang]}
            <IoLogoAndroid size={27} />
            <IoLogoChrome size={21} />
          </div>
          <IoChevronForwardOutline onClick={handle_prompt} />
        </SettingLine>

        <SettingLine isDark={isDark} isLast>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {{ kor: '수동 설치 방법', eng: 'How to install manually', jpn: '手動取付方法' }[lang]}
          </div>
          <IoChevronForwardOutline
            onClick={() => {
              setModalContent('install');
              setModalActive(true);
            }}
          />
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
              ) {
                localStorage.clear();
                window.location.reload(true);
              }
            }}
          />
        </SettingLine>
      </div>

      <div style={{ width: '100%', borderRadius: '10px', backgroundColor: color.settingBg }}>
        <SettingLine isDark={isDark}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {
              { kor: '서비스 운영에 도움을 주신 분들', eng: 'People who helped running this service', jpn: 'サービスの運営にご協力いただいた方' }[
                lang
              ]
            }
          </div>
          <IoChevronForwardOutline onClick={() => {}} />
        </SettingLine>
        <SettingLine isDark={isDark} isLast>
          <div style={{ display: 'flex', alignItems: 'center' }}>{{ kor: '일러스트 출처', eng: 'Illust from', jpn: 'イラスト出典' }[lang]}</div>
          <IoChevronForwardOutline
            onClick={() => {
              setModalContent('illust');
              setModalActive(true);
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
        업데이트 요청, 정보 수정 요청, 기타 문의사항은 아래 이메일 주소로 자유롭게 연락 바랍니다.
        <br />
        <a href='mailto:isgplay.com@gmail.com'>isgplay.com@gmail.com</a>
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
        본 서비스는 비영리 목적으로 운영되는 비공식 서비스이며, 모든 일러스트들은 원작자로부터 사용 허가를 받았음을 밝힙니다.
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
          wordBreak: 'break-all',
        }}
      >
        <a href='https://github.com/mskim9967/isedol-cover-streaming'>
          The MIT License (MIT)
          <br />
          Copyright ⓒ 2022 isgplay
        </a>
      </div>

      <Modal
        css={{
          backgroundColor: isDark ? '#1c1c1c' : '#ffffff',
          width: '95%',
          maxWidth: '900px',
          margin: '0 auto',
          color: color.textBlack,
        }}
        closeButton
        animated={anim}
        open={isModalActive}
        onClose={() => setModalActive(false)}
      >
        {modalContent === 'install' && (
          <div
            style={{
              width: '100%',
              padding: '3px 20px 20px 20px',
              backgroundColor: isDark ? '#1c1c1c' : '#ffffff',
              display: 'flex',
              gap: 4,
              flexDirection: 'column',
              alignItems: 'center',
              maxHeight: '80vh',
              overflow: 'auto',
              fontSize: '20px',
              fontWeight: '500',
              gap: 50,
            }}
          >
            <div>
              <div style={{ marginBottom: '6px' }}>iOS & Safari</div>
              <img
                style={{
                  width: '90%',
                  borderRadius: '6%',
                }}
                src={ios1}
              />
              <img
                style={{
                  width: '90%',
                  borderRadius: '6%',
                }}
                src={ios2}
              />
            </div>

            <div>
              <div style={{ marginBottom: '6px' }}>Android & Chrome</div>
              <img
                style={{
                  width: '90%',
                  borderRadius: '6%',
                }}
                src={and1}
              />
              <img
                style={{
                  width: '90%',
                  borderRadius: '6%',
                }}
                src={and2}
              />
            </div>

            <div>
              <div style={{ marginBottom: '6px' }}>Windows/MacOS & Chrome</div>
              <img
                style={{
                  width: '90%',
                  borderRadius: '6%',
                }}
                src={com1}
              />
            </div>
          </div>
        )}

        {modalContent === 'illust' && (
          <div
            style={{
              width: '100%',
              padding: '3px 20px 20px 20px',
              backgroundColor: isDark ? '#1c1c1c' : '#ffffff',
              display: 'flex',
              gap: 4,
              flexDirection: 'column',
              alignItems: 'center',
              maxHeight: '80vh',
              overflow: 'auto',
              fontSize: '17px',
              fontWeight: '300',
              gap: 10,
            }}
          >
            <div>
              이세돌 일러스트 by{' '}
              <a
                target='_blank'
                href='https://cafe.naver.com/steamindiegame?iframe_url_utf8=%2FArticleRead.nhn%253Fclubid%3D27842958%2526articleid%3D3996346%2526commentFocus%3Dtrue'
              >
                여비날
              </a>
            </div>
            <div>
              이세돌 로고 일러스트 by{' '}
              <a
                target='_blank'
                href='https://cafe.naver.com/steamindiegame?iframe_url_utf8=%2FArticleRead.nhn%253Fclubid%3D27842958%2526articleid%3D4037158%2526commentFocus%3Dtrue'
              >
                허리
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default memo(SettingScreen);
