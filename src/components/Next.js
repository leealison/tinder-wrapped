function Next(props) {
  const nextComponent = () => {
    if (props.next === "matches") {
      props.animateOut();
      props.data("totalSwipes", false);
      props.data("matches", true);
    } else if (props.next === "match percent") {
      props.animateOut();
      props.data("matches", false);
      props.data("matchPercent", true);
    }
  }

  return (
    <ul className="next-ul">
      <li id="down" onClick={() => nextComponent()} className="next-li">
        <div className="deh m1"><pre> </pre></div>
        <div className="deh m2"><pre> </pre></div>
        <div className="deh m3"><pre> </pre></div>
      </li>
    </ul>
  )
}

export default Next;