"use strict";
function getCookiesStr() {
    return document.cookie;
}
function getCookieObj() {
    var cookieObj = {};
    var cookieStr = getCookiesStr();
    var pairList = cookieStr.split(';');
    for (var _i = 0, pairList_1 = pairList; _i < pairList_1.length; _i++) {
        var pair = pairList_1[_i];
        var _a = pair.trim().split('='), key = _a[0], value = _a[1];
        cookieObj[key] = value;
    }
    return cookieObj;
}
function getCookiesJson() {
    var cookieObj = getCookieObj();
    return JSON.stringify(cookieObj);
}
function convertNetScopeCookies(copyFromChrome) {
    var cookieStr = '';
    var header = [
        '# Netscape HTTP Cookie File\n',
        '# generate by get-cookies userscript! Do not edit.\n\n',
    ];
    cookieStr += header.join('');
    var cookieslines = copyFromChrome.split('\n');
    console.log(cookieslines);
    console.log(copyFromChrome);
    for (var _i = 0, cookieslines_1 = cookieslines; _i < cookieslines_1.length; _i++) {
        var cookie = cookieslines_1[_i];
        var _a = cookie.split('\t'), name_1 = _a[0], value = _a[1], domain = _a[2], path = _a[3], expiration = _a[4], httpOnly = _a[6];
        if (!name_1)
            continue;
        if (domain.charAt(0) !== '.')
            domain = '.' + domain;
        httpOnly = httpOnly === '✓' ? 'TRUE' : 'FALSE';
        if (expiration === 'Session') {
            expiration = '' + new Date(Date.now() + 86400 * 1000).getTime() / 1000;
        }
        cookieStr +=
            [domain, 'TRUE', path, httpOnly, expiration, name_1, value].join('\t') +
                '\n';
    }
    return cookieStr;
}
function copyCookieJson() {
    var cookieJson = getCookiesJson();
    GM_setClipboard(cookieJson, { type: 'text', mimetype: 'text/plain' });
}
function copyCookieString() {
    GM_setClipboard(getCookiesStr(), { type: 'text', mimetype: 'text/plain' });
}
function createConfigUI() {
    var div = document.createElement('div');
    div.innerHTML = "\n  <textarea rows=\"20\" cols=\"100\" id=\"configUITextArea\"></textarea>\n  <div>\n  <button id=\"configUIConvert\">\u8F6C\u6362</button>\n  <button id=\"configUIcancel\">\u53D6\u6D88</button>\n  </div>\n  ";
    div.id = 'configUIdiv';
    div.style.cssText = 'display:none';
    document.body.appendChild(div);
    var cancelBtn = document.querySelector('#configUIcancel');
    cancelBtn.onclick = hideConfigUI;
    var convertBtn = document.querySelector('#configUIConvert');
    convertBtn.onclick = excuteConvert;
}
function hideConfigUI() {
    var div = document.querySelector('#configUIdiv');
    div.style.cssText = 'display:none';
}
function showConfigUI() {
    var div = document.querySelector('#configUIdiv');
    div.style.cssText =
        'width:800px;height:600px;position:fixed;left:0;right:0;top:0;bottom:0;margin:auto;';
}
function excuteConvert() {
    var cookieStr = document.querySelector('#configUITextArea').value;
    GM_setClipboard(convertNetScopeCookies(cookieStr), {
        type: 'text',
        mimetype: 'text/plain',
    });
}
;
(function () {
    function main() {
        createConfigUI();
        GM_registerMenuCommand('copy cookies string', copyCookieString);
        GM_registerMenuCommand('copy cookies json', copyCookieJson);
        GM_registerMenuCommand('convert cookies netscape', showConfigUI);
    }
    setTimeout(main, 3000);
})();
