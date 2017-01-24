var records = [];
var currentReplay = null;
var cfg = {
  modeRecord : false,
  timer : {
    timeObj : null,
    currentTime : 0,
  },
  record : []
};

var mapping = {
  a: {
      src : '../asset/samples/a.wav',
      keycode : 87
  },
  b: {
      src : '../asset/samples/b.wav',
      keycode : 69
  },
  bb: {
      src : '../asset/samples/bb.wav',
      keycode : 83
  },
  c: {
      src : '../asset/samples/c.wav',
      keycode : 68
  },
  cb: {
      src : '../asset/samples/cb.wav',
      keycode : 70
  },
  d: {
      src : '../asset/samples/d.wav',
      keycode : 84
  },
  e: {
      src : '../asset/samples/e.wav',
      keycode : 89
  },
  eb: {
      src : '../asset/samples/eb.wav',
      keycode : 71
  },
  f: {
      src : '../asset/samples/f.wav',
      keycode : 72
  },
  fb: {
      src : '../asset/samples/fb.wav',
      keycode : 85
  },
  g: {
      src : '../asset/samples/g.wav',
      keycode : 74
  },
  gb: {
      src : '../asset/samples/gb.wav',
      keycode : 65
  },
  playNote:  function(key) {
    if (typeof key == 'undefined')
      return ;
    if (typeof key == 'boolean') {
      window.clearInterval(cfg.timer.timeObj);
      return ;
    }
    var note = new Audio(this[key].src);
    if (cfg.modeRecord) {
      cfg.record[cfg.timer.currentTime] = key;
    }
    note.play();
  },
  playKeycode:  function(keycode) {
    for (var index in this) {
      if (index !== 'function' && this[index].keycode == keycode) {
        this.playNote(index);
      }
    }
  }
};

function playNote(note) {
  mapping.playNote(note);
}

function timer(){
  cfg.timer.currentTime++;
  if (!cfg.modeRecord) {
    mapping.playNote(records[currentReplay][cfg.timer.currentTime]);
  }
}

function recordMode (){
  var btnRec = document.getElementById("record");
  var listRec = document.getElementById("listRecords");

  if (!cfg.modeRecord) {
    cfg.modeRecord = true;
    cfg.timer.currentTime = 0;
    btnRec.innerHTML = "Stop";
    cfg.timer.timeObj = window.setInterval(timer, 10);
  }
  else {
    cfg.modeRecord = false;
    cfg.timer.currentTime = 0;
    btnRec.innerHTML = "Enregistrer";
    window.clearInterval(cfg.timer.timeObj);
    cfg.record.push(false);
    records.push(cfg.record);
    cfg.record = [];
    listRec.innerHTML += "<button onclick='playRecord(" + (records.length - 1) + ")'>son" + records.length + "</button>";
  }
}

function playRecord (id){
  if (!cfg.modeRecord) {
    window.clearInterval(cfg.timer.timeObj);
    cfg.timer.currentTime = 0;
    currentReplay = id;
    cfg.timer.timeObj = window.setInterval(timer, 10);
  }
}

window.addEventListener("keydown", function(e){
  mapping.playKeycode(e.keyCode);
});
