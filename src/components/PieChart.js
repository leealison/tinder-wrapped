import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";

function PieChart(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) {
      setTimeout(() => setShow(true), 1300);

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
      <div style={{ "paddingTop": "10%" }}>
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