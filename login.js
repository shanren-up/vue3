$(function() {

    /***
     * check mobile phone:(1)must be digit;(2)must be 11
     * @param string
     * @returns {boolean}
     */
    function checkMobilePhone(string) {
        var pattern = /^1[3-9]\d{9}$/;
        if (pattern.test(string)) {
            return true;
        }
        console.log('check mobile phone ' + string + ' failed.');
        return false;
    }

    //发送短信随机码
    $('#login_sjm').click(function() {

        var mobilePhone = $("#login_name").val();
        if (checkMobilePhone(mobilePhone) === false) {
            alert("请填写有效的手机号！");
            $("#login_name").focus();
            return;
        }
        generateMessageCode(mobilePhone, function(data) {
            if (data) {
                alert("短信随机码发送成功！");
            } else {
                alert("手机号码不正确！");
                $("#login_name").focus();
            }
        });

    });

    //刷新验证码
    $('#yzm_a').click(function() {
        var img = $('#yzm_img')[0];
        //重新加载
        img.src = img.src + "?" + Math.random();
    });

    //登录验证
    $('#submit_btn').click(function() {

        var userName = $("#login_name").val();
        var userPWD = $("#login_pwd").val();
        var loginType = "1";
        if (checkMobilePhone(userName) === true) {
            loginType = "2";
        }
        login(userName, userPWD, loginType, function(data) {
            if (data.status === 0) {
                //登录成功
                window.location.href = 'index.html';
            }
        });

    });


});