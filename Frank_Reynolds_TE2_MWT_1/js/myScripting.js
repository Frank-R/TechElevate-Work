/*
* Author: Frank Reynolds
* Assignment: TE2.0 Mobile Web Technologies, Digital Skills Academy
* Student ID: xxxxx
* Date : 2015/06/25
* Ref: website link to code referenced or the book, authors name and page number

*/

		

//A function to initalize the page
//using stored data from course.js just to test it for the moment-get it working
	
//perhaps also a function to initalise the side panel menu based on the JSON			
function init()
	{
	
	var courseTitles = new Array();
	
	var items=readJSON();
	
	//following code is ECMSA6: don't know if it will work
	var keys = Object.keys(items);
	
	for (i=0 ; i < keys.length ; i ++)
			{
				console.log("Key " + keys[i] + " Value " + items.keys[i]);
				
				//courseTitles[i] = courses[i].Title;
			}
	
//	courseTitles.sort();	
//	listUpdate(courseTitles);

	}
	
//A function to read JSON
//Starting with a locally stored file:
//perhaps later will extend to take URL as a parameter
function readJSON ()
	{
	var returnItems = new Array;	
	$.getJSON( "json/albums.json", function( data ) {
													var items = [];
													//copied directly from http://api.jquery.com/jquery.getjson/
													//also DON'T yet have a function for failure
													$.each( data, function( key, val ) {
																items.push( key , va );
																	});	
													returnItems = items;
													});
	return returnItems;
	}
	
//A Function to update the list, based on choice user picks from side panel menu
function listUpdate (items)

	{

	for (i=0 ; i < items.length ; i ++)
			{			
			itemId = items[i].replace(/\s+/g , '_');
			itemId = itemId.replace(/#/g , '_HASH_SYMBOL');
			
			$( "<li>").attr("id" , itemId).appendTo("#theList");
			
			$("<a>" + items[i]).attr("id" , itemId + "_link").attr("onclick" , 'listClickHandler("' + items[i] + '")').attr("href" , '#itemDetails').appendTo('#' + itemId);
			
			$("#" + itemId + "_link").append(items[i]);
			
			}
	$("#theList").listview("refresh");	
	
	}

	
function listClickHandler(item)
	{
	
	console.log("Yeah mon, listClickHandler is called when you click on" + item);
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