$(function () {

  // 初始化右侧滚动条
  // 这个方法定义在scroll.js中
  resetui();

  // 点击发送按钮为右侧追加li
   $('#btnSend').on('click',function(){
    var text = $('#ipt').val().trim();
    // 判断输入内容是否为空
    if(text.length <= 0){
      return $('#ipt').val('');
    }
    $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>'+ $('#ipt').val() +'</span></li>');
    $('#ipt').val('');
    resetui();
    getMsg(text);
   })
   
  // 获取聊天机器人返回来的消息
  function getMsg(text){
    $.ajax({
      type:'GET',
      url:'http://www.liulongbin.top:3006/api/robot',
      data:{
        spoken: text
      },
      success: function(res){
        if(res.message === 'success'){
          var msg = res.data.info.text;
          $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>'+ msg +'</span></li>');
          resetui();
          getAudio(msg);
        }
      }
    })
  }

  // 把文字转化为语音
  function getAudio(text){
    $.ajax({
      type:'GET',
      url:'http://www.liulongbin.top:3006/api/synthesize',
      data:{
        text: text
      },
      success: function(res){
        if(res.message === 'success'){
          console.log(res);
          $('#voice').attr('src', res.voiceUrl)
        }
      }
    })
  }

  // 用回车键发送消息
  $('#ipt').on('keyup', function(e){
    if(e.keyCode === 13){
      $('#btnSend').click();
    }
  })
})