function injectSpeeds() {
  // * change these *
  var speeds = [2.25, 2.5, 2.6, 2.75, 3, 3.25, 3.5, 3.75, 4];

  if (!window.__echoUtil__speed__) {
    window.__echoUtil__speed__ = {};

    __echoUtil__speed__.createOptionEl = function (speed) {
      var optionEl = document.createElement("option");
      optionEl.value = speed;
      optionEl.text = optionEl.value;
      return optionEl;
    };

    __echoUtil__speed__.updateOptions = function () {
      var l = document.querySelector("#speed-select");
      l.innerHTML = "";
      for (var i = 0; i < __echoUtil__speed__.insertedSpeeds.length; i++) l.appendChild(__echoUtil__speed__.insertedSpeeds[i]);
      l.value = 0;
    };

    __echoUtil__speed__.settingsWheelEl = document.getElementsByClassName("echoPlayer")[0].querySelector("div > div > div.controls > div.controlsBar > div.right > div.video-menu.settings-menu > a");

    __echoUtil__speed__.settingsWheelEl.click();
    __echoUtil__speed__.insertedSpeeds = Array(__echoUtil__speed__.createOptionEl(0), ...document.querySelector("#speed-select").children);
    __echoUtil__speed__.settingsWheelEl.click();

    __echoUtil__speed__.isMenuOpen = function () { return !!document.querySelector("#speed-select"); };

    document.getElementsByClassName("echoPlayer")[0].querySelector("div > div > div.controls > div.controlsBar > div.right > div.video-menu.settings-menu > a").onclick = function () { setTimeout(() => { if (__echoUtil__speed__.isMenuOpen()) __echoUtil__speed__.updateOptions(); }, 10); };
  }

  var isOpen = __echoUtil__speed__.isMenuOpen();

  if (isOpen) __echoUtil__speed__.settingsWheelEl.click();

  speeds.forEach(speed => {
    var optionEl = __echoUtil__speed__.createOptionEl(speed), f = __echoUtil__speed__.insertedSpeeds.findIndex(el => el.value >= speed);
    if (f == -1) __echoUtil__speed__.insertedSpeeds.push(optionEl);
    else if (__echoUtil__speed__.insertedSpeeds[f].value != speed) __echoUtil__speed__.insertedSpeeds.splice(f, 0, optionEl);
  });

  if (isOpen) __echoUtil__speed__.settingsWheelEl.click();
}

// add redirects to the courses page instead of the content page (unused)
function changeHome() {
  // note: anchor, not button
  let homeButtonEl = document.querySelector("body > div.main-content > div:nth-child(2) > div > div > nav > div.left > div.echo-logo > a");
  homeButtonEl.href = "/courses";
}

window.addEventListener("load", () => {
  console.info("Attempting speeds injection");
  injectSpeeds();
  console.info("Finished speeds injection");

  console.info("Attempting to add redirects");
  changeHome();
  console.info("Finished adding redirects");
});
