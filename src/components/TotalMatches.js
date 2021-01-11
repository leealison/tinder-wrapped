import { useEffect, useState, useRef } from "react";
import { TweenMax, Power3 } from "gsap";
import { getDaysWithMostMatches, getTotalMatches } from "../readData.js";
import { useSpring, animated } from "react-spring";
import Next from "./Next.js";
import Bars from "./Bars.js";

function TotalMatches(props) {
  const [show, setShow] = useState(false);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);

  useEffect(() => {
    if (show) {
      TweenMax.to([line1, line2, line3], .8, {
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
  }, [show, line1, line2]);

  const json = JSON.parse(props.data);
  const matches = getTotalMatches(json["Usage"]);
  const top5 = getDaysWithMostMatches(json["Usage"]);
  console.log(matches);

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

  if (show) {
    return (
      <div>
        <div className="transition-2">
          <animated.div
            onMouseMove={({ clientX: x, clientY: y }) => setP({ xys: calc(x, y) })}
            onMouseLeave={() => setP({ xys: [0, 0, 1] })}
            style={{ transform: p.xys.interpolate(trans) }}>
            <div className="total-content">
              <div className="total-text"
                ref={item => { line1 = item }}
                style={{ "color": "#45ffde" }}>
                Total number of matches:
              </div>
              <div className="total-text"
                ref={item => { line2 = item }}
                style={{ "color": "#000000" }}>
                {matches}
              </div>
              <div className="total-text"
                ref={item => { line3 = item }}
                style={{ "color": "#FFFFFF", "fontSize": "2vw", "marginTop": "3vh" }}>
                You made the most matches on these days:
              </div>
              <div className="graph" style={{ "marginTop": "90px", "width": "100%" }}>
                <Bars data={top5} />
              </div>
            </div>
          </animated.div>
        </div>
        <Next next={"matches"} data={json["Usage"]} />
      </div>
    );
  } else return null;
}

export default TotalMatches;