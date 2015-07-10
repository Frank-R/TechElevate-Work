			$(function() {
					var availableTags = [
										"ActionScript" ,
										"AppleScript",
										"Asp" ,
										"BASIC" ,
										"C" ,
										"C++" ,
										"C#" ,
										"Clojure" ,
										"Cobol" ,
										"ColdFusion" ,
										"Erlang" ,
										"Fortran" ,
										"Groovy" ,
										"Haskell" ,
										"Java" ,
										"Javascript" ,
										"Lisp" ,
										"Perl" ,
										"Python" ,
										"Ruby" ,
										"Scala" ,
										"Scheme"
										];
										
										
					//Creating uppercase version of availableTags for use when checking if user input is not in availableTags					
					var availableTagsCased = [];
 					
					for (i=0 ; i < availableTags.length ; i++)
							{availableTagsCased[i] = availableTags[i].toUpperCase();}
							
					$( "#tags" ).autocomplete({source: availableTags});
					
					$( "#search").click( function () {
											//DELIBERATELY emptying outputArea because ran into problems 
											//with output being repeated when clicked on search button
											$( "#outputArea").empty();
					
											var selectedTag = $( "#tags" ).val();
											console.log("Got into click handler, selectedTag value is: " + selectedTag);
											$( "#outputArea").append("The following courses are available in " + selectedTag + ":");
											
											//If user input is not in availableTags, add
											//Also, add uppercased version to availableTagsCased array
											var selectedTagCased = selectedTag.toUpperCase();
											if ($.inArray(selectedTagCased , availableTagsCased) === -1)
													{availableTags.push(selectedTag);
													 availableTagsCased.push(selectedTagCased);}
											});
											
											
					//Blank the input field and the previous response, when someone clicks on the input field again
					$( "#tags").click( function () {$( "#tags" ).val('');});
					
					});