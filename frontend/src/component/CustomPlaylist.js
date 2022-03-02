import lightColor from '../static/lightColor';
import darkColor from '../static/darkColor';
import gosegu from '../static/image/segu_300_300.webp';
import viichan from '../static/image/chan_300_300.webp';
import jururu from '../static/image/ruru_300_300.webp';
import lilpa from '../static/image/lilpa_300_300.webp';
import jingburger from '../static/image/jing_300_300.webp';
import ine from '../static/image/ine_300_300.webp';
import all from '../static/image/all_300_300.webp';
import { IoAddCircle, IoPlay } from 'react-icons/io5';

import { Button } from '@nextui-org/react';
import { memo } from 'react';

const member = {
  ine: { kor: '아이네', eng: 'INE', jpn: 'アイネ' },
  jingburger: { kor: '징버거', eng: 'JINGBURGER', jpn: 'ジンバーガー' },
  lilpa: { kor: '릴파', eng: 'LILPA', jpn: 'リルパ' },
  jururu: { kor: '주르르', eng: 'JURURU', jpn: 'ジュルル' },
  gosegu: { kor: '고세구', eng: 'Gosegu', jpn: 'ゴセグ' },
  viichan: { kor: '비챤', eng: 'VIICHAN', jpn: 'ゔぃちゃん' },
  all: { kor: '이세계 아이돌', eng: 'Isegye Idol', jpn: 'イセドル' },
};

const image = {
  ine,
  jingburger,
  lilpa,
  jururu,
  gosegu,
  viichan,
  all,
};

function CustomPlaylist({ setModalActive, playlistControl, music, lang, isDark, customPlaylist, setCustomPlaylist }) {
  const color = isDark ? darkColor : lightColor;

  return (
    <div
      style={{
        width: '100%',
        padding: '3px 25px 25px 25px',
        backgroundColor: isDark ? '#1c1c1c' : '#ffffff',
        display: 'flex',
        gap: 4,
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '80%',
      }}
    >
      <div style={{ width: '100%' }}>
        <div
          style={{
            float: 'left',
            marginBottom: '10px',
            marginLeft: '3px',
            fontSize: '20px',
            fontWeight: '500',
            color: color.textBlack,
          }}
        >
          {{ kor: '플레이리스트에 추가', jpn: 'プレイリストに追加', eng: 'Add to playlist' }[lang]}
        </div>
      </div>
      <Button.Group size='lg' color='primary' vertical flat={!isDark}>
        <Button
          iconRight
          icon={<IoAddCircle size={24} style={{ marginLeft: '-15px' }} />}
          onClick={() => {
            let name = prompt({ kor: '새 플레이리스트 이름', jpn: 'プレイリス新しいプレイリストの名前', eng: "New playlist's name" }[lang]);
            name = name.trim();
            if (!name || name.length === 0) alert({ kor: '이름이 비어있습니다', jpn: '名前があいています', eng: 'The name is empty' }[lang]);
            else if (name.length > 10) alert({ kor: '이름이 너무 깁니다', jpn: '名前があいています', eng: 'The name is empty' }[lang]);
            else if (customPlaylist.find((e) => e.name === name))
              alert({ kor: '이름이 중복됩니다', jpn: '名前が長すぎます', eng: 'The name too long' }[lang]);
            else {
              setCustomPlaylist([...customPlaylist, { name, data: [music] }]);
              // setModalActive(false);
            }
          }}
        >
          {{ kor: '새 재생목록에 추가', jpn: '新しい再生リストに追加', eng: 'Add to new playlist' }[lang]}
        </Button>
      </Button.Group>
      {customPlaylist?.length !== 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '500px', overflow: 'auto' }}>
          <Button.Group size='lg' color='primary' vertical flat={!isDark}>
            {customPlaylist.map((e, idx) => {
              return (
                <Button
                  key={idx}
                  tyle={{ height: '50px' }}
                  onClick={() => {
                    if (e.data.find((ee) => ee.id === music.id))
                      alert({ kor: '이미 추가되어 있습니다', jpn: 'すでに追加されています', eng: "It's already been added" }[lang]);
                    else {
                      let temp = [...customPlaylist];
                      temp.forEach((ee, i) => {
                        if (ee.name === e.name) ee.data.push(music);
                        setCustomPlaylist([...temp]);
                        setModalActive(false);
                      });
                    }
                  }}
                >
                  {`${e.name} (${e.data.length}${{ kor: '곡', eng: ' songs', japan: '曲' }[lang]})`}
                </Button>
              );
            })}
          </Button.Group>
        </div>
      )}
    </div>
  );
}

export default memo(CustomPlaylist);
