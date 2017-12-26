var SiteConf = (function() {

    var cookieName = 'theme';
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
        setCookie,
        getCookie,
        switchTheme
    };
})();

(function() {
    var theme = SiteConf.getCookie(SiteConf.cookieName, 'night');
    if (theme.length > 0) SiteConf.switchTheme(theme);
})();

(function() {
    document.querySelectorAll('a').forEach(function(e) {
        e.getAttribute('href') && e.hostname !== location.hostname && (e.target = '_blank');
    });
})();
