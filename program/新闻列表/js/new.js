$(function(){
    template.defaults.imports.dataFormat = function(dtstr){
        var dt = new Date(dtstr);

        var y = dt.getFullYear();
        var m = dt.getMonth() + 1;
        var d = dt.getDate();

        m = m < 10? '0' + m: m;
        d = d < 10? '0' + d: d;

        var hh = dt.getHours();
        var mm = dt.getMinutes();
        var ss = dt.getSeconds();

        hh = hh < 10? '0' + hh: hh;
        mm = mm < 10? '0' + mm: mm;
        ss = ss < 10? '0' + ss: ss;

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm +':' + ss;
    }


    function getNewsList(){
        $.get('http://www.liulongbin.top:3006/api/news', function(res){
            if(res.status !== 200){
                return alert('请求失败');
            }
            // console.log(res);
            for(var i = 0; i < res.data.length; i++){
                res.data[i].tags = res.data[i].tags.split(',');
            }
            var str = template('tpl-news',res);
            $('#news-list').html(str);
        })
    }
    getNewsList()
}) 