export const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5)

export const lineEq = (y2, y1, x2, x1, currentVal) => {
	let m = (y2 - y1) / (x2 - x1)
	let b = y1 - m * x1
	return m * currentVal + b
}

export const lerp = (a, b, n) => (1 - n) * a + n * b

export const bodyColor =
	getComputedStyle(document.body)
		.getPropertyValue('--color-bg')
		.trim() || 'white'

export const getMousePos = (e) => {
	let posx = 0
	let posy = 0
	if (!e) e = window.event
	if (e.pageX || e.pageY) {
		posx = e.pageX
		posy = e.pageY
	} else if (e.clientX || e.clientY) {
		posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft
		posy = e.clientY + body.scrollTop + document.documentElement.scrollTop
	}
	return { x: posx, y: posy }
}
