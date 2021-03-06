import React, { useState } from "react";
import { Transition } from "react-transition-group";
import TitleCard from "./components/TitleCard.js";
import TotalSwipes from "./components/TotalSwipes.js";
import TotalMatches from "./components/TotalMatches.js";
import "./App.css";

function App() {
  const [title, setTitle] = useState(true);
  const [json, setJson] = useState("");
  const [totalSwipes, setTotalSwipes] = useState(false);
  const [matches, setMatches] = useState(false);
  const update = (state, val) => {
    if (state === "title") setTitle(val);
    else if (state === "json") {
      setJson(val);
      setTotalSwipes(true);
    }
    else if (state === "totalSwipes") setTotalSwipes(val);
    else if (state === "matches") setMatches(val);
  }

  return (
    <div>
      <Transition
        timeout={1000}
        mountOnEnter
        unmountOnExit
        in={title} >
        <TitleCard data={update} />
      </Transition>
      <Transition
        timeout={1000}
        mountOnEnter
        unmountOnExit
        in={totalSwipes}>
        <TotalSwipes data={json} update={update}/>
      </Transition>
      <Transition
        timeout={1000}
        mountOnEnter
        unmountOnExit
        in={matches}>
        <TotalMatches data={json} update={update}/>
      </Transition>
    </div>
  );

}

export default App;
