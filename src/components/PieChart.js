import { Pie } from "react-chartjs-2";
import { useState, useEffect, useRef } from "react";
import { TweenMax, Power3 } from "gsap";

// https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
function PieChart(props) {
  const [show, setShow] = useState(false);
  let pie = useRef(null);

  useEffect(() => {
    if (!show) {
      setTimeout(() => setShow(true), 1300);
    } else {
      TweenMax.to(pie, .8, {
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
    labels: ["Likes", "Passes"],
    datasets: [
      {
        backgroundColor: [
          '#485696',
          '#9381FF',
        ],
        borderWidth: 0,
        hoverBackgroundColor: [
          '#CB1581',
          '#CB1581',
        ],
        data: [props.swipeLikes, props.swipePasses]
      }
    ]
  }

  if (show) {
    return (
      <div style={{ "paddingTop": "10%", "opacity":"0" }} ref={item => { pie = item }}>
        <Pie
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
        />
      </div>
    )
  } else return null;
}

export default PieChart;