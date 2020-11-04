const express = require('express');
let fs = require('fs');
const app = express();


app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

app.post('/api', (req, res) => {
	console.log("I HAVE A REQUEST");
	
	const data = req.body;
	//console.log(data);

	var m = JSON.parse(fs.readFileSync('/Users/scott/Documents/UnitProject/public/unit.json').toString());
	
	if (m[data.cellId]["found"]){
		m[data.cellId]["values"].push(
			{  
				units: '',
				name: '',
				description: '',
				uploadDate: '',
				uploader: '',
				upvotes: '',
				downvotes: '' 
		   });


	}


	m[data.cellId]["found"] = true;

	const numEntries = m[data.cellId]["values"].length;

	m[data.cellId]["values"][numEntries-1]["units"] = data.units;
	m[data.cellId]["values"][numEntries-1]["name"] = data.name;
	m[data.cellId]["values"][numEntries-1]["description"] = data.description;

	//console.log(JSON.stringify(m))
	fs.writeFile('/Users/scott/Documents/UnitProject/public/unit.json', JSON.stringify(m),
	 function(err, result) {
	 	if(err){
	 		res.json({
				status:"FAILED",
				error: err,
				name: data.name,
				description: data.description,
				units: data.units,
				index: data.cellId
			})
	 		console.log('error', err);
	 	}
	 	else{
			res.json({
				status:"Success",
				name: data.name,
				description: data.description,
				units: data.units,
				index: data.cellId

			})
		}
	});

	
	//console.log(m);

	//m.forEach(function(p){
	//    ;
	    
	//});
	//fs.writeFile('fileName.json', JSON.stringify(m));
	//	res.end();
});