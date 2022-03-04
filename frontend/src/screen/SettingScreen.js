import { useEffect, useState, memo } from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { IoLogoAndroid, IoLogoChrome } from 'react-icons/io';

import { Switch, Button, Modal, Input, Loading } from '@nextui-org/react';
import HeaderText from '../component/HeaderText';
import SettingLine from '../component/SettingLine';

import ios1 from '../static/image/ios1.png';
import ios2 from '../static/image/ios2.png';
import and1 from '../static/image/and1.png';
import and2 from '../static/image/and2.png';
import com1 from '../static/image/com1.png';

import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';

function SettingScreen({ lang, setLang, isDark, setDark, anim, setAnim, imgDisable, setImgDisable, audio, audioControl }) {
  const color = isDark ? darkColor : lightColor;
  const [prompt, setPrompt] = useState();
  const [isModalActive, setModalActive] = useState();
  const [modalContent, setModalContent] = useState();
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(30);
  const [isTimerStart, setTimerStart] = useState(false);
  const [leftMinute, setLeftMinute] = useState(0);
  const [leftHour, setLeftHour] = useState(0);

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

  let timerId;
  useEffect(() => {
    if (isTimerStart) {
      let now = new Date();
      setLeftMinute((now.getMinutes() + minute || 0) % 60);
      setLeftHour((now.getHours() + (hour || 0) + Math.floor((now.getMinutes() + (minute || 0)) / 60)) % 24);

      timerId = setTimeout(() => {
        audio.current.pause();
        audioControl.pause();
        setTimerStart(false);
      }, 1000 * 60 * ((minute || 0) + (hour || 0) * 60));
    } else {
      clearInterval(timerId);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [isTimerStart]);

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
          <div style={{ display: 'flex', alignItems: 'center' }}>{{ kor: '다크 모드', eng: 'Dark mode', jpn: 'ダークモード' }[lang]}</div>
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
        <SettingLine isDark={isDark}>
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
        <SettingLine isDark={isDark} isLast>
          <div style={{ display: 'flex', alignItems: 'center' }}>{{ kor: '종료 예약', eng: 'Timer', jpn: '終了予約' }[lang]}</div>
          {isTimerStart ? (
            <div
              style={{}}
              onClick={() => {
                setModalContent('timer');
                setModalActive(true);
              }}
            >
              {leftHour < 9 && '0'}
              {leftHour}:{leftMinute < 9 && '0'}
              {leftMinute}
            </div>
          ) : (
            <IoChevronForwardOutline
              style={{ height: '100%', width: '30px', padding: '0 0 0 13px' }}
              onClick={() => {
                setModalContent('timer');
                setModalActive(true);
              }}
            />
          )}
        </SettingLine>
      </div>

      <div style={{ width: '100%', borderRadius: '10px', backgroundColor: color.settingBg }}>
        <SettingLine isDark={isDark}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {{ kor: '앱으로 설치', eng: 'Install App', jpn: 'アプリケーションのインストール' }[lang]}
            <IoLogoAndroid size={27} />
            <IoLogoChrome size={21} />
          </div>
          <IoChevronForwardOutline style={{ height: '100%', width: '30px', padding: '0 0 0 13px' }} onClick={handle_prompt} />
        </SettingLine>

        <SettingLine isDark={isDark} isLast>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {{ kor: '수동 설치 방법', eng: 'How to install manually', jpn: '手動取付方法' }[lang]}
          </div>
          <IoChevronForwardOutline
            style={{ height: '100%', width: '30px', padding: '0 0 0 13px' }}
            onClick={() => {
              setModalContent('install');
              setModalActive(true);
            }}
          />
        </SettingLine>
      </div>

      <div style={{ width: '100%', borderRadius: '10px', backgroundColor: color.settingBg }}>
        <SettingLine isDark={isDark}>
          <div style={{ display: 'flex', alignItems: 'center' }}>{{ kor: '캐시 지우기', eng: 'Clear cache', jpn: 'キャッシュ消去' }[lang]}</div>
          <IoChevronForwardOutline
            style={{ height: '100%', width: '30px', padding: '0 0 0 13px' }}
            onClick={() => {
              window.location.reload(true);
            }}
          />
        </SettingLine>
        <SettingLine isDark={isDark} isLast>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {{ kor: '저장된 데이터 지우기', eng: 'Clear saved data', jpn: '保存されたデータを削除' }[lang]}
          </div>
          <IoChevronForwardOutline
            style={{ height: '100%', width: '30px', padding: '0 0 0 13px' }}
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
          <IoChevronForwardOutline style={{ height: '100%', width: '30px', padding: '0 0 0 13px' }} onClick={() => {}} />
        </SettingLine>
        <SettingLine isDark={isDark} isLast>
          <div style={{ display: 'flex', alignItems: 'center' }}>{{ kor: '일러스트 출처', eng: 'Illust from', jpn: 'イラスト出典' }[lang]}</div>
          <IoChevronForwardOutline
            style={{ height: '100%', width: '30px', padding: '0 0 0 13px' }}
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
        <a target='_blank' href='mailto:isgplay.com@gmail.com'>
          isgplay.com@gmail.com
        </a>
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
        <a target='_blank' href='https://github.com/mskim9967/isedol-cover-streaming/blob/main/LICENSE'>
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
              <a target='_blank' href='https://cafe.naver.com/steamindiegame/3996346'>
                여비날
              </a>
            </div>
            <div>
              이세돌 로고 일러스트 by{' '}
              <a target='_blank' href='https://cafe.naver.com/steamindiegame/4037158'>
                허리
              </a>
            </div>
          </div>
        )}

        {modalContent === 'timer' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0 25px 0', gap: 3 }}>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {!isTimerStart ? (
                <div
                  style={{
                    display: 'inline-block',
                    color: color.textBlack,
                    fontSize: '22px',
                    height: '36px',
                    fontWeight: '400',
                    marginRight: '6px',
                  }}
                >
                  <input
                    disabled={isTimerStart}
                    type='number'
                    value={Number(hour)}
                    onChange={(e) => {
                      if (e.target.value.length <= 1 && /^\d+$/.test(e.target.value) && e.target.value >= 0 && e.target.value <= 9)
                        setHour(Number(e.target.value));
                      else setHour();
                    }}
                    style={{
                      background: 'none',
                      color: color.isedol,
                      fontSize: '22px',
                      fontWeight: '600',
                      width: '32.5px',
                      borderRadius: '10px',
                      padding: '0 7px',
                      marginRight: '4px',
                      border: `1px solid ${color.isedol}`,
                    }}
                  />
                  {{ kor: '시간', eng: 'hours', jpn: '時間' }[lang]}
                  <input
                    disabled={isTimerStart}
                    type='number'
                    value={Number(minute)}
                    onChange={(e) => {
                      if (e.target.value.length <= 2 && /^\d+$/.test(e.target.value) && e.target.value >= 0 && e.target.value < 60)
                        setMinute(Number(e.target.value));
                      else setMinute();
                    }}
                    style={{
                      background: 'none',
                      color: color.isedol,
                      fontSize: '22px',
                      fontWeight: '600',
                      width: '43px',
                      borderRadius: '10px',
                      padding: '0 7px',
                      marginLeft: '7px',
                      marginRight: '4px',
                      border: `1px solid ${color.isedol}`,
                    }}
                  />
                  {{ kor: '분 후 종료', eng: 'minutes', jpn: '分後終了' }[lang]}
                </div>
              ) : (
                <>
                  <div
                    style={{
                      color: color.textBlack,
                      fontSize: '21px',
                      fontWeight: '400',
                      marginRight: '6px',
                    }}
                  >
                    {{ kor: '종료 시각', eng: 'End time', jpn: '終了時刻' }[lang]}
                  </div>
                  <div
                    style={{
                      color: color.isedol,
                      fontSize: '25px',
                      fontWeight: '500',
                      padding: 0,
                    }}
                  >
                    {leftHour < 9 && '0'}
                    {leftHour}
                    {{ kor: '시 ', eng: ':', jpn: '時 ' }[lang]}
                    {leftMinute < 9 && '0'}
                    {leftMinute}
                    {{ kor: '분', eng: '', jpn: '分' }[lang]}
                  </div>
                </>
              )}
            </div>
            <div
              style={{
                color: color.textBlack,
                opacity: '70%',
                fontSize: '14px',
                fontWeight: '300',
                marginTop: '8px',
              }}
            >
              {
                {
                  kor: '새로고침 시 타이머가 초기화 됩니다',
                  eng: 'Timer is initialized when refreshing',
                  jpn: 'リフレッシュする時にタイマーが初期化されます',
                }[lang]
              }
            </div>
            <Button
              style={{ height: '34px', marginTop: '12px' }}
              auto
              size='sm'
              color={'error'}
              onClick={() => {
                setTimerStart(!isTimerStart);
              }}
            >
              {isTimerStart && <Loading type='points-opacity' color='white' size='sm' style={{ marginRight: '7px' }} />}

              {isTimerStart
                ? { kor: '타이머 중지', jpn: `タイマー 止め`, eng: `Stop Timer` }[lang]
                : { kor: '타이머 시작', jpn: `タイマースタート`, eng: `Start Timer` }[lang]}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default memo(SettingScreen);
