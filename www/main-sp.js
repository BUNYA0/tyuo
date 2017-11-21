window.onload = function(){

  var currentMode = 'portrait';
  var output = document.getElementById('output');

  // Milkcocoa側のデータにアクセスするためのオブジェクトを生成します
  // app_idは自分のものに書き換えてください
  var milkcocoa = new MilkCocoa("teaja1vzayz.mlkcca.com");
  // 今回、データストアの名前を 'gravity' としています
  var ds = milkcocoa.dataStore('gravity');

  window.addEventListener('devicemotion', function(e){
    gravity = e.accelerationIncludingGravity;

    output.innerHTML = 'x方向: '+ gravity.x + '<br>y方向: '+ gravity.y;

    // 下で定義する関数を呼び出します
    sendModeFromGravityValue(gravity);

  },true);

  function sendModeFromGravityValue(g){

    // 絶対値を取得
    var x = Math.sqrt(g.x * g.x);
    var y = Math.sqrt(g.y * g.y);

    // portrait -> landscape
    if(currentMode === 'portrait' && x > 8.5 && y < 1.5){
      currentMode = 'landscape';
      // Milkcocoa側にデータを送ります
      ds.send({mode: currentMode});
    }

    // landscape -> portrait
    if(currentMode === 'landscape' && x < 1.5 && y > 8.5){
      currentMode = 'portrait';
      // Milkcocoa側にデータを送ります
      ds.send({mode: currentMode});
    }
  }
};