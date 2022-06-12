$(function () {
    const form = layui.form;
  const initArtCateList = () => {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success: (res) => {
        // 调用 template
        if (res.status !== 0) return layer.msg("获取文章列表失败!");
        const htmlStr = template("tpl-table", res);
        $("tbody").empty().html(htmlStr);
      },
    });
  };
  initArtCateList();

  $("#btnAddCate").click(() => {
    layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
  });
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) return layer.msg("添加文章失败");
        layer.msg("添加文章成功");
        //重新渲染列表
        initArtCateList();
        //这是 layui自带的 关闭弹窗
        layer.close(indexAdd);
      },
    });
  });
  // 通过代理方式，为 btn-edit 按钮绑定点击事件
  let indexEdit = null;
  // 通过代理方式，为 btn-edit 按钮绑定点击事件
  $("tbody").on("click", ".btn-edit", function() {
    const id = $(this).attr("data-id");
    // 弹出修改文章分类的弹窗
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });
    // 发起请求获取对应分类的数据
    $.ajax({
        method: "GET",
        url: "/my/article/cates/" + id,
        success: function (res) {
            //form 是layui提供的
            form.val("form-edit", res.data);
        },
    });
    
  });

  $('body').on('submit','#form-edit',function(e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url:'/my/article/updatecate',
        data:$(this).serialize(),
        success: res => {
            if(res.status !== 0) return layer.msg('更新文章失败')
            initArtCateList();
            layer.close(indexEdit)
        }
    })
  })
  $('tbody').on('click','.btn-delete', function (e){
    e.preventDefault();
    const id = $(this).attr('data-id');
    // 提示用户是否删除
    // 提示用户是否删除
    layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
        $.ajax({
            type: "get",
            url:'/my/article/deletecate/' +id ,
            success: function (res) {
                if(res.status !==0) return layer.msg('删除文章失败')
                layer.msg('删除文章成功')
                initArtCateList();
                //询问完关闭窗口
            layer.close(index)
            }
        })
    });
  })
});
