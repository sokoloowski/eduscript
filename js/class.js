class App {
    constructor(name, title = 'Okno', icon = 'apps/default/icon-black.png', style = 'classic') {
        this.name = name;
        this.icon = icon;
        this.title = title;
        this.content = '';
        this.style = style;
    }
    functions() {}
    app() {
        this.functions();
        this.content += `<style>@import url(apps/${this.name}/style.css)</style>`;
        newWindow(this.name,this.icon,this.title,this.content,this.style);
    }
}