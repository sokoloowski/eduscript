var fs = require('fs');
var system_settings = new App('system_settings', 'Settings', 'apps/system_settings/icon-black.png');

system_settings.setSettings = (property, value) => {
    try {
        current[property] = value;
        fs.writeFileSync('current_settings.json', JSON.stringify(current, null, 4));
    } catch (error) {
        newWindow(
            'system_settings_updateSettingsError',
            'icons/error.png',
            'Error',
            `<div class="error">
                <i style="font-size:100px;color:red;" class="material-icons">error</i>
                <p style="text-align: center;width: -webkit-fill-available;margin-top: -30px;">${error}</p>
            </div>`,
            'alert'
        );
    }
}

system_settings.save = () => {
    var setting = document.getElementsByTagName('input');
    for (var i = 0; i < setting.length; i++) {
        system_settings.setSettings(setting[i].name, setting[i].value);
    }
    system_settings.applySettings();
}

system_settings.applySettings = () => {
    // Wallpaper
    $('body').css('background-image', `url(${current.wallpaper})`);

    // Accent color
    $('#navbar>div.activators>div.active').css('border-bottom', `1px solid ${current.accentColor}`);
}

system_settings.functions = () => {
    system_settings.content = '';
    for (k in settings) {
        system_settings.content += `<p>${k}<input type="text" name="${k}" list="${k}" value="${current[k]}"><datalist id="${k}">`;
        for (v in settings[k]) {
            if ($.type(settings[k]) == 'array') system_settings.content += `<option value="${settings[k][v]}">${settings[k][v]}</option>`;
            else system_settings.content += `<option value="${v}">${settings[k][v]}</option>`;
        }
        system_settings.content += `</datalist></p>`;
    };
};

system_settings.install = (name, code) => {
    try {
        // Install app
        fs.mkdirSync(`apps/${name}`);
        fs.writeFileSync(`apps/${name}/app.js`, code.replace(/\&quot;/ig, '"'));
        fs.copyFileSync('apps/default/icon-black.png', `apps/${name}/icon-black.png`);
        fs.copyFileSync('apps/default/icon-white.png', `apps/${name}/icon-white.png`);
        appList.push(name);
        fs.writeFileSync('apps/apps.json', JSON.stringify(appList, null, 4));

        newWindow(
            'system_settings_installAppSuccessful',
            'icons/info.png',
            'Success',
            `<div class="error">
                <i style="font-size:100px;color:green;" class="material-icons">done</i>
                <p style="text-align: center;width: -webkit-fill-available;margin-top: -10px;">
                    App successfully installed. It will become available after the system restart
                </p>
                <button onclick="location.reload(true)" style="
                    color: white;
                    border: none;
                    background: green;
                    font-size: inherit;
                    padding: 10px 20px;
                ">Restart now</button>
            </div>`,
            'alert'
        );
    } catch (e) {
        newWindow(
            'system_settings_installAppError',
            'icons/error.png',
            'Error',
            `<div class="error">
                <i style="font-size:100px;color:red;" class="material-icons">error</i>
                <p style="text-align: center;width: -webkit-fill-available;margin-top: -30px;">${e}</p>
            </div>`,
            'alert'
        );
    }
}

system_settings.app = () => {
    system_settings.functions();
    system_settings.content += `<style>@import url(apps/${system_settings.name}/style.css)</style>`;
    $('#workspace').append(`
        <div class="window" name="${system_settings.name}">
            <div class="bar">
                <div class="icon" style="background-image:url(${system_settings.icon})"></div>
                <div class="icon action" onclick="system_settings.save()" title="Save"><i class="material-icons">save</i></div>
                <div class="title">${system_settings.title}</div>
                ${stateButtons()}
            </div>
            <div class="content">
                ${system_settings.content}
            </div>
        </div>
    `);
    $('.window:last-child').draggable();
    $(function () {
        $('.window:last-child').resizable();
    });
};