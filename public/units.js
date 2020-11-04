
// [ ] change the fill color to be based on the max likes on a gradient.
const foundColor="#45b7f5"

function alertCell(cellId){
	alert(cellId);
}

async function genBoxes(){

	var c = document.body; // whatever you want to append the rows to: 
	let cellHolder = document.getElementById("cells");

	for (let x = 0; x < 377; x++){
		var cell = document.createElement("div"); 
        cell.className = "gridsquare";
        cell.id = "cell-"+(x+1); 
		cell.setAttribute('data-modal-target', '#modal');
        var img = document.createElement("img"); 
        img.className = "unit_image";
        img.src = "fixed/"+(x+1)+".png";
        cell.appendChild(img);
		cellHolder.appendChild(cell);
	}
	c.appendChild(cellHolder);
	const json_data = await catchData();
	colorBoxes(json_data);
	setModal(json_data);

}

async function catchData() {
	const response = await fetch('unit.json');
	const data = await response.json();
	return data
}

async function colorBoxes(json_data){
	for (let i = 1; i <  377; i++){
		if (json_data[i]["found"]){
			
			let box = document.getElementById("cell-"+i);
			//console.log(json_data[i],"cell"+i);
			box.style.backgroundColor = foundColor;
		}
	}
	return json_data
}

function setModal(json_data){
	const openModalButtons = document.querySelectorAll('[data-modal-target]')
	const closeModalButtons = document.querySelectorAll('[data-close-button]')
	const overlay = document.getElementById('overlay')

	openModalButtons.forEach(cell => {
	  cell.addEventListener('click', () => {
	    const modal = document.querySelector(cell.dataset.modalTarget)
	    console.log(cell.id);
	    openModal(modal,cell.id,json_data)
	  })
	})

	overlay.addEventListener('click', () => {
	  const modals = document.querySelectorAll('.modal.active')
	  modals.forEach(modal => {
	    closeModal(modal)
	  })
	})

	closeModalButtons.forEach(cell => {
	  cell.addEventListener('click', () => {
	    const modal = cell.closest('.modal')
	    closeModal(modal)
	  })
	})
}

function openModal(modal,cellId,json_data) {
	if (modal == null) return
	modal.classList.add('active')
	overlay.classList.add('active')
	
	index = cellId.split('-')[1];
	console.log(index, cellId);

  
  	//Display the cell image in the top left
  	let cellImage = document.getElementById("cell-image");
  	
  	cellImage.src = "fixed/"+(parseInt(index))+".png";
  	

	// Display all the elements to the modal: dynamically create the content for the modal
	// There will be multiple so place the highest ranking at the top
	// Show name, distription and in small text when it was uploaded and by whom

	let values = json_data[index]["values"];
	let modalValues = document.getElementById("modal-values");

	modalValues.innerHTML="";
	let count =0;
	for (let value of values){

		let json_data_values = json_data[index]["values"][count];

		let name = json_data_values["name"] ? json_data_values["name"] : "Not yet recorded";
		let description = json_data_values["description"] ? json_data_values["description"]: "No description available";
		let upvote = json_data_values["upvotes"] ? json_data_values["upvotes"] : 0;
		let downvote = json_data_values["downvotes"] ? json_data_values["downvotes"] : 0;

		//Create a row
		let rowEntry = document.createElement("div");
		rowEntry.className = "modal-row-entry";


		// In each row there will be the title, definition, user that uploaded it,
		// and at the end there will be an up/down vote option.
		let titleEntry = document.createElement("div");
		titleEntry.className = "modal-title";
		titleEntry.id = "modal-title";
		titleEntry.innerHTML = name ;


		let descriptionEntry = document.createElement("div");
		descriptionEntry.className = "modal-description";
		descriptionEntry.innerHTML = description;

		// This creates the voting container
		let voteEntry = document.createElement("div");
		voteEntry.className = "modal-vote";

		let upvoteEntry = document.createElement("div");
		upvoteEntry.className = "modal-upvote";
		upvoteEntry.innerHTML = upvote;

		let downvoteEntry = document.createElement("div");
		downvoteEntry.className = "modal-downvote";
		downvoteEntry.innerHTML = downvote;

		voteEntry.appendChild(upvoteEntry);
		voteEntry.appendChild(downvoteEntry);



		// Add the new elements to the existing structure
		rowEntry.appendChild(titleEntry);
		rowEntry.appendChild(descriptionEntry);
		rowEntry.appendChild(voteEntry);


		modalValues.appendChild(rowEntry);
		console.log(modalValues);
		count++;
	}

	for (const btn of document.querySelectorAll('.modal-upvote')) {
	  btn.addEventListener('click', event => {
	    event.target.classList.toggle('on');
	    console.log(btn);
	  });
	}

	for (const btn of document.querySelectorAll('.modal-downvote')) {
	  btn.addEventListener('click', event => {
	    event.target.classList.toggle('on');
	    console.log(btn);
	  });
	}


  	//document.getElementById("title").innerHTML = json_data[index]["values"][0]["name"];
  	//document.getElementById("modal-body").innerHTML = json_data[index]["values"][0]["description"];

  
  document.getElementById("modal-index").innerHTML = index;


}

function closeModal(modal) {
  if (modal == null) return

  modal.classList.remove('active');
  overlay.classList.remove('active');
}


async function submitTheForm(cell){
	//Check if all fields are 
	console.log(cell.id)
	const name = document.getElementById("entry-name").value;
	const description = document.getElementById("entry-description").value;
	const units = document.getElementById("entry-units").value;
	const cellId = document.getElementById("modal-index").innerHTML;

	if (!(name && description && units && cellId)){
		alert("All fields are required");
		return
	}	

	

	const data = {name, description, units, cellId};
	const options = {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)


	}
	
	const response = await fetch('/api',options);
	const json = await response.json();

	
	const modal = document.getElementById("modal");
	const overlay = document.getElementById("overlay");

	modal.className = "modal";
	overlay.className = "inactive";

	//document.getElementById("cells").innerHTML = ""

	//location.reload();
	console.log(json);

	return
}
