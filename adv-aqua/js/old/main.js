TOP_OFFSET = 10.5;
const vm = new Vue({
  el: "#app",
  data: {
    width: window.innerWidth,
    charaW: 0.75,
    topPos: TOP_OFFSET + "%"
  },
  methods: {
    handleResize: function(charaW) {
      topPosNum = TOP_OFFSET;
      this.width = window.innerWidth;
      if(this.width < 896){
        this.charaW = 0.75*this.width/896.0;
        topPosNum = TOP_OFFSET*this.width/896.0;
      }
      else
        this.charaW = 0.75;
      this.topPos = topPosNum + "%";
    },
    rotate_left: function() {
      this.isLeft = true;
      this.isRight = false;
    },
    rotate_right: function() {
      this.isLeft = false;
      this.isRight = true;
    },
    threeMin: function() {
      this.pickTime = 3 * 60 * 1000;
      this.totalTime = this.pickTime;
      this.resolution = 100;
    },
    fiveMin: function() {
      this.pickTime = 5 * 60 * 1000;
      this.totalTime = this.pickTime;
      this.resolution = 100;
    },
    startTimer: function() {
      this.timer = setInterval(() => this.countdown(), this.resolution);
      this.resetButton = true;
    },
    stopTimer: function() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
    },
    resetTimer: function() {
      this.totalTime = this.pickTime;
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
    },
    padTime: function(time) {
      return (time < 10 ? "0" : "") + time;
    },
    countdown: function() {
      if (this.totalTime >= 1) {
        this.totalTime = this.totalTime - this.resolution;
      } else {
        this.totalTime = 0;
        this.resetTimer();
        swal("Complete!!", "", "success");
      }
    }
  },
  mounted: function () {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
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
