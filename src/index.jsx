// import WebRenderer from "@elemaudio/web-renderer-lite";
import getCore from "./lib/withWebAudio";

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import Debugger from "./ui/Debugger";
import { Splash } from "./ui/Splash";

let core = getCore();
let ctx = new AudioContext(); // TODO: Do the same with audio context as core

const runDebugger = false;

const RenderApp = () => {
  ReactDOM.render(
    <React.StrictMode>{runDebugger ? <Debugger /> : <App />}</React.StrictMode>,
    document.getElementById("root"),
  );
};

core.on("load", () => {
  if (ctx.state !== "running") {
    ReactDOM.render(
      <Splash onClick={() => ctx.resume().then(() => RenderApp())} />,
      document.getElementById("root"),
    );
  } else {
    RenderApp();
  }
});

async function main() {
  let node = await core.initialize(ctx, {
    numberOfInputs: 0,
    numberOfOutputs: 1,
    outputChannelCount: [2],
  });
  node.connect(ctx.destination);
}

main();
