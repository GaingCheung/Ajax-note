$(function(){
    // 获取评论
    function getCommentList(){
        $.ajax({
            method: 'GET',
            url:'http://www.liulongbin.top:3006/api/cmtlist',
            data:{},
            success: function(res){
                if(res.status !== 200){
                    return alert('获取评论失败');
                }
                var rows = [];
                $.each(res.data, function(i, item){
                    var str = '<li class="list-group-item"><span class="badge" style="background-color: #f0ad4e;">评论时间'+ item.time +'</span><span class="badge" style="background-color: #5bc0de;">评论人'+ item.username +'</span>'+ item.content +'</li>';
                    rows.push(str);
                })
                $('#cmt-list').empty();
                $('#cmt-list').append(rows);
            }
        })
    }
    getCommentList();

    // 发表评论
    $('#formAddcmt').submit(function(e){
        e.preventDefault();
        var data = $(this).serialize();
        $.post('http://www.liulongbin.top:3006/api/addcmt',data, function(res){
            if(res.status !== 201){
                return alert('评论发表失败');
            }
            getCommentList();
            $('#ipt-name').val('');
            $('#ipt-con').val('');
        })
    })

})