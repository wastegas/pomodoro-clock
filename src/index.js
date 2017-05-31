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

	$('#timer').click(function() {
		$('.inner').slideDown('slow')
	})
})
