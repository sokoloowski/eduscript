var path, settings, current;

$.ajax({
    url: 'eduscript_settings.json',
    success: function (s) {
        settings = s;
    }
});

$.ajax({
    url: 'current_settings.json',
    success: function (s) {
        current = s;
    }
});

$.ajax({
    url: 'apps/userApps.json',
    success: function (s) {
        path = s;
    }
});

var iconColor = 'white';

if ($('link[rel="stylesheet"]:last-child').attr('href').match(/light/ig)) {
    var iconColor = 'black';
} else if ($('link[rel="stylesheet"]:last-child').attr('href').match(/dark/ig)) {
    var iconColor = 'white';
}

// Battery
setInterval(() => {
    navigator.getBattery().then(function (battery) {
        function updateAllBatteryInfo() {
            updateChargeLevel();
        }
        updateAllBatteryInfo();

        battery.addEventListener('chargingchange', function () {
            updateChargeLevel();
        });
        function updateChargeLevel() {
            if (battery.charging) {
                var hBat = Math.floor(battery.chargingTime / 3600);
                var mBat = Math.floor((battery.chargingTime % 3600) / 60);
                var sBat = Math.floor((battery.chargingTime % 3600) % 60);

                if (hBat < 10) hBat = '0' + hBat;
                if (mBat < 10) mBat = '0' + mBat;
                if (sBat < 10) sBat = '0' + sBat;
                if (isNaN(sBat)) {
                    hBat = '00';
                    mBat = '00';
                    sBat = '00';
                }

                var status = 'charging';
                var time = hBat + ':' + mBat + ':' + sBat;
            } else {
                var hBat = Math.floor(battery.dischargingTime / 3600);
                var mBat = Math.floor((battery.dischargingTime % 3600) / 60);
                var sBat = Math.floor((battery.dischargingTime % 3600) % 60);

                if (hBat < 10) hBat = '0' + hBat;
                if (mBat < 10) mBat = '0' + mBat;
                if (sBat < 10) sBat = '0' + sBat;
                if (isNaN(sBat)) {
                    hBat = '00';
                    mBat = '00';
                    sBat = '00';
                };

                var status = 'discharging';
                var time = hBat + ':' + mBat + ':' + sBat;
            }

            // Icons are missing in Google's font
            // if (battery.level > 0) $('#battery').html('<i class="material-icons">battery_alert</i>');
            // if (battery.level > 0.1) $('#battery').html('<i class="material-icons">battery_20</i>');
            // if (battery.level > 0.2) $('#battery').html('<i class="material-icons">battery_30</i>');
            // if (battery.level > 0.3) $('#battery').html('<i class="material-icons">battery_50</i>');
            // if (battery.level > 0.5) $('#battery').html('<i class="material-icons">battery_60</i>');
            // if (battery.level > 0.6) $('#battery').html('<i class="material-icons">battery_80</i>');
            // if (battery.level > 0.8) $('#battery').html('<i class="material-icons">battery_90</i>');
            // if (battery.level > 0.9) $('#battery').html('<i class="material-icons">battery_full</i>').show();

            // if (battery.level >= 0 && status == 'charging') $('#battery').html('<i class="material-icons">battery_charging_20</i>');
            // if (battery.level >= 0.2 && status == 'charging') $('#battery').html('<i class="material-icons">battery_charging_30</i>');
            // if (battery.level >= 0.3 && status == 'charging') $('#battery').html('<i class="material-icons">battery_charging_50</i>');
            // if (battery.level >= 0.5 && status == 'charging') $('#battery').html('<i class="material-icons">battery_charging_60</i>');
            // if (battery.level >= 0.6 && status == 'charging') $('#battery').html('<i class="material-icons">battery_charging_80</i>');
            // if (battery.level >= 0.8 && status == 'charging') $('#battery').html('<i class="material-icons">battery_charging_90</i>');

            if (battery.level > 0) $('#battery').html('<i class="material-icons">battery_alert</i>').css('color', 'red');
            if (battery.level > 0.2) $('#battery').html('<i class="material-icons">battery_full</i>').css('color', 'white');

            if (battery.level >= 0 && status == 'charging') $('#battery').html('<i class="material-icons">battery_charging_full</i>').css('color', 'white');
            if (battery.level >= 0.9 && status == 'charging') $('#battery').hide();

            $('#battery').attr('title', `${Math.round(battery.level * 100)}%`);
            if (time == '00:00:00') $('.control.battery>div').html(`${Math.round(battery.level * 100)}%, ${status}`);
            else $('.control.battery>div').html(`${Math.round(battery.level * 100)}%, ${status}<br>${time} left`);
        }
    });
}, 500);
// Battery - end

// Date
setInterval(() => {
    var now = new Date();
    var hours = now.getHours();
    var min = now.getMinutes();
    var day = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();

    if (hours < 10) hours = '0' + hours;
    if (min < 10) min = '0' + min;
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    $('#hours').text(`${hours}:${min}`);
    $('#day').text(`${day}.${month}.${year}`)
}, 500);
// Date - end

// Controls
$('#navbar').on('click', '#battery', function () {
    $('.control.battery').toggle();
});

$('#navbar').on('click', '#networking', function () {
    $('.control.networking').toggle();
});

