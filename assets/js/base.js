var SiteConf = (function() {

    var cookieName = 'siteTheme';
    var expires = new Date(Date.now() + 7 * 864e5).toUTCString();

    function setCookie(key, val, expires) {
        document.cookie = key + '=' + val + '; expires=' + expires + '; path=/';
    }

    function getCookie(key, defVal) {
        return document.cookie.split('; ').reduce(function(k, v) {
            var parts = v.split('=');
            return parts[0] === key ? decodeURIComponent(parts[1]) : k;
        }, defVal);
    }

    function deleteCookie(key) {
        setCookie(cookie, null, 'Thu, 01 Jan 1970 00:00:01 GMT');
    }

    function getThemeByTOD() {
        var h = new Date().getHours();
        return h > 17 ? 'night' : (h > 5 ? 'day' : 'night');
    }

    function switchTheme(theme, persist=true) {
        var switcher = document.querySelector('#themeswitcher');
        var body = document.body;
        var currTheme = body.classList.contains('day') ? 'day' : 'night';
        var newTheme = theme ? theme : (currTheme === 'day' ? 'night' : 'day');
        body.classList.remove(currTheme);
        body.classList.add(newTheme);
        if (persist) {
            setCookie(cookieName, encodeURIComponent(newTheme), expires);
        }
    }

    return {
        cookieName,
        getCookie,
        setCookie,
        deleteCookie,
        getThemeByTOD,
        switchTheme
    };
})();

(function() {
    var theme = SiteConf.getCookie(SiteConf.cookieName, SiteConf.getThemeByTOD());
    if (theme.length > 0) SiteConf.switchTheme(theme, false);

    document.querySelectorAll('a').forEach(function(e) {
        e.getAttribute('href') && e.hostname !== location.hostname && (e.target = '_blank');
    });
})();
