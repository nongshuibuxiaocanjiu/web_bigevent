$(function() {
    const form =layui.form
    form.verify({
        nickname: (value) =>{
            if(value.length >6) return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
    })
    const user = () => {
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            success: res => {
                console.log(res);
                const{ status ,msg } = res
                if(status !== 0) return layer.msg('获取基本信息失败')
                layer.msg('获取基本信息成功')
                // console.log(msg);
                form.val("formUserInfo", res.data);
            }
        })
    }
    // 重置数据
    $('#btn-reset').click((e) => {
        e.preventDefault();
        user()
    })
    // 更新用户数据
    $('.layui-form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success: res => {
                // console.log(res);
                if(res.status !==0) return layer.msg('更新用户失败')
                layer.msg('更新用户成功')
                window.parent.getUserInfo()
            }
        })
    })
    user()
})