var system_deviceInfo = new App(
  "system_deviceInfo",
  "Device Info",
  "apps/system_deviceInfo/icon-black.png"
);
var c = new ClientJS();
system_deviceInfo.content = `<img src="favicon.png">
<h2>EduScript</h2>
<p>Base browser: ${c.getBrowser()} ${c.getBrowserMajorVersion()}</p>
<p>Engine: ${c.getEngine()}</p>
<hr>
<p>Operating system: ${c.getOS()} ${c.getOSVersion()}</p>
<p>CPU architecture: ${c.getCPU()}</p>
<p>Screen resolution: ${c.getCurrentResolution()}</p>
<p>Available resolution: ${c.getAvailableResolution()}</p>
<p>Color depth: ${c.getColorDepth()}</p>
<hr>
<sup>Made with ❤️ by Sokol👀wski</sup>`;