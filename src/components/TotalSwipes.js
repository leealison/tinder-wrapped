import * as reader from "../readData.js";
import { useRef, useEffect, useState } from "react";
import { TweenMax, Power3 } from "gsap";

function TotalSwipes(props) {
  let content = useRef(null);
  let [show, setShow] = useState(false);
  console.log(props.show);

  useEffect(() => {
    if (show) {
      TweenMax.to(
        content,
        1,
        {
          opacity: 1,
          y: -20,
          ease: Power3.easeOut
        }
      );
    } else {
      setTimeout(() => {
        setShow(true)
      }, 1000);
    }
  }, []);

  const data = JSON.parse(props.data);
  const swipes = reader.getTotalSwipes(data["Usage"]);

  if (show) {
    return (
      <div>
        <h1 className="title-text"
          ref={item => { content = item }}>
          You've swiped a total of {swipes.swipeLikes + swipes.swipePasses} times!
        </h1>
      </div>
    );
  } else {
    return null;
  }
}

export default TotalSwipes;