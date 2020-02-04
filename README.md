# Flash4-Template
动画项目开发模板 for annie4 新版本

## 最近更新
### 2019-10-22
1. 更新annie至最新版本
2. 修复iOS新系统下输入框不回弹问题
3. 去掉不自动resizey设置

### 2020-02-04
1. 更新annie至3.2.0
2. 更换默认压缩文件后缀为webp，
3. 更换默认类为ES6 class


## 增加编译快捷命令 

进入source后，运行sh命令
```sh
sh hi dev|pro|prod [fla]
```
举例说明：
1. 测试模式
```sh
sh hi dev
```
等于同
```sh
fis3 release dev -d -w
```
2. 重新编译FLA的测试模式
```sh
sh hi dev fla
```
等于同
```sh
cd ../fla/campaign && gulp build && gulp released && cd ../../source && fis3 release dev -d -w
```

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
- /fla/ `放置flash源文件`
    - /campaign/ `flash输出目录`
- /source/ `源素材文件`
    - /assets/ `静态资源`
        - /css/  `以下文件在输出时会合并压缩为 app.css`
            - font.styl `字体 CSS`
            - reset.styl `重置样式`
            - app.styl `动画页面样式`
            - page.styl `非动画页面开发使用样式，带px2rem转换`
        - /images/
        - /js/
            - libs/\*.js `各种库文件 在输出时会合并为base.js`
            - plugin\*.js `其他插件，引用时需自行引入`
            - app.js `主程序文件`
    - /dist/   `flash输出后目标目录`
    - fis-conf.js `fis3配置文件`
- /media/ 媒体资源文件夹
    - share.jpg `分享小图`
- /release/ 样式及动画资源文件夹

- index.php `入口`

## 已引进可以直接使用的库
* jQuery 3.3.1

* jweixin 1.4.0 
> 微信jssdk，支持小程序内嵌H5接口

* weui.css 2.0.0
> https://github.com/weui/weui

* weui.js 1.1.4
> https://github.com/weui/weui.js/blob/master/docs/README.md

* gm.js
目前主要用于监测部署以及微信分享设置，可前往源码一览。
```javascript
gm.tracker.[page/event/link]()
gm.wxData
gm.loadImg()
```

* loadash.js
> 实用工具库
> https://www.lodashjs.com/

## 视需求引进的其他库

* plugin/howler.min.js
声音播放组件

* plugin/iphone-inline-video.min.js
视频内嵌播放组件，于微博等APP中适配全屏视频播放使用

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
```sh
cd source
# 调试模式
fis3 release dev -d -w
# 生产 - 版本号后缀模式
fis3 release pro -d 
# 生产 - 版本号文件夹模式
fis3 release prod -d
```
