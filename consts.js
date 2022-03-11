const messageType = {
  RPC: "presence",
};

const config = {
  rpcExtension: {
    id: {
      chrome: "agnaejlkbiiggajjmnpmeheigkflbnoo",
      firefox: "{57081fef-67b4-482f-bcb0-69296e63ec4f}",
    },
  },
  
  echo360_app: {
    id: "951771228551671848",

    imageKeys: {
      state: {
        playing: "playing",
        paused: "paused",
      }
    },
  },
};

// usurp console
const rawConsole = Object.fromEntries(["log", "warn", "error", "debug"].map(v => {
  var ret = console[v].bind(console);
  console[v] = (...args) => rawConsole[v]("[ECHO360_RPC EXTENSION]", ...args);
  return [v, ret];
}));
