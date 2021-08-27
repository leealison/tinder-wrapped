import { useEffect, useState, useRef } from "react";
import { TweenMax, Power3 } from "gsap";
import { useSpring, animated } from "react-spring";
import { getTop3AppOpens, getAppOpenAverage } from "../readData.js";
import Next from "./Next.js";

function AppOpens(props) {
  const [show, setShow] = useState(false)
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  let line4 = useRef(null);
  let line5 = useRef(null);

  useEffect(() => {
    if (show) {
      TweenMax.to([line1, line2, line3, line4, line5], .8, {
        delay: .8,
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
  }, [show, line1, line2, line3, line4, line5]);

  const json = JSON.parse(props.data);
  const top3 = getTop3AppOpens(json["Usage"]);
  const first = top3[0];
  const second = top3[1];
  const third = top3[2];
  const avg = getAppOpenAverage(json["Usage"])

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

  const animateOut = () => {
    TweenMax.to([line1, line2, line3, line4, line5], 1, {
      y: -30,
      opacity: 0,
      ease: Power3.easeOut,
      stagger: {
        amount: .15
      }
    });
  }

  if (show) {
    return (
      <div>
        <div className="transition-4">
        <animated.div
            onMouseMove={({ clientX: x, clientY: y }) => setP({ xys: calc(x, y) })}
            onMouseLeave={() => setP({ xys: [0, 0, 1] })}
            style={{ transform: p.xys.interpolate(trans) }}>
            <div className="total-content">
              <div className="total-text"
                ref={item => { line1 = item }}
                style={{ "color": "#CCF565" }}>
                You opened the app
              </div><br/><br/>
              <div className="total-text"
                ref={item => { line2 = item }}
                style={{ "color": "#FD36AE" }}>
                <span style={{ "fontSize": "1.5em", "color": "#9CF0E2" }}>{first[1]}</span> times on {first[0]} <span style={{ "fontSize": ".2em"}}>(sheesh)!</span>
              </div>
              <div className="total-text"
                ref={item => { line3 = item }}
                style={{ "color": "#FD36AE" }}>
                <span style={{ "fontSize": "1.5em", "color": "#9CF0E2" }}>{second[1]}</span> times on {second[0]}
              </div>
              <div className="total-text"
                ref={item => { line4 = item }}
                style={{ "color": "#FD36AE" }}>
                <span style={{ "fontSize": "1.5em", "color": "#9CF0E2" }}>{third[1]}</span> times on {third[0]}
              </div><br/>
              <div className="total-text"
                ref={item => { line5 = item }}
                style={{ "color": "#CCF565", "fontSize": "1.5em" }}>
                with an average of {avg} opens per day.
              </div>
            </div>
          </animated.div>
        </div>
        <Next next={"messages received"} animateOut={animateOut} data={props.update} />
      </div>
    );
  } else return null;
}

export default AppOpens;