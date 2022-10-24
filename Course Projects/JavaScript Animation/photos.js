var pause = false;
var photos = [];
var msg;

const initialize = function () {
	msg = document.getElementById("message");
	setPhotoIntervals();
}

const resumeAction = function () {
	pause = !pause;
	pause ? clearPhotoIntervals() : setPhotoIntervals();
}

const clearPhotoIntervals = function () {
	msg.innerHTML += '<br>Animation paused'
	photos.forEach(photo => {
		clearInterval(photo.interval);
	});
}

const setPhotoIntervals = function () {

	msg.innerHTML += '<br>Animation started';
	var id = 1;

	Array.from(document.getElementById("photos").children).forEach(element => {
		const dt = Math.random() * (10 - 1) + 1;
		var photo = {
			id: id,
			htmlElement: element,
			dt: dt,
			vx: Math.random() + 1, // between 1 and 2
			vy: Math.random() + 1, // between 1 and 2
			interval: null
		}
		photo.interval = setInterval(function () { move(photo) }, dt);
		photos.push(photo);
		id++;
	});
}

function move(photo) {

	// move photo
	const photoTop = photo.htmlElement.offsetTop + photo.vy;
	const photoBottom = photoTop + photo.htmlElement.height;
	const photoLeft = photo.htmlElement.offsetLeft + photo.vx;
	const photoRight = photoLeft + photo.htmlElement.width;

	photo.htmlElement.style.top = photoTop + 'px';
	photo.htmlElement.style.left = photoLeft + 'px';

	// check collision with court
	const court = document.getElementById("court");
	const courtLeft = court.offsetLeft;
	const courtTop = court.offsetTop;
	const courtRight = court.offsetLeft + parseInt(court.style.width.slice(0, -2));
	const courtBottom = court.offsetTop + parseInt(court.style.height.slice(0, -2));

	if (photoBottom >= courtBottom || photoTop <= courtTop) {
		photo.vy = -photo.vy;
		if (photoBottom >= courtBottom) {
			photo.htmlElement.style.top = courtBottom - photo.htmlElement.height - 1 + 'px';
		}
		else {
			photo.htmlElement.style.top = courtTop + 1 + 'px';
		}
	}

	if (photoRight >= courtRight || photoLeft <= courtLeft) {
		photo.vx = -photo.vx;
		if (photoRight >= courtRight) {
			photo.htmlElement.style.left = courtRight - photo.htmlElement.width - 1 + 'px';
		}
		else {
			photo.htmlElement.style.left = courtLeft + 1 + 'px';
		}
	}

	// check collision with other photos
	photos.forEach(p => {

		var r1 = p.htmlElement.getBoundingClientRect();
		var r2 = photo.htmlElement.getBoundingClientRect();

		if (!(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top) && p.id != photo.id) {

			// swap vx
			var temp = p.vx;
			p.vx = photo.vx;
			photo.vx = temp;

			// swap vy
			temp = p.vy;
			p.vy = photo.vy;
			photo.vy = temp;

			if (r2.left < r1.right && r2.right > r1.right) {
				photo.htmlElement.style.left = r1.right + 2 + 'px';
			}
		}
	});
}
