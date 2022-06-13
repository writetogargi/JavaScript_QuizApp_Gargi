

const question_set = [
		{
			number: 0,
			question_txt: "Is java script single-threaded language?",
			answers:[
				"Yes",
				"No",
				"none of this",
				"cant be determined"
			],
			correct: 0
		},
		{
			number: 1,
			question_txt: "What is Closures in js?",
			answers:[
				"Self-invoking functions",
				"private functions",
				"nested functions",
				"having access to the parent scope"
			],
			correct: 3
		}
];



var ans_state = [];




 

function init(question_set, sequence){
		document.getElementById("question").innerHTML = question_set[sequence].question_txt;

		document.getElementById("btn0").innerHTML = question_set[sequence].answers[0];
		document.getElementById("btn1").innerHTML = question_set[sequence].answers[1];
		document.getElementById("btn2").innerHTML = question_set[sequence].answers[2];
		document.getElementById("btn3").innerHTML = question_set[sequence].answers[3];

		document.getElementById("question_no").textContent = question_set.length >=  sequence+1 ? sequence+1 : 0  
}

var clear_ans_btn = async function(ans_btn_elements){
	for (var i = 0; i < ans_btn_elements.length; i++) {
		ans_btn_elements[i].style.backgroundColor = "#01BBFF";
	}
}

var seq = 0;
init(question_set, seq);

var ans_btn_elements = document.getElementsByClassName("ans-button");
var selectAns = async function() {

	await clear_ans_btn(ans_btn_elements);

    this.style.backgroundColor = "green";
	console.log(this.getAttribute("id").replace(/\D/g, ''));
	let ans_number = this.getAttribute("id").replace(/\D/g, '');

	ans_state[seq]=ans_number;
	
	console.log(ans_state)

	//you-selected
	document.getElementById("you-selected").innerHTML = question_set[seq].answers[ans_number];

};
for (var i = 0; i < ans_btn_elements.length; i++) {
    ans_btn_elements[i].addEventListener('click', selectAns, false);
}



async function next_click(e){

	await clear_ans_btn(ans_btn_elements);
	
	seq = seq + 1;
	console.log(seq)
	if(  seq < question_set.length ){
		init(question_set, seq);
	}
	else{
		e.textContent="done!";
		/////////show result
		console.log("ans_state...")
		console.log(ans_state);

		let actual_ans = question_set.map( x =>{
			return x.correct
		});

		console.log(actual_ans);

		score = 0;
		actual_ans.forEach( (arrayItem, index, fullArray)=> {
			
			console.log("tttt ",index, arrayItem);
			if(arrayItem == ans_state[index]){
				score++;	
			}

			console.log(score)
			

		})

		//alert("score: "+ score + " percentage: "+ Math.round((score/question_set.length)*100)  )

		Swal.fire({
			title: `score: ${score},  percentage: ${Math.round((score/question_set.length)*100)}%`,
			showClass: {
			  popup: 'animate__animated animate__fadeInDown'
			},
			hideClass: {
			  popup: 'animate__animated animate__fadeOutUp'
			}
		})

	}
	
}

