import { useSpring, animated } from "react-spring";
import { useRef, useEffect } from "react";
import { TweenMax } from "gsap";

function TitleCard(props) {
  //https://codesandbox.io/embed/rj998k4vmm
  const calc = (x, y) =>
    [-(y - window.innerHeight / 2) / 20,
    (x - window.innerWidth / 2) / 20, 1.1];
  const trans = (x, y) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg)`;
  const [p, setP] = useSpring(() =>
    ({
      xys: [0, 0, 1],
      config: { mass: 1, tension: 40, friction: 30 }
    }));

  //https://stackoverflow.com/questions/54673206/how-to-read-and-upload-a-file-in-reactjs-using-custom-button
  const fileUpload = () => {
    document.getElementById('fileButton').click();
    document.getElementById('fileButton').onchange = (e) => {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = e => {
        TweenMax.to(
          content,
          1,
          { opacity: 0, x: 150 }
        );
        props.data("title", false);
        props.data("json", e.target.result);
      }
    };
  }

  let content = useRef(null);

  useEffect(() => {
    TweenMax.to(
      content,
      3.5,
      { opacity: 1, y: -20 }
    );
  }, []);

  return (
    <div className="centered" ref={item => { content = item }}>
      <animated.div
        onMouseMove={({ clientX: x, clientY: y }) => setP({ xys: calc(x, y) })}
        onMouseLeave={() => setP({ xys: [0, 0, 1] })}
        style={{ transform: p.xys.interpolate(trans) }}>
        <div className="card">
          <div className="card-title">Tinder Wrapped</div>
          <div className="card-text" style={{ "paddingTop": "10vh", "marginBottom": "-5vh" }}>
            You've been busy swiping! Here are your Tinder highlights.
          </div>
          <div className="button-container">
            <input id="fileButton" type="file" hidden />
            <button onClick={() => fileUpload()}>Upload your data here.</button>
          </div>
          <div className="card-text" style={{
            "fontSize": "10px",
            "marginTop": "-11vh",
            "lineHeight": "2.3vh",
          }}>
            Select data.json in the myData folder.
          </div>
        </div>
      </animated.div>
    </div>
  );
}

export default TitleCard;