setInterval(() => {
    if (navigator.onLine) {
        $('.control.networking>div').text('You\'re online');
        $('#networking').html('<i class="material-icons">signal_wifi_4_bar</i>');
        $('#networking').attr('title', 'Connected');
    } else {
        $('.control.networking>div').text('You\'re offline');
        $('#networking').html('<i class="material-icons">signal_wifi_0_bar</i>');
        $('#networking').attr('title', 'Disconnected');
    }
}, 500);
// Controls - end

// App drawer
// Toggle drawer
$('#navbar').on('click', '.menu', function () {
    $('.drawer').toggle();
});

$('.drawer').on('click', '.app', function () {
    $('.drawer').hide();
});
// Toggle drawer - end

// Display apps in drawer
var appList = [];
var tmpAppList = [];

$.ajax({
    url: 'apps/apps.json',
    success: (s) => {
        appList = s;
        appList.sort();
    },
    async: false
});

for (v of appList) {
    $(`<script src="apps/${v}/app.js"></script>`).insertBefore('script:last-child');
}

for (k in appList) {
    tmpAppList[k] = { 'name': appList[k], 'title': eval(appList[k]).title };
}

tmpAppList.sort(function (a, b) {
    var x = a.title.toLowerCase();
    var y = b.title.toLowerCase();
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
});

if (appList.length == 1 && appList[0] == '') {
    $('.drawer').append('<div class="no-app">Nothing here...</div>');
} else {
    for (var n of tmpAppList) {
        $('.drawer').append(`
            <div class="app" onclick="checkWindows(${eval(n.name).name})">
                <img src="${eval(n.name).icon.replace('/white/', '/black/')}">
                <span>${eval(n.name).title}</span>
            </div>
        `);
    }
}
// Display apps in drawer - end
// App drawer - end

// Activators
$('#navbar>.activators').on('click', '.enabled', function () {
    if (
        $(`.window[name="${$(this).attr('name')}"]`).attr('class').match(/top/ig) &&
        $(this).attr('class').match(/active/ig) ||
        $(this).attr('class').match(/active/ig) == null
    ) {
        $(this).toggleClass('active');
        $(`.window[name="${$(this).attr('name')}"]`).toggle();
    } else {
        $(`.window[name="${$(this).attr('name')}"]`).addClass('top');
    }
});
// Activators - end

// Drawing windows
stateButtons = () => {
    return `
        <div class="state minimize"><i class="material-icons">minimize</i></div>
        <div class="state maximize"><i class="material-icons">maximize</i></div>
        <div class="state close"><i class="material-icons">close</i></div>
    `;
}

bar = (icon, title, style) => {
    if (style == 'classic') {
        return `<div class="bar"><div class="icon" style="background-image:url(${icon})"></div><div class="title">${title}</div>${stateButtons()}</div>`;
    } else if (style == 'alert') {
        return `<div class="bar"><div class="icon" style="background-image:url(${icon})"></div><div class="title">${title}</div><div class="state close"><i class="material-icons">close</i></div></div>`;
    } else if (style == 'transparent') {
        return `<div class="bar" style="background-color:${style}">${stateButtons()}</div>`;
    } else if (style.match(/[0-9a-f]{6}/ig)) {
        return `<div class="bar" style="background-color:#${style}"><div class="icon" style="background-image:url(${icon})"></div><div class="title">${title}</div>${stateButtons()}</div>`;
    } else {
        return `<div class="bar"><div class="icon" style="background-image:url(${icon})"></div><div class="title">${title}</div>${stateButtons()}</div>`;
    }
}

newWindow = (name, icon, title, content, style) => {
    if (style == 'alert' || style == 'transparent') {
        $('#workspace').append(`<div class="window ${style}" name="${name}">${bar(icon, title, style)}<div class="content">${content}</div></div>`);
    } else {
        $('#workspace').append(`<div class="window" name="${name}">${bar(icon, title, style)}<div class="content">${content}</div></div>`);
    }
    $('.window:last-child').draggable();
    $(function () {
        $('.window:last-child').resizable();
    });
}

$('#workspace').on('click', '.window', function () {
    $('.window').removeClass('top');
    $(this).addClass('top');
});

$('.hide').on({
    'mouseenter': function () {
        $('.window').css('opacity', '0.5');
    },
    'mouseleave': function () {
        $('.window').css('opacity', '1');
    },
    'click': function () {
        $('.window').hide();
        $('.enabled').removeClass('active');
        $('.control').hide();
        $('.drawer').hide();
    }
});

$('#workspace').on('click', '.state.minimize', function () {
    $(this).closest('.window').hide();
    $(`.enabled[name="${$(this).closest('.window').attr('name')}"]`).toggleClass('active');
});

$('#workspace').on('click', '.state.maximize', function () {
    $(this).closest('.window').toggleClass('maximize ui-draggable ui-draggable-handle');
})

$('#workspace').on('click', '.state.close', function () {
    $(this).closest('.window').remove();
    $(`.enabled[name="${$(this).closest('.window').attr('name')}"]`).remove();
});
// Drawing windows - end

checkWindows = (n, c) => {
    if (n != undefined) {
        if (c == undefined) c = '';
        eval(n).app(c);
        $('.window').removeClass('top');
        $('.window:last-child').addClass('top');
        $('#navbar>.activators').append(`<div class="enabled active" title="${eval(n).title}" name="${eval(n).name}" style="background-image:url(${eval(n).icon.replace('-black', '-white')})"></div>`);
    } else {
        $('#navbar>.activators').html('<div class="menu"><i class="material-icons">apps</i></div>');
    }
}