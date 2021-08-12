document.addEventListener('DOMContentLoaded', ()=>{

	const gridDisplay = document.querySelector('.grid')

	const scoreDisplay= document.getElementById('score')

	const resultDisplay=document.getElementById('result')


	//playing board banana hai , so 4x4 box banao 

	const width=4
	let score=0
	let squares=[]

	function createBoard()
	{
		
		for(let i=0;i<width*width;i++)
		{
			square= document.createElement('div')
			square.innerHTML=0
			gridDisplay.appendChild(square)
			squares.push(square)
		}
		generate()
		generate()
	}

	createBoard()



	//generate a number randomly at any place where its 0


	function generate()
	{
		randomNumber= Math.floor(Math.random()*squares.length)
		

		if( squares[randomNumber].innerHTML==0)
		{

			
			squares[randomNumber].innerHTML=2
			checkGameOver()
		}
		else generate()

	}



	//when user swpies right, sab kuch right side pe chala jana chiye and fir agar adjacent same hai toh ek ko 0 baanke dusre ko double krdo 


	function moveRight(){

		for(let i=0; i<16;i++)
		{
			if(i%4==0)
			{
				let totalOne= squares[i].innerHTML
				let totalTwo= squares[i+1].innerHTML
				let totalThree= squares[i+2].innerHTML
				let totalFour= squares[i+3].innerHTML

				let row= [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)] //parseint is for conversion from char to int

				// console.log(row)

				let filteredRow =row.filter(num=>num) // this picks up all those elements which are not 0
				// console.log(filteredRow)

				let missing= 4- filteredRow.length
				let zeros = Array(missing).fill(0)
				// console.log(zeros)

				let newRow= zeros.concat(filteredRow) // all zeros will be displayed first and later the filtered row 
				// console.log(newRow)

				for(let j=0;j<4;j++)
				{
					squares[i+j].innerHTML= newRow[j]
				}
			}
		}
	}

	// moveRight()




	/// swipe left func

	function moveLeft(){

		for(let i=0; i<16;i++)
		{
			if(i%4==0)
			{
				let totalOne= squares[i].innerHTML
				let totalTwo= squares[i+1].innerHTML
				let totalThree= squares[i+2].innerHTML
				let totalFour= squares[i+3].innerHTML

				let row= [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)] //parseint is for conversion from char to int

				// console.log(row)

				let filteredRow =row.filter(num=>num) // this picks up all those elements which are not 0

				// console.log(filteredRow)

				let missing= 4- filteredRow.length
				let zeros = Array(missing).fill(0)
				// console.log(zeros)

				let newRow= filteredRow.concat(zeros) // all zeros will be displayed first and later the filtered row 
				// console.log(newRow)

				for(let j=0;j<4;j++)
				{
					squares[i+j].innerHTML= newRow[j]
				}
			}
		}
	}

	// moveLeft()




	///swipe down

	function moveDown()
	{
		for(let i=0;i<4;i++)
		{
				let totalOne= squares[i].innerHTML
				let totalTwo= squares[i+(width)].innerHTML
				let totalThree= squares[i+(width*2)].innerHTML
				let totalFour= squares[i+(width*3)].innerHTML

				let col= [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree),parseInt(totalFour)]

				let filteredCol= col.filter(num=>num)
				let missing= 4- filteredCol.length
				let zeros= Array(missing).fill(0)

				let newCol= zeros.concat(filteredCol)

				squares[i].innerHTML=newCol[0]
				squares[i+width].innerHTML=newCol[1]
				squares[i+(width*2)].innerHTML=newCol[2]
				squares[i+ (width*3)].innerHTML=newCol[3]




		}
	}


	//swipe up

	function moveUp()
	{
		for(let i=0;i<4;i++)
		{
				let totalOne= squares[i].innerHTML
				let totalTwo= squares[i+(width)].innerHTML
				let totalThree= squares[i+(width*2)].innerHTML
				let totalFour= squares[i+(width*3)].innerHTML

				let col= [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree),parseInt(totalFour)]

				let filteredCol= col.filter(num=>num)
				let missing= 4- filteredCol.length
				let zeros= Array(missing).fill(0)

				let newCol= filteredCol.concat(zeros)

				squares[i].innerHTML=newCol[0]
				squares[i+width].innerHTML=newCol[1]
				squares[i+(width*2)].innerHTML=newCol[2]
				squares[i+(width*3)].innerHTML=newCol[3]




		}
	}




	





//addding numbers whose adjacents are same similar to that of stack impelmentation

	function combineRow()
	{
		for(let i=0;i<15;i++)
		{

			if(squares[i].innerHTML=== squares[i+1].innerHTML){

				let combineTotal= parseInt(squares[i].innerHTML)+parseInt(squares[i+1].innerHTML)
				squares[i].innerHTML=combineTotal
				squares[i+1].innerHTML=0
				score+=combineTotal

				scoreDisplay.innerHTML=score

			}
		}
		checkForWin()
	}




	//combine col function to add all in the col
		function combineCol()
	{
		for(let i=0;i<12;i++)
		{

			if(squares[i].innerHTML=== squares[i+width].innerHTML){

				let combineTotal= parseInt(squares[i].innerHTML)+parseInt(squares[i+width].innerHTML)
				squares[i].innerHTML=combineTotal
				squares[i+width].innerHTML=0

					score+=combineTotal

				scoreDisplay.innerHTML=score
			}
		}

		checkForWin()
	}






	//assiging direction ie keycodes


	function control(e){
		if(e.keyCode===39){
			keyRight()
		}
		else if(e.keyCode===37)
		{
			keyLeft()
		}
		else if(e.keyCode==38)
		{
			keyUp()
		}
		else
		{
			keyDown()

		}
	}	


	document.addEventListener('keyup', control)


	function keyRight(){
		moveRight()
		combineRow()
		moveRight()
		generate()

	}
		function keyLeft(){
		moveLeft()
		combineRow()
		moveLeft()
		generate()

	}
	function keyUp(){
		moveUp()
		combineCol()
		moveUp()
		generate()

	}
	function keyDown(){
		moveDown()
		combineCol()
		moveDown()
		generate()

	}


	//winning and loosiing conditions


	function checkForWin(){

		for(let i=0;i<15;i++)
		{
			if(squares[i].innerHTML===2048)
			{
				resultDisplay.innerHTML='You Win! GG.'
				document.removeEventListener('keyup',control)
			}
		}
	}

	function checkGameOver()
	{
		let z=0 //count of zeros if it is 0 then game over
		for(let i=0;i<squares.length;i++)
		{
			if(squares[i].innerHTML==0)
			{z++;}
		}

		if(z==0)
			{resultDisplay.innerHTML='Sorry, You Loose'
			document.removeEventListener('keyup',control)}
	}


})