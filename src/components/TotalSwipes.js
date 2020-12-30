import * as reader from "../readData.js";
import { useRef, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
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

  const json = JSON.parse(props.data);
  const swipes = reader.getTotalSwipes(json["Usage"]);

  const state = {
    labels: ["Likes", "Passes"],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: [
          '#485696',
          '#9381FF',
        ],
        borderWidth: 0,
        hoverBackgroundColor: [
          '#CB1581',
          '#CB1581',
        ],
        data: [swipes.swipeLikes, swipes.swipePasses]
      }
    ]
  }

  if (show) {
    return (
      <div className="transition-1">
        <div className="total-content">
          <div className="total-text"
            ref={item => { line1 = item }}>
            Total number of swipes:
          </div>
          <div className="total-text"
            ref={item => { line2 = item }}
            style={{ "color": "black" }}>
            {swipes.swipeLikes + swipes.swipePasses}
          </div>
          <div style={{"paddingTop": "15%" }}>
            {setTimeout(() => <Pie
              data={state}
              options={{
                legend: {
                  display: true,
                  position: 'right',
                  labels: {
                    fontFamily: 'Montserrat',
                    fontColor: "#CB1581"
                  }
                },

              }}
            />, 1000)}

          </div>
        </div>
      </div>
    );
  } else return null;
}

export default TotalSwipes;