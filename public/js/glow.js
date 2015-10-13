var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        var magenta = "#FF5157";
        var yellow = "#FFC159";
        var blue = "#00BADD";


        var height = self.innerHeight;
        var width = self.innerWidth;
        canvas.width = width;
        canvas.height = height;

        var totalOffset = 0;

        Number.prototype.mod = function(n) {
            return ((this%n)+n)%n;
        }

        firstColorOffset = 0;
        secondColorOffset = 0.5;
        thirdColorOffset = 1;
        fourthColorOffset = 1.5;

        var firstColor = magenta;
        var secondColor = yellow;
        var thirdColor = blue;
        var fourthColor = firstColor;

        var drawGradient = function(offset) {
            totalOffset += offset;
            context.clearRect(0, 0, width, height);
            var gradient = context.createLinearGradient(0-totalOffset, 0, (width * 2)-totalOffset, 0);
            if (firstColorOffset <= 1)
                gradient.addColorStop(firstColorOffset, firstColor);

            if (secondColorOffset <= 1)
                gradient.addColorStop(secondColorOffset, secondColor);

            if (thirdColorOffset <= 1)
                gradient.addColorStop(thirdColorOffset, thirdColor);

            if (fourthColorOffset <= 1)
                gradient.addColorStop(fourthColorOffset, fourthColor);

            if (totalOffset > (width)) {
                firstColorOffset = (firstColorOffset - 0.5).mod(1.5);
                secondColorOffset = (secondColorOffset - 0.5).mod(1.5);
                thirdColorOffset = (thirdColorOffset - 0.5).mod(1.5);
                fourthColorOffset = (fourthColorOffset - 0.5).mod(1.5);
                totalOffset = 0;
            }

            context.fillStyle = gradient;
            context.fillRect(0, 0, width, height);
        }
        
       

        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                       window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        var start = null
        var animate = function(timestamp) {
            var delta;
            if (start === null) start = timestamp;
            delta = timestamp - start;
            drawGradient(delta / 5);
            if (delta < 2000) {
                requestAnimationFrame(animate);
            }
            start = timestamp;
        }
        requestAnimationFrame(animate);

        window.onresize = function() {
            width = self.innerWidth;
            height = self.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }
        window.onfocus = function() {
            requestAnimationFrame(animate);
        }