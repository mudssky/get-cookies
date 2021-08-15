/* eslint-disable @typescript-eslint/ban-ts-comment */
function getCookiesStr() {
  return document.cookie
}
function getCookieObj() {
  const cookieObj: Record<string, string> = {}
  const cookieStr = getCookiesStr()
  const pairList = cookieStr.split(';')
  //   console.log(pairList)

  for (const pair of pairList) {
    const [key, value] = pair.trim().split('=')
    cookieObj[key] = value
  }
  return cookieObj
}
function getCookiesJson() {
  const cookieObj = getCookieObj()
  return JSON.stringify(cookieObj)
  //   console.log(JSON.stringify(cookieObj))
}

// function formatCookie(cookieObj: Record<string, string>) {
//   return [
//     [
//       cookieObj.httpOnly ? '#HttpOnly_' : '',
//       !cookieObj.hostOnly &&
//       cookieObj.domain &&
//       !cookieObj.domain.startsWith('.')
//         ? '.'
//         : '',
//       cookieObj.domain,
//     ].join(''),
//     cookieObj.hostOnly ? 'FALSE' : 'TRUE',
//     cookieObj.path,
//     cookieObj.secure ? 'TRUE' : 'FALSE',
//     cookieObj.session || !cookieObj.expirationDate
//       ? 0
//       : cookieObj.expirationDate,
//     cookieObj.name,
//     cookieObj.value + '\n',
//   ].join('\t')
// }

function convertNetScopeCookies(copyFromChrome: string) {
  let cookieStr = ''
  const header = [
    '# Netscape HTTP Cookie File\n',
    '# generate by get-cookies userscript! Do not edit.\n\n',
  ]
  cookieStr += header.join('')
  const cookieslines = copyFromChrome.split('\n')

  // console.log('# Netscape HTTP Cookie File')
  console.log(cookieslines)
  console.log(copyFromChrome)
  for (const cookie of cookieslines) {
    // eslint-disable-next-line prefer-const
    let [name, value, domain, path, expiration /* size */, , httpOnly] =
      cookie.split('\t')
    if (!name) continue
    if (domain.charAt(0) !== '.') domain = '.' + domain
    httpOnly = httpOnly === '✓' ? 'TRUE' : 'FALSE'
    if (expiration === 'Session') {
      expiration = '' + new Date(Date.now() + 86400 * 1000).getTime() / 1000
    } else {
      expiration = '' + Math.floor(new Date(expiration).getTime())
    }

    cookieStr +=
      [domain, 'TRUE', path, httpOnly, expiration, name, value].join('\t') +
      '\n'
  }
  return cookieStr
}
function copyCookieJson() {
  const cookieJson = getCookiesJson()
  // @ts-ignore
  GM_setClipboard(cookieJson, { type: 'text', mimetype: 'text/plain' })
}
function copyCookieString() {
  // @ts-ignore
  GM_setClipboard(getCookiesStr(), { type: 'text', mimetype: 'text/plain' })
}
function createConfigUI() {
  const div = document.createElement('div')
  div.innerHTML = `
  <textarea rows="20" cols="100" id="configUITextArea"></textarea>
  <div>
  <button id="configUIConvert">转换</button>
  <button id="configUIcancel">取消</button>
  </div>
  `
  div.id = 'configUIdiv'
  div.style.cssText = 'display:none'
  document.body.appendChild(div)
  const cancelBtn = document.querySelector('#configUIcancel')
  // @ts-ignore
  cancelBtn.onclick = hideConfigUI
  const convertBtn = document.querySelector('#configUIConvert')
  // @ts-ignore
  convertBtn.onclick = excuteConvert
}
function hideConfigUI() {
  const div = document.querySelector('#configUIdiv')
  // @ts-ignore
  div.style.cssText = 'display:none'
}
function showConfigUI() {
  const div = document.querySelector('#configUIdiv')
  // @ts-ignore
  div.style.cssText =
    'width:800px;height:600px;position:fixed;left:0;right:0;top:0;bottom:0;margin:auto;'
}
function excuteConvert() {
  // @ts-ignore
  const cookieStr = document.querySelector('#configUITextArea').value
  // @ts-ignore
  GM_setClipboard(convertNetScopeCookies(cookieStr), {
    type: 'text',
    mimetype: 'text/plain',
  })
}
;(function () {
  function main() {
    createConfigUI()
    // 注册到菜单项
    // @ts-ignore
    GM_registerMenuCommand('copy cookies string', copyCookieString)
    // @ts-ignore
    GM_registerMenuCommand('copy cookies json', copyCookieJson)
    // @ts-ignore
    // GM_registerMenuCommand('convert cookies netscape', copyNetscapeCookies)

    GM_registerMenuCommand('convert cookies netscape', showConfigUI)
  }

  setTimeout(main, 3000)
})()
