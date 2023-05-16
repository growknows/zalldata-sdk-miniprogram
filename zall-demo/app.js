// app.js

var zalldata = require('./utils/zalldata.min');
// 配置初始化参数
// https://coll-cdp.super.jinyafumall.com/sa?project=jinyafu&service=jinyafu&token=73a1d0e28c8af0e9144a360eebd7fbbe
zalldata.setPara({
    name: 'zall',
    server_url: '',
    // 全埋点控制开关
    autoTrack: {
        appLaunch: true, // 默认为 true，false 则关闭 $MPLaunch 事件采集
        appShow: true, // 默认为 true，false 则关闭 $MPShow 事件采集
        appHide: true, // 默认为 true，false 则关闭 $MPHide 事件采集
        pageShow: true, // 默认为 true，false 则关闭 $MPViewScreen 事件采集
        pageShare: true, // 默认为 true，false 则关闭 $MPShare 事件采集
        mpClick: false, // 默认为 false，true 则开启 $MPClick 事件采集
        mpFavorite: true, // 小程序收藏，默认为 true，false 则关闭 $MPAddFavorites 事件采集
        pageLeave: false // 默认为 false， true 则开启 $MPPageLeave事件采集
    },
    // 自定义渠道追踪参数，如 source_channel: ["custom_param"]
    source_channel: ['custom_param'],
    // 是否允许控制台打印查看埋点数据(建议开启查看)
    show_log: true,
});

App({
    onLaunch() {
        this.zalldata = zalldata 
        // 方案一: 单id上报
        // zalldata.register({
        //   $distinctIdType: 4
        // })
        // zalldata.instance.setOpenid('oP3Ud5eP6YmEvgSOZxVVKrbyYcch', true)
        // zalldata.init();
        //
        // return


         // 方案二: 关联 OpenID 和 UnionID
          // 设置id类型
          zalldata.registerApp({
            $distinctIdType: 4
        })
        setTimeout(() => {
             // 设置 openid 为 distinctId 
            zalldata.setOpenid('oP3Ud5eP6YmEvgSOZxVVKrbyYcch', true)
           
            // 初始化 SDK
            zalldata.init();
            // 多通达触达用户合并策略，unionid和openid合并成同一用户
            zalldata.registerApp({
                $distinctIdType: 3,
                $originalIdType: 4
            })
            zalldata.login('o_-H853QjMO9Q_YuxKYXEW1DjeEYch')
        }, 1000)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId

                // 如果需要使用 openid 作为匿名 ID，请单独获取 openid 之后调用 sensors.setOpenid() 方法
                wx.request({
                    url: '后端获取 OpenID 的请求',
                    success: function (res) {
                        zalldata.setOpenid('oP3Ud5eP6YmEvgSOZxVVKrbyYcch', true)
                        zalldata.registerApp({
                            $originalIdType: 4
                        })
                        zalldata.init();
                    },
                    error: function () {
                        // 如果获取 openid 失败，SDK 会以 UUID 作为匿名 ID 发数据
                        zalldata.init();
                    }
                });
            }
        })
    },
    globalData: {
        userInfo: null
    }
})