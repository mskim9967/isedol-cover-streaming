import 'aos/dist/aos.css';
import AOS from 'aos';
AOS.init();

const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

function IdolScreen() {
  return (
    <div
      style={{
        width: '100%',
        height: '400px',
        border: 'solid red 2px',
        overflow: 'scroll',
      }}
    >
      {arr.map(() => {
        return (
          <>
            <div style={{ width: '100px', height: '100px', backgroundColor: 'red' }}></div> <div style={{ height: '400px' }}> </div>
          </>
        );
      })}
    </div>
  );
}

export default IdolScreen;
