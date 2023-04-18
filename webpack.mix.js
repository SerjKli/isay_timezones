let mix = require("laravel-mix");

mix.setPublicPath("./")
    .sass("assets/styles/popup.scss", "dist/css")
    .js("assets/scripts/content.js", "dist/scripts")
    .js("assets/scripts/popup.js", "dist/scripts")
    .vue()
    .options({
        processCssUrls: false,
    });
