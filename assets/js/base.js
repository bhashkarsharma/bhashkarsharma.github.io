var cookieName = 'theme';
var expires = new Date(Date.now() + 7 * 864e5).toUTCString();

function switchTheme(theme) {
    var switcher = document.querySelector('#themeswitcher');
    var stylesheet = document.querySelector('#sitetheme');
    var currTheme = stylesheet.href.includes('day') ? 'day' : 'night';
    var newTheme = theme ? theme : (stylesheet.href.includes('day') ? 'night' : 'day');
    var newHref = stylesheet.href.replace(currTheme, newTheme);
    stylesheet.href = newHref;
    document.cookie = cookieName + '=' + encodeURIComponent(newTheme) + '; expires=' + expires + '; path=/';
}

(function() {
    var theme = document.cookie.split('; ').reduce(function(k, v) {
        var parts = v.split('=');
        return parts[0] === cookieName ? decodeURIComponent(parts[1]) : k;
    }, '');
    if (theme.length > 0) switchTheme(theme);
})();

(function() {
    document.querySelectorAll('a').forEach(function(e) {
        e.getAttribute('href') && e.hostname !== location.hostname && (e.target = '_blank');
    });
})();