requirejs.config({
    baseUrl: 'js',
});

requirejs([
    "init",
    "lib/domReady"
],
function   (init, domReady) {
    domReady(init);
});