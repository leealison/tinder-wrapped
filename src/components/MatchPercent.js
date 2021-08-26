import Odometer from 'react-odometerjs';
import "odometer/themes/odometer-theme-default.css";
import { useEffect, useState, useRef } from "react";
import { TweenMax, Power3 } from "gsap";
import { useSpring, animated } from "react-spring";
import Next from "./Next.js";
import { getMatchPercent } from "../readData.js";

function MatchPercent(props) {
  const [show, setShow] = useState(false);
  const [odometerVal, setOdometerVal] = useState(0);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);

  useEffect(() => {
    if (show) {
      TweenMax.to(line1, .8, {
        delay: .8,
        y: 64,
        opacity: 1,
        ease: Power3.easeOut,
        stagger: {
          amount: .15
        }
      });
      TweenMax.to([line2, line3], .8, {
        delay: 1,
        y: 64,
        opacity: 1,
        ease: Power3.easeOut,
        stagger: {
          amount: .15
        }
      });
    } else {
      setTimeout(() => setShow(true), 900);
    }
  }, [setOdometerVal, show])

  const json = JSON.parse(props.data);
  const percent = getMatchPercent(json["Usage"]);
  setTimeout(() => setOdometerVal(percent), 2200);

  const calc = (x, y) =>
    [-(y - window.innerHeight / 2) / 20,
    (x - window.innerWidth / 2) / 20, 1.1];
  const trans = (x, y) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg)`;
  const [p, setP] = useSpring(() =>
  ({
    xys: [0, 0, 1],
    config: { mass: 1, tension: 20, friction: 30 }
  }));

  return (
    <div>
      <div className="transition-3">
        <animated.div
          onMouseMove={({ clientX: x, clientY: y }) => setP({ xys: calc(x, y) })}
          onMouseLeave={() => setP({ xys: [0, 0, 1] })}
          style={{ transform: p.xys.interpolate(trans) }}>
          <div className="total-content">
            <div className="total-text"
              ref={item => { line1 = item }}
              style={{ "color": "#4101F5" }}>
              Of all the people you swiped right on,
            </div>
            <div ref={item => { line2 = item }} style={{"opacity":"0"}}>
              <Odometer value={odometerVal} duration={500} format={"(.ddd).dd"} />
            </div>
            <div className="total-text"
              ref={item => { line3 = item }}
              style={{ "color": "#4101F5" }}>
              percent swiped right too.
            </div>
          </div>
        </animated.div>
      </div>
      <Next />
    </div>
  );

}

export default MatchPercent;