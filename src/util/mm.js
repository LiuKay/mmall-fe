// 各种工具
//服务器地址
var conf = {
    serverHost: "http://localhost:8080/mmall/"
};
// 添加hogan组件用于渲染
// var Hogan = require("hogan");
var Hogan = require('hogan.js');
var mm = {

    //网络请求
    request: function(param) {
        var _this = this;
        $.ajax({
            type: param.method || "get",
            url: param.url || '',
            // url: 'http://' + param.url || '',
            dataType: param.dataType || 'json',
            data: param.data,
            success: function(res) {
                //请求成功也有很多种情况,根据我们的返回码来进行判断
                if (res.status === 0) {
                    // 请求成功
                    //要注意的是这里的param.success跟这里的success没有任何关系，如果他是一个函数，我们就调用回调函数进行成功的处理
                    // && 有点if的味道，如果前面的是错误的，因为短路，所以不会执行后面的，如果前面的是对的，还是要执行后面的代码，这是一种简化
                    typeof param.success === "function" && param.success(res);
                } else if (res.status === 10) {
                    // 需要登录，需要跳转登录页
                    _this.doLogin();
                } else if (res.status === 1) {
                    //请求数据错误，返回错误信息
                    typeof param.error === "function" && param.error(res.msg);
                }
            },
            error: function(err) {
                // 请求错误，比如哦404什么的,返回错误码
                typeof param.error === "function" && param.error(err.status);
            }
        })

    },
    //获取服务器地址
    getServerUrl: function(path) {
        return conf.serverHost + path;
        // return "happymmall.com:80/" + path;
    },
    getUrlParam: function(name) {
        // 得到某个url中某个参数的值
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        // alert(window.location.search);
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : '';
    },
    // 渲染html模版
    renderHtml: function(htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    // 成功提示
    successHint: function(msg) {
        alert(msg || "ok");
    },
    // 失败提示
    errorHint: function(msg) {
        alert(msg || "出现问题啦");
    },
    // 验证信息，对非空，字符串，手机号码
    validate: function(value, type) {
        value = $.trim(value);
        //验证非空
        if (type === "notEmpty") {
            return !!value;
        }
        //验证手机号码
        if (type === "phone") {
            return /^1\d{10}$/.test(value);
        }
        // 验证邮箱
        if (type === "email") {
            // return /^\w+@\w+(\.\w{2,}){1,3}$/.test(value);
            // alert(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value));
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);

        }
    },
    // 跳转主页页面
    goHome: function() {
        window.localtion.href = "./index.html";
    },
    //统一跳转登录页面
    doLogin: function() {
        //跳转后要记录是从哪个页面跳转过去的方便跳转回来
        window.location.href = "./login.html?redirect=" + window.location.href;
    }
}

//暴露接口
module.exports = mm;