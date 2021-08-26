import { Bar } from "react-chartjs-2";
import { getKeys, getVals } from "../readData.js";
import { useState, useEffect, useRef } from "react";
import { TweenMax, Power3 } from "gsap";

function BarChart(props) {
  const dates = getKeys(props.data);
  const matchesNum = getVals(props.data);

  const [show, setShow] = useState(false);
  let bars = useRef(null);

  useEffect(() => {
    if (!show) {
      setTimeout(() => setShow(true), 1300);
    } else {
      TweenMax.to(bars, .8, {
        y: 15,
        opacity: 1,
        ease: Power3.easeOut,
        stagger: {
          amount: .15
        }
      });
    }
  }, [show]);

  const state = {
    labels: dates,
    datasets: [
      {
        label: "Matches",
        fontColor: "A5FFEF",
        backgroundColor: "#ffffff",
        data: matchesNum
      }
    ]
  }

  if (show) {
    return (
      <div ref={item => { bars = item }}>
        <Bar
          data={state}
          options={{
            scales: {
              yAxes: [{
                ticks: {
                  fontColor: "#45ffde",
                  fontFamily: "Montserrat",
                },
                gridLines: {
                  display: false
                }
              }],
              xAxes: [{
                ticks: {
                  fontColor: "#45ffde",
                  fontFamily: "Montserrat"
                },
                gridLines: {
                  display: false
                }
              }]
            },
            legend: {
              display: false
            }
          }}
        />
      </div>
    );
  } else return null;

}

export default BarChart;