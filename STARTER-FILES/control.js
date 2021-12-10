const $ = (query) => document.querySelectorAll(query)

// timer manage object
const timer = {
	state: 'stop',
	mode: 'run',
	inputMinutes: 15,
	inputSeconds: 0
}
// settings action listener
const changeTime = () => {
	stop()
	if(timer.mode === 'edit') {
		timer.mode = 'run'

		$('.time input').forEach(input => input.setAttribute('disabled', true))
	
		timer.inputMinutes = $('.time .minutes input')[0].value
		timer.inputSeconds = $('.time .seconds input')[0].value
	}
	// mode = 'run'
	else {
		timer.mode = 'edit'
		$('.time input').forEach(input => input.removeAttribute('disabled'))
	}

}
const stop = () =>{
	timer.state = 'stop'
	$('#stop')[0].classList.add('off')
	$('#start')[0].classList.remove('off')
}


const start = () => {
	timer.state = 'start'
	timer.mode = 'run'
	$('#start')[0].classList.add('off')
	$('#stop')[0].classList.remove('off')
	$('.time input').forEach(input => input.setAttribute('disabled', true))
}


// timer count interval
var interval = setInterval(() => {
	
	if(timer.state === 'start') {
		if(timer.inputSeconds == 0){
			timer.inputSeconds = 59
			timer.inputMinutes-= 1
		}
		else{
			timer.inputSeconds-=1
		}

		$('.time .minutes input')[0].value = timer.inputMinutes
		$('.time .seconds input')[0].value = timer.inputSeconds
		
		if(timer.inputMinutes == 0 && timer.inputSeconds == 0) {
			finished()
		}
	}
}, 1000)

const finished = () => {
	stop()
}