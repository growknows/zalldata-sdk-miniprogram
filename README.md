# 1. 集成SDK

## 1.1. 引入 SDK

- 将 **zalldata.min.js** 文件放入小程序项目中
- 在 **app.js** 文件中通过 ***require()*** 引入 SDK

```js
  var zall = require('./utils/zalldata.min.js');
```

## 1.2. 配置初始化参数

- 引入 SDK 后，可通过 ***setPara()*** 进行 SDK 初始化参数配置：

```js
   zall.setPara({
	name: 'zall',
	server_url: '您的数据接收地址',
	// 全埋点控制开关
	autoTrack: {},
	// 自定义渠道追踪参数，如source_channel: ["custom_param"]
	source_channel: [],
	// 是否允许控制台打印查看埋点数据(建议开启查看)
	show_log: true,
	// 是否允许修改 onShareAppMessage 里 return 的 path，用来增加(登录 ID，分享层级，当前的 path)，在 app onShow 中自动获取这些参数来查看具体分享来源、层级等
	allow_amend_share_path: true
   });
```

## 1.3. 初始化 SDK

1. 调用 ***setOpenid()*** 将匿名 ID 修改为 OpenID;
2. 调用 ***init()*** 方法来初始化 SDK：

```js
// 初始化 SDK
   wx.request({
	url: '后端获取 OpenID 的请求',
	success: function(res){
		if(res.OpenID){
			zall.setOpenid(res.OpenID);	
		}
		
	},
	complete: function(){
		zall.init();
	}
   });
```

- 在调用 ***init()*** 接口之前，采集的数据被缓存在内存中；调用 ***init()*** 接口后，会将缓存的数据通过网络发送出去。

# 2. SDK 基本配置

## 2.1. 配置项目数据接收地址

- 在 setPara 接口中设置 server_url，server_url 的域名需要按照微信小程序要求（https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html）配置到微信后台 request 合法域名列表中。

## 2.2. 开启全埋点

***setPara()*** 函数中 **autoTrack** 可用于配置需要开启的全埋点类型：

```js
   zall.setPara({
	autoTrack:{ 
	    appLaunch: true, // 默认为 true，false 则关闭 $MPLaunch 事件采集
	    appShow: true, // 默认为 true，false 则关闭 $MPShow 事件采集
	    appHide: true, // 默认为 true，false 则关闭 $MPHide 事件采集
	    pageShow: true, // 默认为 true，false 则关闭 $MPViewScreen 事件采集
	    pageShare: true, // 默认为 true，false 则关闭 $MPShare 事件采集
	    mpClick: false, // 默认为 false，true 则开启 $MPClick 事件采集 
	    mpFavorite: true // 默认为 true，false 则关闭 $MPAddFavorites 事件采集
	}

	/**
	 * 其他配置
	 */
   });
```

## 2.3. 设置事件公共属性

对于所有事件都需要添加的属性，可在初始化 SDK 前，调用 ***registerApp()*** 将属性注册为公共属性：

```js
   zall.registerApp({
	userLever: 'VIP3',
	userSex: '男'
   });
```



## 2.4. 用户登录

当用户注册成功或者登录成功时，需要调用 ***login()*** 方法传入登录 ID：

```js
  zall.login("登录 ID");
```

对于自动登录的用户，可以在 SDK 初始化前，获取登录 ID 并调用 ***login()*** 方法。

## 2.5. 代码埋点追踪事件

可通过 ***track()*** 方法追踪用户行为事件，并为事件添加自定义属性：

```js
   getApp().zall.track('click',{
      name: '点击'
   });
```

# 3. 调试查看事件信息

## 3.1. 事件的触发日志

***setPara()*** 配置初始化参数时，通过 ***show_log: true*** 打开 Log 功能且 SDK 完成初始化后（即 ***init()*** 方法调用后），微信开发者工具 **console** 会打印采集的数据信息

## 3.2. 事件的发送情况

事件数据发送成功时，可以在微信开发者工具的 **Network** 模块中，可以看到的请求

## 4.1. 设置用户属性

***setProfile( properties ):*** 可以设定用户属性，同一个 key 多次设置时，value 值会进行覆盖替换：

```js
    zall.setProfile({
	email:'xxx@xx',
	favoriteFruits: ['苹果', '油桃'],
	subscribers: 7277
    });
```

## 4.2. 渠道追踪

用户通过含有 **utm** 相关参数的路径访问小程序时，预置事件 **$MPLaunch、$MPShow、$MPViewScreen** 会解析启动路径中的 **utm** 相关参数作为自身的属性与属性值，并会设置 **$latest_utm** 相关属性到所有事件中，该特性在小程序的生命周期内有效。
