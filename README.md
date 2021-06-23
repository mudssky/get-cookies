# get-cookies
userscript for getting cookies   ,support json and netscape format

## 特性

- 使用JavaScriptAPI获取cookie,支持字符串和转换成json然后复制到剪切板
- 支持Netscape格式的cookie转换(需要你打开chrome开发工具复制)



## 关于JavaScript获取cookie的方法

JavaScript是一门十分孱弱的语言.

获取cookies的API是阉割版本的,在浏览器中无法获取完全的cookies.document.cookie获取的cookies只有键值对,而没有过期事件和域名等其他属性.

最关键的是,只要cookies被设置了httpOnly属性,你就无法通过API获取了.

所以我在想有什么其他方法绕过,比如用fetch发送请求,获取响应头中的cookies,但是貌似浏览器中的cookies,fetch的响应头中并不会包含cookies.

另外如果用油猴的GM_xmlhttpRequest也不能满足需求，我尝试用这个发送get请求，但是貌似把我当作一个新用户了，返回了响应头里只有一条set-cookies，不满足我获取所有cookies的需求。



chrome扩展的api里面是有能对cookies进行操作的。

但是因为这么简单的功能，并不是很想安装扩展来时刻占用我的内存，所以我才想开发一个脚本来实现功能。

最后我还是选择了一个笨办法。

因为浏览器F12打开开发者工具 Application选项里面是能看到cookies的。我们拖动鼠标选中，然后复制，这个字符串还并不符合netscape标准，但是我再写一个转化方法就行了。

还有遇到的一个坑是，JavaScript没有读取剪切板的办法，所以我只能给我的油猴脚本写一个ui。让用户复制到文本框里，然后用dom api获取文本。



## 使用方法

安装后点击tampermonkey的图标，功能都写到菜单上了。

脚本延迟几秒执行，所以菜单等几秒才会显示出来。

其中copy cookies string 和 copy cookies json 目前是用的document.cookies api获取的

convert cookies netscape 会呼出一个文本框，你把开发者工具cookies 界面用鼠标拖动全部复制到文本框，点转换就会把转换的结果放到你的剪切板里。









