// app.js

var sensors = require('./utils/zalldata.min');
// 配置初始化参数
sensors.setPara({
    name: 'sensors',
    server_url: 'https://logcollect.zalldata.cn/a?project=z7adds&service=zall',
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
        this.sensors = sensors

        // 初始化 SDK
        // 不使用 openid 作为匿名 ID
        // sensors.setOpenid('openid888', true);
        sensors.init();

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId

                // 如果需要使用 openid 作为匿名 ID，请单独获取 openid 之后调用 sensors.setOpenid() 方法
                wx.request({
                    url: '后端获取 OpenID 的请求',
                    success: function (res) {
                        if (res.OpenID) {
                            sensors.setOpenid(res.OpenID, true);
                            sensors.init();
                        }
                    },
                    error: function () {
                        // 如果获取 openid 失败，SDK 会以 UUID 作为匿名 ID 发数据
                        sensors.init();
                    }
                });
            }
        })
    },
    globalData: {
        userInfo: null
    }
})