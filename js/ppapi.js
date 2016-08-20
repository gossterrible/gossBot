"use strict";

const path  = require("path");

let flashPlugin = null;
switch (process.platform) {
	case "win32":
		flashPlugin = "pepflashplayer.dll";
	break;
	case "linux":
		flashPlugin = "/opt/google/chrome/PepperFlash/libpepflashplayer.so";
	break;
	case "darwin":
		flashPlugin = "PepperFlashPlayer.plugin";
	break;
}

module.exports = {
	getFlashPath: () => path.join(flashPlugin),
	getVersion: () => '21.0.0.213'
};
