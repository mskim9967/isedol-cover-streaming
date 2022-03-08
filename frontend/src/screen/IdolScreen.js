import { useEffect } from 'react';
const usetube = require('usetube');

function IdolScreen({ lang }) {
  useEffect(async () => {
    const videos = await usetube.getChannelVideos('UCHE7GBQVtdh-c1m3tjFdevQ');
    console.log(videos);
  }, []);

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <div style={{ width: '100%', marginTop: '30px', display: 'flex', justifyContent: 'center', opacity: '50%', fontSize: '22px' }}>
        {{ kor: '준비중입니다 :)', eng: 'Getting ready :)', jpn: '準備中です :)' }[lang]}
      </div>
    </div>
  );
}

export default IdolScreen;
