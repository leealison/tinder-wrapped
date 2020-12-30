import * as reader from "../readData.js";
import { useRef, useEffect, useState } from "react";
import { TweenMax, Power3 } from "gsap";

function TotalSwipes(props) {
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

  const data = JSON.parse(props.data);
  const swipes = reader.getTotalSwipes(data["Usage"]);

  if (show) {
    return (
      <div className="transition-1">
        <div className="total-text"
          ref={item => { line1 = item }}
          style={{"paddingTop":"15%"}}>
          Total number of swipes:
        </div>
        <div className="total-text"
          ref={item => { line2 = item }}
          style={{"color":"black", "padding-top":"2%"}}>
          {swipes.swipeLikes + swipes.swipePasses}
        </div>
      </div>
    );
  } else return null;
}

export default TotalSwipes;