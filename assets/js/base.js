var cookieName = 'theme';
var expires = new Date(Date.now() + 7 * 864e5).toUTCString();

function switchTheme(theme) {
    var switcher = document.querySelector('#themeswitcher');
    var body = document.body;
    var currTheme = body.classList.contains('day') ? 'day' : 'night';
    var newTheme = theme ? theme : (currTheme === 'day' ? 'night' : 'day');
    body.classList.remove(currTheme);
    body.classList.add(newTheme);
    document.cookie = cookieName + '=' + encodeURIComponent(newTheme) + '; expires=' + expires + '; path=/';
}

(function() {
    var theme = document.cookie.split('; ').reduce(function(k, v) {
        var parts = v.split('=');
        return parts[0] === cookieName ? decodeURIComponent(parts[1]) : k;
    }, 'night');
    if (theme.length > 0) switchTheme(theme);
})();

(function() {
    document.querySelectorAll('a').forEach(function(e) {
        e.getAttribute('href') && e.hostname !== location.hostname && (e.target = '_blank');
    });
})();
