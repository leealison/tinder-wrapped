import { getTotalSwipes } from "../readData.js";
import { useRef, useEffect, useState } from "react";
import { TweenMax, Power3 } from "gsap";
import PieChart from "./PieChart.js";
import { useSpring, animated } from "react-spring";
import Next from "./Next.js";

function TotalSwipes(props) {
  const [show, setShow] = useState(false);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let pie = useRef(null);

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
  const swipes = getTotalSwipes(json["Usage"]);

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

  const animateOut = () => {
    TweenMax.to([line1, line2, pie], .8, {
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
        <div className="transition-1">
          <animated.div
            onMouseMove={({ clientX: x, clientY: y }) => setP({ xys: calc(x, y) })}
            onMouseLeave={() => setP({ xys: [0, 0, 1] })}
            style={{ transform: p.xys.interpolate(trans), "height":"100%" }}>
            <div className="total-content">
              <div className="total-text"
                ref={item => { line1 = item }}
                style={{color:"#CB1581", textAlign:"center"}}>
                Total number of swipes:
              </div>
              <div className="total-text"
                ref={item => { line2 = item }}
                style={{ "color": "black", paddingLeft:"5vw" }}>
                {swipes.swipeLikes + swipes.swipePasses}
              </div>
              <div ref={item => { pie = item }} className="graph" style={{left:"10%"}}>
                <PieChart swipeLikes={swipes.swipeLikes} swipePasses={swipes.swipePasses} />
              </div>
            </div>
          </animated.div>
        </div>
        <Next next={"matches"} data={props.update} animateOut={animateOut}/>
      </div>
    );
  } else return null;
}

export default TotalSwipes;