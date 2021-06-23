/* eslint-disable @typescript-eslint/ban-ts-comment */
// const cookieStr = document.cookie

function getCookiesStr() {
  return document.cookie
}

function getCookiesJson() {
  const cookieObj: Record<string, string> = {}
  const cookieStr = getCookiesStr()
  const pairList = cookieStr.split(';')
  //   console.log(pairList)

  for (const pair of pairList) {
    const [key, value] = pair.trim().split('=')
    cookieObj[key] = value
  }
  return JSON.stringify(cookieObj)
  //   console.log(JSON.stringify(cookieObj))
}
// function getCookiesNetScope() {

// }
function copyCookieJson() {
  const cookieJson = getCookiesJson()
  // @ts-ignore
  GM_setClipboard(cookieJson, { type: 'text', mimetype: 'text/plain' })
}
function copyCookieString() {
  // @ts-ignore
  GM_setClipboard(getCookiesStr(), { type: 'text', mimetype: 'text/plain' })
}
;(async function main() {
  // 注册到菜单项
  // @ts-ignore
  GM_registerMenuCommand('copy cookies string', copyCookieString)
  // @ts-ignore
  GM_registerMenuCommand('copy cookies json', copyCookieJson)
  // @ts-ignore
  GM_registerMenuCommand('copy cookies netscape', copyCookieJson)
})()
