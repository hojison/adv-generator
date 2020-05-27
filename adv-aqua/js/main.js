TOP_OFFSET = 10.5;
TOPMSG_OFFSET = 66;
let imgData = "";
//現在時刻取得（yyyymmddhhmmss）
function getCurrentTime() {
  var now = new Date();
  var res = "" + now.getFullYear() + padZero(now.getMonth() + 1) + padZero(now.getDate()) + padZero(now.getHours()) + 
      padZero(now.getMinutes()) + padZero(now.getSeconds());
  return res;
}

//先頭ゼロ付加
function padZero(num) {
  return (num < 10 ? "0" : "") + num;
}

const vm = new Vue({
  el: "#app",
  data: {
    width: window.innerWidth,
    charaW: 0.75,
    msgW: 1.0,
    message: "いらっしゃいませ！皆さんどうも、こんあくあ～♪",
    topPos: TOP_OFFSET + "%",
    topmsgPos: TOPMSG_OFFSET + "%",
    selectedEyes: '通常',
    selectedEyebrows: '下',
    selectedMouth: '開き',
    selectedEffect: 'なし',
    selectedBg: 'カフェ',
    bgSrc: 'img/cafe.jpg',
    optionEyes: [
        { id: 1, name: '通常' },
        { id: 2, name: '閉じかけ' },
        { id: 3, name: '閉じ' },
        { id: 4, name: 'ウインク' },
        { id: 5, name: '泣き' },
        { id: 6, name: '三白眼' },
        { id: 7, name: '＞＜' },
      ],
    optionEyebrows: [
      { id: 1, name: 'ハの字' },
      { id: 2, name: '逆ハの字' },
      { id: 3, name: '下' },
      { id: 4, name: '上' },
      { id: 4, name: 'ねじれ' }
    ],
    optionMouth: [
      { id: 1, name: '閉じへの字' },
      { id: 2, name: '閉じ' },
      { id: 3, name: '開き' },
      { id: 4, name: '傾き' },
      { id: 5, name: 'よだれ' },
      { id: 6, name: '開きへの字' },
      { id: 7, name: 'ふにゃふにゃ' },
      { id: 8, name: '全開' },
    ],
    optionEffect: [
      { id: 1, name: 'なし' },
      { id: 2, name: '怒り' },
      { id: 3, name: '？' },
      { id: 4, name: '汗（多）' },
      { id: 5, name: '汗（少）' },
      { id: 6, name: 'びっくり' },
      { id: 7, name: 'キラキラ' },
      { id: 8, name: '影' },
    ],
    optionBg: [
      { id: 1, name: '玄関 - 昼' },
      { id: 2, name: '玄関 - 夕' },
      { id: 3, name: '玄関 - 夜(点灯)' },
      { id: 4, name: '玄関 - 夜(消灯)' },
      { id: 5, name: '公園 - 昼' },
      { id: 6, name: '公園 - 夕' },
      { id: 7, name: '公園 - 夜' },
      { id: 8, name: '公園 - 夜(雨天)' },
      { id: 9, name: '河畔 - 昼' },
      { id: 10, name: '河畔 - 夕' },
      { id: 11, name: '河畔 - 夜' },
      { id: 12, name: '酒場 - 昼' },
      { id: 13, name: '酒場 - 夜' },
      { id: 14, name: 'カフェ' },
      { id: 15, name: '港町' },
    ],
  eyesDisp: [true, false, false, false, false, false, false, false], //配列
  eyebrowsDisp: [false, false, true, false, false,], //配列
  mouthDisp: [false, false, true, false, false,false, false, false], //配列
  effectDisp: [false, false, false, false, false, false, false], //配列
  bgArr:[
    'img/house_enterance_interior_a.jpg',
    'img/house_enterance_interior_b.jpg',
    'img/house_enterance_interior_c.jpg',
    'img/house_enterance_interior_d.jpg',
    'img/park_day.jpg',
    'img/park_evening.jpg',
    'img/park_night.jpg',
    'img/park_rainy_night.jpg',
    'img/river_day.jpg',
    'img/river_evening.jpg',
    'img/river_night.jpg',
    'img/bar_day.jpg',
    'img/bar_night.jpg',
    'img/cafe.jpg',
    'img/port_town.jpg',
  ]
  },
  watch: {
    message: function(val){
      let rows = val.split(/\n/);
      if(rows.length > 3){
        this.message = rows.slice(0, 3).join('\n');
      }
    },
    selectedBg: function(val, oldVal) {
      for (var i = 0; i < this.optionBg.length; i++) {
          if (this.optionBg[i].name == val) {
              this.bgSrc = this.bgArr[i];
          }
      }
    },
    selectedEyebrows: function(val, oldVal) {
        for (var i = 0; i < this.optionEyebrows.length; i++) {
            this.eyebrowsDisp[i] = false;
            if (this.optionEyebrows[i].name == val) {
                this.eyebrowsDisp[i] = true;
            }
        }
    },
    selectedEyes: function(val, oldVal) {
      for (var i = 0; i < this.optionEyes.length; i++) {
          this.eyesDisp[i] = false;
          if (this.optionEyes[i].name == val) {
              this.eyesDisp[i] = true;
          }
      }
    },
    selectedMouth: function(val, oldVal) {
      for (var i = 0; i < this.optionMouth.length; i++) {
        this.mouthDisp[i] = false;
        if (this.optionMouth[i].name == val) {
            this.mouthDisp[i] = true;
        }
      }
    },
    selectedEffect: function(val, oldVal) {
      if(this.optionEffect[0].name == val){
        for (var i = 0; i < this.effectDisp.length; i++) {
          this.effectDisp[i] = false;
        }
      }
      for (var i = 1; i < this.optionEffect.length; i++) {
        this.effectDisp[i-1] = false;
        if (this.optionEffect[i].name == val) {
          this.effectDisp[i-1] = true;
        }
      }
    }
  },
  methods: {
    DlImage: function () {
      html2canvas(document.getElementById("adv-screen")).then(canvas => {
        //aタグのhrefにキャプチャ画像のURLを設定
        imgData = canvas.toDataURL();
        let link = document.createElement('a');
        link.href = imgData;
        link.download = "aqua-"+getCurrentTime();
        link.click()
      });
    },
    updateEyes: function(){

    },
    handleResize: function() {
      topPosNum = TOP_OFFSET;
      this.width = window.innerWidth;
      if(this.width < 902){
        var ratio = this.width/902.0;
        this.charaW = 0.75*ratio;
        this.msgW = 0.94*ratio;
        topPosNum = TOP_OFFSET*ratio;
      }
      else{
        this.charaW = 0.75;
        this.msgW = 1.0;
      }
      this.topPos = topPosNum + "%";
    }
  },
  mounted: function () {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize);
  },
  computed: {
    minutes: function() {
      const minutes = this.totalTime / 60 / 1000;
      if (this.seconds === "00") {
        return Math.ceil(minutes);
      } else {
        return Math.floor(minutes);
      }
    },
    seconds: function() {
      const seconds = Math.ceil(this.totalTime / 1000) % 60;
      return this.padTime(seconds);
    }
  }
});
