//var host = "http://localhost:4000";

function process(operation){
	var action ="";
	if(operation == 'insertQuarter'){
		action = "PUT";
	}else{
		action = "POST";
	}
	
	var data = { "state":$("#state").val() ,
			 "model":$("#model").val(),
			 "serial":$("#serial").val(),
			 "gumballCount":$("#gumballCount").val(),
			 "hash":$("#hash").val()
		   };

	$.ajax({
		//url: host + "/gumballmachine",
		url: "/gumballmachine",
	   type: action,
	   async : true,
	   data: data,
	   success : commonCallback
	});
}


function commonCallback(result){
	 if(result.status == 'error'){
		 $("#message").val(result.message);
	 }else{
		 console.log(result);
		 $("#state").val(result.state);
		 $("#model").val(result.model);
		 $("#serial").val(result.serial);
		 $("#gumballCount").val(result.gumballCount);
		 $("#hash").val(result.hash);
		 var msg=result.message+"\nState : " +result.state+ "\nModel : " + result.model;
		 $("#message").val(msg);
	 }
}

