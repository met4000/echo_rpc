let rpcExtensionId = config.rpcExtension.id.chrome;
if (typeof browser !== "undefined" && typeof chrome !== "undefined") {
  rpcExtensionId = config.rpcExtension.id.firefox;
}

// Register Presence
chrome.runtime.sendMessage(rpcExtensionId, { mode: "active" }, function(response) {
  console.log("Presence registered", response);
});

// Wait for presence Requests
chrome.runtime.onMessage.addListener(function(info, sender, sendResponse) {
  if (info.action == messageType.RPC) {
    console.log("Presence requested", info);
    let buttons = [];

    let isPaused = getIsPaused();

    let endTimestamp = undefined;
    if (!(isPaused ?? true)) {
      let remainingTime = getRemainingTime();
      if (remainingTime !== undefined) endTimestamp = Math.round(Date.now() + remainingTime);
    }

    let stateImageKey = undefined, stateImageText = undefined;
    if (endTimestamp !== undefined) {
      stateImageKey = config.echo360_app.imageKeys.state.playing;
      stateImageText = "playing";
    } else if (isPaused) {
      stateImageKey = config.echo360_app.imageKeys.state.paused;
      stateImageText = "paused";
    }

    let viewURL = getLectureLink();
    if (viewURL !== undefined) buttons.push({
      label: "View Lecture",
      viewURL,
    });

    sendResponse({
      clientId: config.echo360_app.id,
      presence: {
        details: getCourseName(),
        state: getLectureName(),

        largeImageKey: "echo360",
        largeImageText: "echo360",

        smallImageKey: stateImageKey,
        smallImageText: stateImageText,

        endTimestamp: endTimestamp,

        buttons: buttons.length > 0 ? buttons : undefined,
      },
    });
  }
});
