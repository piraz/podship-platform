System.config({
    paths: {
        "vendor/bootstrap/css/*.css": "/assets/bootstrap/css/*.css",
        "static/css/*.css": "/static/css/*.css",
        "can/*": "/vendor/canjs/can/*.js",
        bootstrap: "/vendor/bootstrap/js/bootstrap.js",
        i18next: "/vendor/i18next/i18next.js",
        "i18next/*": "/vendor/i18next/*",
        "i18next-xhr-backend": "/vendor/i18next-xhr-backend/i18nextXHRBackend.js",
        "i18next-xhr-backend/*": "/vendor/i18next-xhr-backend/*",
        jquery: "/vendor/jquery/jquery.js",
        "jquery/*": "/vendor/jquery/*.js",
        "jquery-i18next": "/vendor/jquery-i18next/jquery-i18next.js",
        "jquery-i18next/*": "/vendor/jquery-i18next/*.js",
        "less/dist/less": "/vendor/less/less.js",
        "$css": "/vendor/steal-css/css.js",
        "steal-css": "/vendor/steal-css/css.js",
        "steal-less": "/vendor/steal-less/less.js",
        "steal-less": "/vendor/steal-less/less.js",
        "less-engine": "/vendor/steal-less/less-engine.js",
        "login": "/assets/components/login/login.js",
        "stylesheets/*.less": "/assets/stylesheets/*.less"
    },
    ext: {
        stache: 'can/view/stache/system',
        less: "steal-less",
        $css: "steal-css",
        css: "steal-css"
    }
});
