	
function init()
		{
			
		var hiddenBox = $("#hidden-vision");
		
		$("#button-container button").on("click" , function()
						{
						//Question...possible to move function declaration out to somewhere else and refer to it by name???
						 if (hiddenBox.state != "visible")
						
							{hiddenBox.show();
							 hiddenBox.state = "visible";
							$("#click_button").html("Hide The Revealed Vision");
							}
							
						 else
							{hiddenBox.hide();
							 hiddenBox.state = "invisible";
							$("#click_button").html("SEE THE HIDDEN VISIONS!!!");
							
							
							}
	
						 });
		
		}