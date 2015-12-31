(function() {
  var animate, blue, canvas, context, drawGradient, firstColor, firstColorOffset, fourthColor, fourthColorOffset, height, magenta, secondColor, secondColorOffset, start, thirdColor, thirdColorOffset, totalOffset, width, yellow;

  $(document).on('ready page:load', function() {});

  canvas = document.getElementById('canvas');

  context = canvas.getContext('2d');

  magenta = '#FF5157';

  yellow = '#FFC159';

  blue = '#00BADD';

  height = self.innerHeight;

  width = self.innerWidth;

  canvas.width = width;

  canvas.height = height;

  totalOffset = 0;

  Number.prototype.mod = function(n) {
    return (this % n + n) % n;
  };

  firstColorOffset = 0;

  secondColorOffset = 0.5;

  thirdColorOffset = 1;

  fourthColorOffset = 1.5;

  firstColor = magenta;

  secondColor = yellow;

  thirdColor = blue;

  fourthColor = firstColor;

  drawGradient = function(offset) {
    var gradient;
    totalOffset += offset;
    context.clearRect(0, 0, width, height);
    gradient = context.createLinearGradient(0 - totalOffset, 0, width * 2 - totalOffset, 0);
    if (firstColorOffset <= 1) {
      gradient.addColorStop(firstColorOffset, firstColor);
    }
    if (secondColorOffset <= 1) {
      gradient.addColorStop(secondColorOffset, secondColor);
    }
    if (thirdColorOffset <= 1) {
      gradient.addColorStop(thirdColorOffset, thirdColor);
    }
    if (fourthColorOffset <= 1) {
      gradient.addColorStop(fourthColorOffset, fourthColor);
    }
    if (totalOffset > width) {
      firstColorOffset = (firstColorOffset - 0.5).mod(1.5);
      secondColorOffset = (secondColorOffset - 0.5).mod(1.5);
      thirdColorOffset = (thirdColorOffset - 0.5).mod(1.5);
      fourthColorOffset = (fourthColorOffset - 0.5).mod(1.5);
      totalOffset = 0;
    }
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  };

  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  start = null;

  animate = function(timestamp) {
    var delta;
    delta = void 0;
    if (start === null) {
      start = timestamp;
    }
    delta = timestamp - start;
    drawGradient(delta / 5);
    if (delta < 2000) {
      requestAnimationFrame(animate);
    }
    start = timestamp;
  };

  requestAnimationFrame(animate);

  window.onresize = function() {
    width = self.innerWidth;
    height = self.innerHeight;
    canvas.width = width;
    canvas.height = height;
  };

  window.onfocus = function() {
    requestAnimationFrame(animate);
  };

}).call(this);
