import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import { axiosInstance } from './axiosInstance';
import parse from 'paste-from-excel';

function App() {
  const [musics, setMusics] = useState([]);
  const [reload, setReload] = useState(true);
  const [key, setKey] = useState('');
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    var myTable = document.querySelector('#my-table');
    myTable.addEventListener('paste', handlePaste);
    setKey(localStorage.getItem('key'));
    function handlePaste(e) {
      return parse(e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('key', key);
  }, [key]);

  useEffect(() => {
    setReload(true);
  }, [reverse]);

  useEffect(async () => {
    if (!reload) return;
    const res = await axiosInstance.get('/music');
    if (reverse) setMusics([...res.data.data.reverse()]);
    else setMusics([...res.data.data]);
    setReload(false);
  }, [reload]);

  return (
    <div className='App' style={{ padding: '20px 10px' }}>
      <iframe name='dummyframe' id='dummyframe' style={{ display: 'none' }}></iframe>

      <div style={{ width: '100%', marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: 40 }}>
        <input type='text' placeholder='key' defaultValue={key} onChange={(e) => setKey(e.target.value)} />

        <button
          onClick={() => {
            setReload(true);
          }}
        >
          reload
        </button>

        <button
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          reverse
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <table id='my-table'>
          <tr>
            <form
              enctype='multipart/form-data'
              target='dummyframe'
              id={'post'}
              action={`${axiosInstance.defaults.baseURL}/music?key=${key}`}
              method='post'
              onSubmit={() =>
                setTimeout(function () {
                  setReload(true);
                }, 1000)
              }
            ></form>

            <td>
              <input type='text' form={'post'} name='titleKor' size='16' />
            </td>
            <td>
              <input type='text' form={'post'} name='oSingerKor' size='13' />
            </td>
            <td>
              <input type='text' form={'post'} name='titleEng' size='16' />
            </td>
            <td>
              <input type='text' form={'post'} name='oSingerEng' size='13' />
            </td>
            <td>
              <input type='text' form={'post'} name='titleJpn' size='16' />
            </td>
            <td>
              <input type='text' form={'post'} name='oSingerJpn' size='13' />
            </td>
            <td>
              <input type='text' form={'post'} name='singer' size='7' />
            </td>
            <td>
              <input type='text' form={'post'} name='nation' size='3' />
            </td>
            <td>
              <input type='text' form={'post'} name='youtubeUrl' size='7' />
            </td>
            <td>
              <input type='text' form={'post'} name='full' size='5' />
            </td>
            <td>
              <input type='text' form={'post'} name='date' size='10' />
            </td>

            <td>
              <input form={'post'} type='submit' />
            </td>
            <td>
              <input form={'post'} name='audio' type='file' />
            </td>
          </tr>
        </table>
      </div>

      <table id='my-table'>
        {musics &&
          !reload &&
          key &&
          musics.map((music, idx) => {
            return (
              <tr>
                <form
                  enctype='multipart/form-data'
                  target='dummyframe'
                  id={'post' + music.id}
                  action={`${axiosInstance.defaults.baseURL}/music/${music.id}?key=${key}`}
                  method='post'
                ></form>
                {music.id}
                <td>
                  <input type='text' form={'post' + music.id} name='titleKor' size='16' defaultValue={music.titleKor} />
                </td>
                <td>
                  <input type='text' form={'post' + music.id} name='oSingerKor' size='13' defaultValue={music.oSingerKor} />
                </td>
                <td>
                  <input type='text' form={'post' + music.id} name='titleEng' size='16' defaultValue={music.titleEng} />
                </td>
                <td>
                  <input type='text' form={'post' + music.id} name='oSingerEng' size='13' defaultValue={music.oSingerEng} />
                </td>
                <td>
                  <input type='text' form={'post' + music.id} name='titleJpn' size='16' defaultValue={music.titleJpn} />
                </td>
                <td>
                  <input type='text' form={'post' + music.id} name='oSingerJpn' size='13' defaultValue={music.oSingerJpn} />
                </td>
                <td>
                  <input type='text' form={'post' + music.id} name='singer' size='7' defaultValue={music.singer} />
                </td>
                <td>
                  <input type='text' form={'post' + music.id} name='nation' size='3' defaultValue={music.nation} />
                </td>
                <td>
                  <input type='text' form={'post' + music.id} name='youtubeUrl' size='7' defaultValue={music.youtubeUrl} />
                </td>
                <td>
                  <input type='text' form={'post' + music.id} name='full' size='5' defaultValue={music.full} />
                </td>
                <td>
                  <input type='text' form={'post' + music.id} name='date' size='10' defaultValue={music.date?.replaceAll('-', '').substring(2)} />
                </td>

                <td>
                  <input form={'post' + music.id} type='submit' />
                </td>
                <td>
                  <div style={{ fontSize: '10px', width: '120px' }}>{music.fileName}</div>
                </td>
                <td>
                  <input form={'post' + music.id} name='audio' type='file' />
                </td>
                <button
                  onClick={async () => {
                    if (!window.confirm('delete?')) return;
                    const res = await axiosInstance.delete(`/music/${music.id}?key=${key}`);
                    setTimeout(function () {
                      setReload(true);
                    }, 500);
                  }}
                >
                  delete
                </button>
              </tr>
            );
          })}
      </table>
    </div>
  );
}

export default App;
