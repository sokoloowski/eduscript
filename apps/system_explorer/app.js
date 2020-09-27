var fs = require('fs');
var system_explorer = new App('system_explorer', 'Explorer', 'apps/system_explorer/icon-black.png');
system_explorer.removeFile = (file) => {
    delete path[file];
    fs.writeFileSync('apps/userApps.json', JSON.stringify(path, null, 4));
    system_explorer.readFiles();
    $('div[name="system_explorer"]>div.content').html(system_explorer.content + '<style>@import url(apps/system_explorer/style.css)</style>');
}

system_explorer.readFiles = () => {
    system_explorer.content = '';
    for (k in path) {
        system_explorer.content += `
        <p>
            ${k}
            <button title="Delete" onclick="system_explorer.removeFile('${k}')" class="red"><i class="material-icons">delete</i></button>
            <button title="Open in Codewriter" onclick="checkWindows(system_code,path['${k}'])"><i class="material-icons">code</i></button>
            <button title="Launch" onclick="${path[k].replace(/\"/ig, '&quot;')}"><i class="material-icons">launch</i></button>
            <button title="Install" onclick="system_settings.install(\`${k}\`,\`${path[k].replace(/\"/ig, '&quot;')}\`)"><i class="material-icons">save_alt</i></button>
        </p>`;
    }
}

system_explorer.functions = () => {
    system_explorer.readFiles();
}