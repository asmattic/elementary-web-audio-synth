
import WebRenderer from "@elemaudio/web-renderer-lite";

let core: WebRenderer;

const getCore = () => {
  if (!core) {
    core = new WebRenderer();
  }

  return core;
};

export default getCore;
