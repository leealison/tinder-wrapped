import React, { useState } from "react";
import { Transition } from "react-transition-group";
import TitleCard from "./components/TitleCard.js";
import TotalSwipes from "./components/TotalSwipes.js";
import "./App.css";

function App() {
  const [title, setTitle] = useState(true);
  const [json, setJson] = useState("");
  const [jsonSet, setJsonSet] = useState(false);
  const update = (state, val) => {
    if (state === "title") setTitle(val);
    else if (state === "json") {
      setJson(val);
      setJsonSet(true);
    }
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
        in={jsonSet}>
        <TotalSwipes data={json} />
      </Transition>
    </div>
  );

}

export default App;
