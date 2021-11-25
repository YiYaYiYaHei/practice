# 说明
使用uni-app搭建的一个简单框架，目前只做了微信小程序兼容，如需其他端使用，需要自行适配

# 快速上手
> 初步跑动
- 下载HBuilderX编辑器，最好使用最新稳定版
- 修改根目录下manifest.json配置文档
- 点击编辑器菜单->运行，运行到指定的端

> 上手操练
- 创建页面：pages下面创建页面，引入所需组件,pages.json修改配置，运行查看效果
- 请求配置：修改apis/url.config.js请求url,在apis/xxxx.js添加接口请求方法，页面 `this.$apis.xxxx.接口请求方法名` 引用
- 状态机配置：store/index.js添加state，完全按照vuex操作
- 其他操作，查看项目结构

# 项目结构
```
├─apis                         // 封装请求
│  │  url.config.js            // BASE_URL配置
│  └─ index.js                 // 接口请求地址，(按模块在/apis下创建js文件)
│
├─styles                      // scss资源
│  │  common.scss             // 全局class名
│  └─ uni.scss                // uni.scss
│
├─common                      // 公共文件
│  │  components              // 全局组件
│  │  directives              // 全局指令
│  │  componenets.js          // 引入/common/components夹下的.vue结尾的组件
│  │  directives.js           // 引入/common/directives夹下的.js结尾的指令
│  │  filters.js              // 全局过滤器
│  │  prototypes.js           // 全局原型
│  └─ index.js                // 注册全局组件、指令、原型、过滤器
│
├─mininxs                     // 混入
│  └─ index.js                // 引入/mininxs夹下的.js结尾的文件（按模块划分mininx）
│
├─pages                       // 主包（按模块划分）
│
├─subPackages                // 分包，按需可再分包
│
├─plugins                    // 插件
│  └─luch-request            // ajax
│ 
├─static                    // 静态文件，不会被打包压缩，大图建议上传至服务器使用
│  │  logo.png
│  │  uni.ttf
│  │
│  └─images
│
├─store                    // vuex状态处理器
│  └─index.js
│
│─uni_modules              // uni-ui组件
│
│─unpackage                // 打包后的文件，可随时删除重新编译
│
├─utils                    // 工具方法
│  │  request.js           // ajax封装
│  │  tools.js             // 工具方法（已挂载至原型上，this.$tools）
│  │	uniTools.js         // uni-app  API部分方法封装（已挂载至原型上，this.$uniTools）
│  └─ validates.js        // 表单校验方法（已挂载至原型上，this.$validates）
│
├─App.vue                // 程序入口界面，只能写js
│
├─main.js                // 程序入口文件，全局挂在在此修改
│
├─pages.json            // 页面路由文档，router插件，需要自己引入改动
│
├─uni.scss              // 全局公用变量或方法

```
# 踩坑记录
> 服务器获取openid、sessionKey
1. 注意mainfest.json -> mp-weixin：appid 要 和后台保持一致，否则会报40029（code无效）
---

> pages.json：pages -> style -> navigationStyle:custom
1. 非H5端，手机顶部状态栏区域会被页面内容覆盖。这是因为窗体是沉浸式的原因，即全屏可写内容。uni-app提供了状态栏高度的css变量--status-bar-height，如果需要把状态栏的位置从前景部分让出来，可写一个占位div，高度设为css变量。
---

> background 背景图相关
1. 小程序不支持本地图片，只支持网络访问或者base64：当图片大小<40kb时，uni-app会自动转换为base64格式，>40kb时，不会自动转换，需要人工转换
---

> uni-forms相关
1. Forms Props: 使用modelValue无法实现表单校验，改为v-model/value
2. 使用uni-easyinput 和 uni-data-checkbox 等关联组件，只需绑定 v-model，无需其他操作
3. 使用原生 input、checkbox 或三方组件等，需要给组件绑定 binddata 方法才能触发表单校验
4. validateFunction自定义校验规则：此时设置rules无效，需要在onReady生命周期调用组件的setRules方法绑定验证规则
---

> 状态栏、胶囊
1. 设置状态栏字体颜色： page.jsoan -> navigationBarTextStyle
2. 微信小程序右上角的胶囊无法去除，可以通过uni.getMenuButtonBoundingClientRect()获取胶囊尺寸
---

> video
1. src使用本地路径(/static.images/.mp4 或 ../../static/images/.mp4)，无法播放；需要使用网络路径http://xx
---

> scroll-view
1. scroll-x：横向滚动未生效时，试试给scroll-view元素添加white-space: nowrap;
2. scroll-view使用flex布局时：① flex不能直接添加到scroll-view上，需要在scroll-view下创建view元素包裹，给view元素添加flex布局；② 内容被遮盖时：使用定位（view绝对定位，scroll-view相对定位）并给view设置min-width
---

> dom操作
1. uni.createSelectorQuery().select('#box')无法获取子组件的dom，需要通过refs调用子组件的getDom方法
2. uni-app不能对节点进行增删改查操作，目前只能获取到位置信息

>上拉加载
1. 可以设置页面上拉触底事件触发时距页面底部距离： pages.json -> onReachBottomDistance（默认50px）
2. 添加页面生命周期onReachBottom并手动调用this.reachBottomEvt();，在onLoad生命周期中，为this.requestListParams参数赋值并调用this.getList()
---

>下拉刷新
1. 设置允许下拉刷新：pages.json -> "enablePullDownRefresh": true
2. 添加页面生命周期onPullDownRefresh并手动调用this.refreshList('pullDownRefresh');
---

> 图片预览：previewImage
1. 可以实现轮播式图片预览
2. 长按图片操作：uni.previewImage -> longPressActions参数 无法修改长按设置；plus.nativeUI.previewImage可以设置自定义长按操作，但是仅限APP；小程序和H5 没有plus
---

> v-for  key相关
1. v-for的key使用模板字符串（如`color_${i}`）,控制台依旧会报警告，建议直接使用数据中的唯一性标识，比如item.id
---

> v-if
1. 使用v-if直接判断数据类型时，会报错，建议$tools.getDataType(value, String);