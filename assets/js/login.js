$(function () {
    // 点击去注册账号让 登录框隐藏，注册框显示
    $("#link_reg").click(() => {
      $(".login-box").hide();
      $(".reg-box").show();
    });
    // 点击去登录让 注册框隐藏，登录框显示
    $("#link_login").click(() => {
      $(".login-box").show();
      $(".reg-box").hide();
    });
 

  const form = layui.form;
  form.verify({
    // 自定义一个叫 pwd 的校验规则
    password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验两次密码是否一致的规则
    repwd:(val) => {
        // 通过形参拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败,则return一个提示消息即可
        const pwd = $(".reg-box [name=password").val();
        if(pwd !== val) return "两次密码不一致"
    }
  })
  //根路径
//   const baseUrl ='http://www.liulongbin.top:3007'

  $('#form_reg').submit((e)=> {
      e.preventDefault()
      $.ajax({
          type:'post',
          url:'/api/reguser',
          data: {
            username:$('#form_reg [name=username]').val(), 
            password:$('#form_reg [name=password]').val(),
          },
          success: (res) => {
              // console.log(res);
            const { status,message } = res
            if(status !==0) return layer.msg(message)
            layer.msg(message)
            $('#link_login').click()
          }
      })
      
  })

  $('#form_login').submit((e) => {
      e.preventDefault();
    //   console.log(e);
    //   console.log($(this).serialize);
      $.ajax({
          type: 'POST',
          url:'/api/login',
          data: $('#form_login').serialize(),
          success: (res) => {
              // console.log(res);
            const { status , token } = res
            if(status !== 0) return layer.msg('登录失败');
            layer.msg('登录成功');
            localStorage.setItem("token", res.token);
            location.href ='/index.html'
          }
      })
  })
});