// @returns html5 video object, or undefined
function getVideoElement() {
  return document.getElementsByTagName("video")[0];
}

// @returns float (ms), or undefined
function getTotalDuration() {
  let totalDuration = getVideoElement()?.duration; // seconds
  if (totalDuration === undefined) return undefined;

  return totalDuration * 1000;
}

// @returns float (ms), or undefined
function getCurrentDuration() {
  let currentDuration = getVideoElement()?.currentTime; // seconds
  if (currentDuration === undefined) return undefined;

  return currentDuration * 1000;
}

// @returns float (multiplier), or undefined
function getCurrentPlaybackSpeed() {
  return getVideoElement()?.playbackRate;
}

// @returns float (ms), or undefined
function getRemainingDuration() {
  let totalDuration = getTotalDuration(), currentDuration = getCurrentDuration();
  if (totalDuration == undefined || currentDuration == undefined) return undefined;

  return totalDuration - currentDuration;
}

// Accounts for playback speed.
// @returns int (ms), or undefined
function getRemainingTime() {
  let remainingDuration = getRemainingDuration();
  if (remainingDuration === undefined) return undefined;

  return Math.round(remainingDuration / (getCurrentPlaybackSpeed() ?? 1.0));
}

// @returns bool, or undefined
function getIsPaused() {
  return getVideoElement()?.paused;
}

// @returns string, or undefined
function getCourseName() {
  return document.getElementsByClassName("wider")[0]?.innerText;
}

// @returns string, or undefined
function getLectureName() {
  return document.querySelectorAll("[data-tooltip=\"Class list\"]")[0]?.innerText;
}

// @returns string (href), or undefined
function getLectureLink() {
  return document.location.href.toString();
}
