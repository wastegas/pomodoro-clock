import moment from 'moment';
import 'font-awesome-webpack';
import './style.scss';

$(document).ready(function() {
	$('button').click(function() {
		let curVal;
		let  newVal;
		console.log($('button').index(this));
		switch ($('button').index(this)) {
			case 1:
				curVal = $('#brkTime').text();
				newVal = parseInt(curVal) - 1;
				if (newVal < 0) { 
					break;
				}
				$('#brkTime').html(newVal);
				break;
			case 2:
				curVal = $('#brkTime').text();
				newVal = parseInt(curVal) + 1;
				$('#brkTime').html(newVal);
				break;
			case 3:
				curVal = $('#sessTime').text();
				newVal = parseInt(curVal) - 1;
				if (newVal < 0) {
					break;
				}
				$('#sessTime').html(newVal);
				$('.content').html(newVal);
				break;
			case 4:
				curVal = $('#sessTime').text();
				newVal = parseInt(curVal) + 1;
				$('#sessTime').html(newVal);
				$('.content').html(newVal);
				break;
		}
	})

	let running = false;
	let intervalId;

	$('#timer').click(function() {
		running = !running;
		function loop() {
			let duration = parseInt($('#sessTime').text());
			const workDur = duration * 60000;
			duration = parseInt($('#brkTime').text());
			const breakDur = duration * 60000;
			updateContent(workDur, 'SESSION');
			$('.inner')
			.queue(function() {
				$(this).toggleClass('newColor').dequeue();
			})
			.animate({height: "100%"}, workDur, 'linear', function() {
					updateContent(breakDur, 'BREAK')}) 
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
		}
	})
	function updateContent(duration, curSession) {
		let  content = duration / 1000;
		$('.session').html(curSession);
		intervalId = setInterval(function() {
			const strTime = moment('1900-01-01 00:00:00')
							.add(--content, 'seconds')
							.format('mm:ss');
			$('.content').html(strTime);
			if (content === 0){
				clearInterval(intervalId);
			}
		}, 1000)
	}
})
