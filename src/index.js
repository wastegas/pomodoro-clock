import './style.scss';

$(document).ready(function() {
	$('button').click(function() {
		var curVal;
		var newVal;
		switch ($('button').index(this)) {
			case 0:
				curVal = $('span:first').text();
				newVal = parseInt(curVal) - 1;
				if (newVal < 0) { 
					break;
				}
				$('span:first').html(newVal);
				break;
			case 1:
				curVal = $('span:first').text();
				newVal = parseInt(curVal) + 1;
				$('span:first').html(newVal);
				break;
			case 2:
				curVal = $('span:last').text();
				newVal = parseInt(curVal) - 1;
				if (newVal < 0) {
					break;
				}
				$('span:last').html(newVal);
				break;
			case 3:
				curVal = $('span:last').text();
				newVal = parseInt(curVal) + 1;
				$('span:last').html(newVal);
				break;
		}
	})


	var running = false;

	$('#timer').click(function() {
		running = !running;
		function loop() {
			var duration = parseInt($('span:last').text());
			var workDur = duration * 6000;
			duration = parseInt($('span:first').text());
			var breakDur = duration * 6000;
			$('.inner')
			.queue(function() {
				$(this).toggleClass('newColor').dequeue();
			})
			.animate({height: "100%"}, workDur) 
			.queue(function() {
				$(this).toggleClass('newColor').dequeue();
			})
			.animate({height: '0px'}, breakDur, 'linear', function() {
				loop()
			});
		}
		if (running) {
			loop();
		} else {
			$('.inner').stop({clearQueue: true});	
			$('.inner').attr('style','');
		}
			
	})
})
