import { useEffect, useState, useRef } from "react";
import { TweenMax, Power3 } from "gsap";
import { getTotalMatches } from "../readData.js";
import { useSpring, animated } from "react-spring";
import Next from "./Next.js";

function TotalMatches(props) {
  const [show, setShow] = useState(false);
  let line1 = useRef(null);
  let line2 = useRef(null);

  useEffect(() => {
    if (show) {
      TweenMax.to([line1, line2], .8, {
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

  if (show) {
    return (
      <div>
        <div className="transition-2">
          <animated.div
            onMouseMove={({ clientX: x, clientY: y }) => setP({ xys: calc(x, y) })}
            onMouseLeave={() => setP({ xys: [0, 0, 1] })}
            style={{ transform: p.xys.interpolate(trans) }}>
            <div className="total-content">
              <div className="matches-text"
                ref={item => { line1 = item }}>
                Total number of matches:
          </div>
              <div className="matches-text"
                ref={item => { line2 = item }}
                style={{ "color": "#FFFFFF", "paddingBottom":"3vh"}}>
                {matches}
              </div>
            </div>
          </animated.div>
        </div>
          <Next next={"matches"} data={props.update}/>
      </div>
    );
  } else return null;
}

export default TotalMatches;