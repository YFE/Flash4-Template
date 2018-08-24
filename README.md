# Flash4-Template
动画项目开发模板 for annie4 新版本

## 最近更新


## 使用步骤

安装FIS3

```
npm install -g fis3
```
> http://fis.baidu.com/fis3/docs/beginning/install.html

 进入source目录
```
cd source
```
运行测试流程
```
fis3 release dev -d -w
```
根据提示安装相应插件。
```
npm install -g fis-xxx-xxx
```

## 目录结构

 - /app/
    - config.php `活动配置`
- /source/ `源素材文件`
    - /assets/ `静态资源`
        - /css/  `以下文件在输出时会合并压缩为 style.css`
            - layout.styl `如需另写HTML，在此写相应CSS`
            - reset.styl/weui.styl `引用样式`
            - style.styl css `入口及输出文件`
        - /images/
            - share.jpg `分享小图`
        - /js/
            - libs/\*.js `各种库文件 在输出时会合并为base.js`
            - app.js `主程序文件`
    - /dist/   `flash输出后目标目录`
    - /flash/ `放置flash源文件`
    - fis-conf.js `fis3配置文件`
- index.php `入口`

## 已引进可以直接使用的库
jQuery 3.3.1

jweixin 1.3.2 
> 微信jssdk，支持小程序内嵌H5接口

weui.css 1.1.3
> https://github.com/weui/weui

weui.js 1.1.4
> https://github.com/weui/weui.js/blob/master/docs/README.md

gm.js
目前主要用于监测部署以及微信分享设置，可前往源码一览。

```javascript
gm.tracker.[page/event/link]()
gm.wxData
gm.loadImg()
```

loadash.js
> 实用工具库
> https://www.lodashjs.com/



## 开发流程
- clone 模板
- 把fla放进 fla 里
- 设置fla属性输出目录为campaign，输出
- 进入 fla/campaign，运行命令
```
cd fla/campaign
npm install
gulp build
gulp released
```
- 进入到 source ，运行 fis3 release dev -d -w 进行调测
```
cd source
fis3 release dev -d -w
fis3 release prod -d
```
