$(function () {
    getUserInfo()
    $('#btnLogout').on('click', function () {
        layer.confirm('您确定退出吗？', { icon: 3, title: '提示' }, function (index) {
            //do something
            layer.close(index);
            // 清空本地储存的localStorage值
            localStorage.removeItem('token')
            location.href = './login.html'
        });
    })
});
// 定义获取用户信息的函数
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            //console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        },


    })
}
// 定义函数渲染用户头像
function renderAvatar(user) {
    // 1.0:获取用户名称
    var name = user.nickname || user.username
    // 2.0 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3.按所需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1渲染图片图像
        $('.layui-nav-img').attr('scr', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}