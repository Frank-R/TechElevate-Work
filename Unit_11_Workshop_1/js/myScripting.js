		
function init()
	{
	listCounter = 0;
	imagesStart = 0;
	imagesPerClick = 4;
	imagesEnd = imagesStart + imagesPerClick - 1;
	previousTags = '';
	}

function imageDisplay() {
	(
		function () {
		var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
		var myTags = $('#searchTerm').val() ;
		console.log (myTags);
		$.getJSON (flickerAPI , {
					tags: myTags ,
					tagmode: "any" ,
					format: "json"
					})
					.done(function (data) {
						$.each( data.items , function (j , item) {
						
							// If user changes their mind and chooses a different tag, reset start counter to zero
							if ( myTags != previousTags)
								{imagesStart = 0 ;}
							
							imagesEnd = imagesStart + imagesPerClick - 1;
							$("#images").listview("create");
							
							$('[data-role=list-view]').listview().trigger('create');
							if (j >= imagesStart)
								{
								currentImage = 'image_' + listCounter ;
								currentImageDiv  = 'imageDiv_' + listCounter;
								currentImageLink = 'imageLink_' + listCounter;
								
								console.log("Value of j is " + j + " Value of imagesEnd is" + imagesEnd);
								$( "<li>").attr("id" , currentImage).appendTo("#images");
								$("<a>").attr("data-rel" , "popup").attr("id" , currentImageLink).attr("href" , '#' + currentImageDiv).appendTo('#' + currentImage);
								$( "<img>").attr("src", item.media.m).appendTo('#' + currentImageLink);
								
								
										
								//following two lines SHOULD generate popup by themselves, but they don't
										
								$("<div>").attr("data-role" , "popup").attr("id" , currentImageDiv).appendTo('#popups');
								$( "<img>").attr("src", item.media.m).appendTo('#' + currentImageDiv);
								
								//Added this line because popups didn't work without it
								$('#' + currentImageDiv).popup();
								$("#images").listview("refresh");
								listCounter++;
								
								if ( j === imagesEnd )
									{
									 //before exiting, save tag user was using, and position, so if they
									 //look for same tag again, will start from last image, not go back to zero
									 console.log("Got into branch for imagesEnd");
									 previousTags = myTags;
									 imagesStart = imagesEnd + 1;
									 return false;
									}
																	
								}
						});
						
					$('#images').listview('refresh');
					});
		}
				
				
		)();
	}

function clearAll ()
	{
	$("#images").empty();
	$("#popups").empty();
	for (i = 0 ; i <= 20 ; i++)
		{
		//a NASTY hack to resolve a problem:
		//clear all function clears "popups" div but DOESN'T remove the popups
		$("#imageDiv_" + i + "-screen").remove();
		$("#imageDiv_" + i + "-popup").remove();		
		}
	init();
	}