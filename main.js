$(function() {
    //bodyの直下にこの拡張用のHTMLを生成する処理
    $("body").prepend("<div id='seo_replace_str'></div>");
    stylesheet = chrome.extension.getURL('style.css');
    sethtml0 = '<link rel="stylesheet" href="'+stylesheet+'" type="text/css">';
    sethtml1 = '<label>DB名前　<input type="text" id="DBname"></label>　　<label>変換前　<input type="text" id="before"></label>　<label>変換後　<input type="text" id="after"></label>';
    sethtml2 = '<input type="button" value="登録" id="submit_replace">    <label>削除モード<input type="checkbox" id="delete"></label>'
    sethtml3 = '<input type="button" value="呼び出し" id="call_str">'
    $("#seo_replace_str").html(sethtml0+sethtml1+sethtml2+sethtml3);

    var check = false;
    //メインの処理 登録ボタンを押すと処理がスタートします
    $("#submit_replace").click(function(){
        if($('#DBname').val()=="" || $('#before').val()=="" || $('#after').val()==""){
            //文字列が空の場合は何もしない
        }else{
            //DBnameのデータがあるか確認
            var str = localStorage.getItem($('#DBname').val());
            var arr_name;
            if (str == null) {
                //なければ新規作成
                arr_name = {a:'a'};
                delete arr_name.a;
            } else {
                //データがあるなら呼び出し
                arr_name =  JSON.parse(str);
            }

            if (check) {
                //データ削除
                delete arr_name[$('#before').val()];
            } else {
                //データ追加
                arr_name[$('#before').val()] = $('#after').val();
            }
            //データ登録
            localStorage.setItem($('#DBname').val(),JSON.stringify(arr_name));

            //呼び出し
            arr_name = JSON.parse(localStorage.getItem($('#DBname').val()));
            
            console.log(arr_name);
        }
    });
    //削除チェックボックス変更時
    $("#delete").change(function(){
        var del = $('#delete').prop('checked');
        if (del == true) {
            //削除モードON
            check = true;
        } else {
            //削除モードOFF
            check = false;
        }
    });
    //データ呼び出し
    $("#call_str").click(function(){
        if ($('#DBname').val()=="" || $('#before').val()=="") {
            //DBnameとbeforeが空なら何もしない
        } else {
            //DBnameのデータがあるか確認
            var str = localStorage.getItem($('#DBname').val());
            if (str == null) {
                //データベースがなければ終了
                return;
            }
            //全部呼び出し
            var arr_name =  JSON.parse(str);
            console.log(arr_name);
            //完全一致だけ呼び出し
            console.log(arr_name[$('#before').val()]);
        }
    });
});