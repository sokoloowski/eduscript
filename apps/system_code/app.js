var fs = require('fs');
var system_code = new App('system_code', 'Codewriter', 'apps/system_code/icon-black.png');

system_code.save = () => {
    code = $('textarea').val().split('\n');
    if (code[0].match(/new App/ig)) newAppVariable = $('textarea').val().substr(0, $('textarea').val().indexOf('=')).replace('var', '').trim();
    else newAppVariable = code[0].replace('//', '').trim();
    path[newAppVariable] = $('textarea').val();
    fs.writeFileSync('apps/userApps.json', JSON.stringify(path, null, 4));
}

system_code.launch = () => {
    code = $('textarea').val().split('\n');
    for (var v of code) {
        try {
            eval(v);
        }
        catch (error) {
            newWindow(
                'system_code_codeError',
                'icons/error.png',
                'Error',
                `<div class="error">
                    <i style="padding-right:10px;font-size:100px;color:red;" class="material-icons">error</i>
                    <p style="text-align: center;width: -webkit-fill-available;margin-top: -30px;">${error}</p>
                </div>`,
                'alert'
            );
            break;
        }
    }
    if (code[0].match(/new App/ig)) {
        newAppVariable = $('textarea').val().substr(0, $('textarea').val().indexOf('=')).replace('var', '').trim();
        checkWindows(eval(newAppVariable));
    }
}

system_code.content = '<textarea wrap="off" data-limit-rows="true" rows="1500" cols="94"></textarea>';

system_code.app = (c) => {
    system_code.content += `<style>@import url(apps/${system_code.name}/style.css)</style>`;
    if (typeof c != 'string') c = '// Enter name here';
    $('#workspace').append(`
        <div class="window" name="${system_code.name}">
            <div class="bar">
                <div class="icon" style="background-image:url(${system_code.icon})"></div>
                <div class="icon action" onclick="system_code.save()" title="Save"><i class="material-icons">save</i></div>
                <div class="icon action" onclick="system_code.launch()" title="Launch"><i class="material-icons">launch</i></div>
                <div class="title">${system_code.title}</div>
                ${stateButtons()}
            </div>
            <div class="content">
                ${system_code.content}
            </div>
        </div>
    `);
    $('.window:last-child').draggable();
    $(function () {
        $('.window:last-child').resizable();
        $('textarea').val(c);
    });
    $('textarea[data-limit-rows=true]').on('keypress', function (event) {
        var textarea = $(this),
            text = textarea.val(),
            numberOfLines = (text.match(/\n/g) || []).length + 1,
            maxRows = parseInt(textarea.attr('rows'));

        if (event.which === 13 && numberOfLines >= maxRows) {
            return false;
        }
    });
};