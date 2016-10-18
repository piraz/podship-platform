System.config({
    paths: {
        "vendor/bootstrap/css/*.css": "/assets/bootstrap/css/*.css",
        "static/css/*.css": "/static/css/*.css",
        "can/*": "/vendor/canjs/can/*.js",
        bootstrap: "/vendor/bootstrap/js/bootstrap.js",
        i18next: "/vendor/i18next/i18next.js",
        "i18next/*": "/vendor/i18next/*",
        jquery: "/vendor/jquery/jquery.js",
        "jquery/*": "/vendor/jquery/*.js",
        "login": "/assets/components/login/login.js",
        "stylesheets/*.less": "/assets/stylesheets/*.less"
    },
    ext: {
        stache: 'can/view/stache/system'
    }
});
