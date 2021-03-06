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
      <HeaderText isDark={isDark}>{{ kor: '??????', eng: 'Setting', jpn: '??????' }[lang]}</HeaderText>
      <div style={{ width: '100%', borderRadius: '10px', backgroundColor: color.settingBg }}>
        <SettingLine isDark={isDark}>
          <div style={{ display: 'flex', alignItems: 'center' }}>{{ kor: '??????', eng: 'Language', jpn: '??????' }[lang]}</div>
          <Button.Group color='error' ghost borderWeight='light' size='sm'>
            <Button onClick={() => setLang('kor')}>?????????</Button>
            <Button onClick={() => setLang('eng')}>Eng</Button>
            <Button onClick={() => setLang('jpn')}>?????????</Button>
          </Button.Group>
        </SettingLine>
        <SettingLine isDark={isDark}>
          <div style={{ display: 'flex', alignItems: 'center' }}>{{ kor: '?????? ??????', eng: 'Dark mode', jpn: '??????????????????' }[lang]}</div>
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
            {{ kor: '??????????????? ????????????', eng: 'Disable animation', jpn: '?????????????????????????????????' }[lang]}
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
            {{ kor: '???????????? ?????????', eng: 'Hide illustration', jpn: '?????????????????????' }[lang]}
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
          <div style={{ display: 'flex', alignItems: 'center' }}>{{ kor: '?????? ??????', eng: 'Timer', jpn: '????????????' }[lang]}</div>
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
            {{ kor: '????????? ??????', eng: 'Install App', jpn: '?????????????????????????????????????????????' }[lang]}
            <IoLogoAndroid size={27} />
            <IoLogoChrome size={21} />
          </div>
          <IoChevronForwardOutline style={{ height: '100%', width: '30px', padding: '0 0 0 13px' }} onClick={handle_prompt} />
        </SettingLine>

        <SettingLine isDark={isDark} isLast>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {{ kor: '?????? ?????? ??????', eng: 'How to install manually', jpn: '??????????????????' }[lang]}
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
          <div style={{ display: 'flex', alignItems: 'center' }}>{{ kor: '?????? ?????????', eng: 'Clear cache', jpn: '?????????????????????' }[lang]}</div>
          <IoChevronForwardOutline
            style={{ height: '100%', width: '30px', padding: '0 0 0 13px' }}
            onClick={() => {
              window.location.reload(true);
            }}
          />
        </SettingLine>
        <SettingLine isDark={isDark} isLast>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {{ kor: '????????? ????????? ?????????', eng: 'Clear saved data', jpn: '?????????????????????????????????' }[lang]}
          </div>
          <IoChevronForwardOutline
            style={{ height: '100%', width: '30px', padding: '0 0 0 13px' }}
            onClick={() => {
              if (
                window.confirm(
                  {
                    kor: '??????????????? ????????? ?????? ???????????? ?????? ????????????',
                    eng: 'Erase all relevant data stored in your browser',
                    jpn: '????????????????????????????????????????????????????????????????????????',
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
              { kor: '????????? ????????? ????????? ?????? ??????', eng: 'People who helped running this service', jpn: '???????????????????????????????????????????????????' }[
                lang
              ]
            }
          </div>
          <IoChevronForwardOutline style={{ height: '100%', width: '30px', padding: '0 0 0 13px' }} onClick={() => {}} />
        </SettingLine>
        <SettingLine isDark={isDark} isLast>
          <div style={{ display: 'flex', alignItems: 'center' }}>{{ kor: '???????????? ??????', eng: 'Illust from', jpn: '??????????????????' }[lang]}</div>
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
        ???????????? ??????, ?????? ?????? ??????, ?????? ??????????????? ?????? ????????? ????????? ???????????? ?????? ????????????.
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
        ??? ???????????? ????????? ???????????? ???????????? ????????? ???????????????, ?????? ?????????????????? ?????????????????? ?????? ????????? ???????????? ????????????.
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
        The MIT License (MIT)
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
              ????????? ???????????? by{' '}
              <a target='_blank' href='https://cafe.naver.com/steamindiegame/3996346'>
                ?????????
              </a>
            </div>
            <div>
              ????????? ?????? ???????????? by{' '}
              <a target='_blank' href='https://cafe.naver.com/steamindiegame/4037158'>
                ??????
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
                  {{ kor: '??????', eng: 'hours', jpn: '??????' }[lang]}
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
                  {{ kor: '??? ??? ??????', eng: 'minutes', jpn: '????????????' }[lang]}
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
                    {{ kor: '?????? ??????', eng: 'End time', jpn: '????????????' }[lang]}
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
                    {{ kor: '??? ', eng: ':', jpn: '??? ' }[lang]}
                    {leftMinute < 9 && '0'}
                    {leftMinute}
                    {{ kor: '???', eng: '', jpn: '???' }[lang]}
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
                  kor: '???????????? ??? ???????????? ????????? ?????????',
                  eng: 'Timer is initialized when refreshing',
                  jpn: '??????????????????????????????????????????????????????????????????',
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
                ? { kor: '????????? ??????', jpn: `???????????? ??????`, eng: `Stop Timer` }[lang]
                : { kor: '????????? ??????', jpn: `????????????????????????`, eng: `Start Timer` }[lang]}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default memo(SettingScreen);
