color = "gray";
size = 5;

window.addEventListener('load', ()=>{
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext('2d');
	
	
	//Resize canvas
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	
	//variables
	let painting = false;
	
	
	function startPosition(e){
		ctx.beginPath();
		painting = true;
		draw(e);
	}
	function finishPosition(){
		painting = false;
	}
	function draw(e){
		if(!painting) return;
		ctx.lineWidth = size; // control size
		ctx.strokeStyle = color; // control color
		ctx.lineCap = "round";
		ctx.lineTo(e.clientX, e.clientY-60);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(e.clientX, e.clientY-60);
	}
	//EventListeners
	canvas.addEventListener('mousedown', startPosition);
	canvas.addEventListener('mouseup', finishPosition);
	canvas.addEventListener('mousemove', draw);
	
	/*drawing stroke:
	ctx.beginPath();
	ctx.moveTo(100, 100);
	ctx.lineTo(200, 100);
	ctx.lineTo(500, 500);
	ctx.closePath();
	ctx.stroke();
	*drawing rects:
	ctx.strokeStyle = "red";
	ctx.lineWidth = 20
	
	ctx.strokeRect(50, 50, 200, 200);
	ctx.strokeStyle = "green";
	ctx.strokeRect(100, 100, 200, 200);*/
})

function plus(){
	console.log(size);
	size++;
}
function minus(){
	console.log(size);
	if(size >= 6) size--;
}
function resetSize(){
	size = 5;
	console.log(size);
}
function switchColor(c){
	color = c;
}
	
window.addEventListener('resize', ()=>{
	const canvas = document.querySelector("#canvas");
	
	//Resize canvas
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
})