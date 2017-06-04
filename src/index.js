import moment from 'moment';
import './style.scss';

$(document).ready(function() {
	$('button').click(function() {
		let curVal;
		let  newVal;
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
				$('.content').html(newVal);
				break;
			case 3:
				curVal = $('span:last').text();
				newVal = parseInt(curVal) + 1;
				$('span:last').html(newVal);
				$('.content').html(newVal);
				break;
		}
	})

	let running = false;
	let intervalId;

	$('#timer').click(function() {
		running = !running;
		function loop() {
			let duration = parseInt($('.content').text());
			let workDur = duration * 60000;
			duration = parseInt($('span:first').text());
			let breakDur = duration * 60000;
			updateContent(workDur);
			$('.inner')
			.queue(function() {
				$(this).toggleClass('newColor').dequeue();
			})
			.animate({height: "100%"}, workDur, 'linear', function() {
					updateContent(breakDur)}) 
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
			clearInterval(intervalId);
			$('.inner').stop({clearQueue: true});	
			$('.inner').attr('style','');
			$('content').html('');
		}
	})
	function updateContent(duration) {
		let  content = duration / 1000;
		intervalId = setInterval(function() {
			const strTime = moment('1900-01-01 00:00:00').add(--content, 'seconds').format('HH:mm:ss');
			$('.content').html(strTime);
			if (content === 0){
				clearInterval(intervalId);
			}
		}, 1000)
	}
})
