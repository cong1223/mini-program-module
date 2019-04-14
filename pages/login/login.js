var graceChecker = require("../../graceUI/graceChecker.js");
Page({
    data: {
        pnpre: '86',
        pnpres: ['86', '01', '11', '26', '520'],
        vcodeBtnName: "获取验证码",
        countNum: 120,
        countDownTimer: null,
        phoneno: ''
    },
    // 更改手机号码前缀
    changePre: function (e) {
        this.setData({
            pnpre: this.data.pnpres[e.detail.value]
        })
    },
    getVCode: function () {
        var myreg = /^[1][3,5,8][0-9]{9}$/;
        if (!myreg.test(this.data.phoneno)) {
            wx.showToast({
                title: '请正确填写手机号码',
                icon: "none"
            });
            return false;
        }
        // 手机号码为 :  this.data.phoneno
        // vcodeBtnName 可以阻止按钮被多次点击 多次发送 return 会终止函数继续运行
        if (this.data.vcodeBtnName != '获取验证码' && this.data.vcodeBtnName != '重新发送') {
            return;
        }

        this.setData({
            vcodeBtnName: "发送中..."
        });
        // 与后端 api 交互，发送验证码 【自己写的具体业务代码】
        // 假设发送成功，给用户提示
        wx.showToast({
            title: '短信已发送，请注意查收',
            icon: "none"
        });
        // 倒计时
        this.setData({
            countNum: 10
        });
        this.setData({
            countDownTimer: setInterval(function () {
                this.countDown();
            }.bind(this), 1000)
        });
    },
    countDown: function () {
        if (this.data.countNum < 1) {
            clearInterval(this.data.countDownTimer);
            this.setData({
                vcodeBtnName: "重新发送"
            });
            return;
        }
        this.data.countNum--;
        this.setData({
            countNum: this.data.countNum,
            vcodeBtnName: this.data.countNum + '秒重发'
        });
    },
    // 第三方 微信登录
    loginWithWx: function () {
        wx.showToast({
            title: '微信登录',
            icon: "none"
        });
    },
    // 第三方 qq登录
    loginWithQq: function () {
        wx.showToast({
            title: 'qq登录',
            icon: "none"
        });
    },
    // 第三方 微博登录
    loginWithWb: function () {
        wx.showToast({
            title: '微博登录',
            icon: "none"
        });
    },
    // 表单提交
    loginNow: function (e) {
        // 表单验证
        var rule = [{
                name: "pn",
                checkType: "phoneno",
                errorMsg: "请填写正确的手机号"
            },
            {
                name: "yzm",
                checkType: "string",
                checkRule: "4,6",
                errorMsg: "请正确填写短信验证码"
            },
        ];
        var formData = e.detail.value;
        var checkRes = graceChecker.check(formData, rule);
        if (checkRes) {
            wx.showToast({
                title: "请观察控制台",
                icon: "none"
            });
        } else {
            wx.showToast({
                title: graceChecker.error,
                icon: "none"
            });
        }
        console.log(e);
    },
    reg: function () {
        wx.showToast({
            title: "注册页面类似登录，请自行完善 (:",
            icon: "none"
        });
    },
    phonenoInput: function (e) {
        this.setData({
            phoneno: e.detail.value
        });
    }
})