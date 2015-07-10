			$(function() {

										
					//Creating uppercase version of availableTags for use when checking if user input is not in availableTags					
					var availableTagsCased = [];
 					
					for (i=0 ; i < availableTags.length ; i++)
							{availableTagsCased[i] = availableTags[i].toUpperCase();}
							
					$( "#searchTags" ).autocomplete({source: availableTags});
					
					var previousTag;
					
					$( "#search").click( function () {
											
											var selectedTag = $( "#searchTags" ).val();
											var nonSpaceCharacter = /\S+/;
											
											if ((nonSpaceCharacter.test(selectedTag) === true) && 
												(selectedTag != previousTag))
												{
												if (($.inArray(selectedTag, availableTags) === -1))
													{
													$( "#outputArea").append("There are no courses are available in " + selectedTag + "<br>");
													$( "#outputArea").append("Check tag spelling and search again");
													}
												
												else
													{
													$( "#outputArea").append("The following courses are available in " + selectedTag + ":");
											
													var courses = getCourses(selectedTag);
													displayCourses(courses);
													}
												}
												
											previousTag = selectedTag;
											});
					
					//Blank the input field and the previous response, when someone clicks on the input field again
					$( "#searchTags").click( function () {blankSheet();});

					$( "#add").click( function () {
											blankSheet();
											
											displayCourseForm ('');
												
											$("<button>Add This Course</button>").attr("id" , "addTheCourse").appendTo("#courseForm");
											
											$( "#addTheCourse").click( function () {
														console.log("Got into addtheCourse handler");
														var existingCourseTitles = getCourseTitles();
														var newCourseTitle = $( "#course_Title").val() ;
														
														if (newCourseTitle === '')
															{
															//will replace with a pretty pop up later, but just doing an alert for now
															alert("You have not selected a title!");
															}												
										
														else if ($.inArray(newCourseTitle, existingCourseTitles) != -1)
															{
															//will replace with a pretty pop up later, but just doing an alert for now
															alert("A course with title \"" + newCourseTitle + "\" already exists! Change the title");
															}
											
														else
															{
															var newCourse = getCourseDetails();
											
															allCourses.Courses.push(newCourse);
															blankSheet();
															}
											
													});	// encloses handler for "addTheCourse" button
													
											});	// encloses handler for "add" button					
				
					$( "#edit").click( function () 
							{
							 // Tried to implement functionality to edit courses but was unsuccessful
							 // Kept on running into coding problems and eventually had to give up
											blankSheet();
											
										/*	
											//need a means to SELECT a course-just picking one to get edit code right
											var course=allCourses.Courses[0];
											
											for (i = 0 ; i < courseFields.length ; i++)
												{
												field = courseFields[i];
												console.log ("Before edit, value for " + field + " is" + course[field]);
												
												}
											displayCourseForm (course);	
											$("<button>Clone This Course</button>").attr("id" , "cloneTheCourse").appendTo("#courseForm");
											$("<button>Commit Edits</button>").attr("id" , "commitEdits").appendTo("#courseForm");
											
											$("#commitEdits").click(function () {
											
															var newCourse = getCourseDetails();
											
															allCourses.Courses[0] = newCourse;
															course = allCourses.Courses[0];
											for (i = 0 ; i < courseFields.length ; i++)
												{
												field = courseFields[i];
												console.log ("After commit, value for " + field + " is" + course[field]);
												
												}															
															blankSheet();											
																}); //encloses handler for commit edits
																*/
											
							}); // encloses handler for edit button
														
					});
					
					function getCourses (tag)
						{
						var courses = new Array() ;	
						
						for (i=0 ; i < allCourses.Courses.length ; i++)
							{
							var course = allCourses.Courses[i];
							if ($.inArray(tag, course.tags) != -1)
								{courses.push(course);}
							}

						return courses;
				
						}
						
					//displays details of courses as a collapsible-set						
					function displayCourses(courses)
						{
						$("<div>").attr("id" , "courses").attr("data-role" , "collapsible-set").appendTo("#outputArea");
						$('[data-role=collapsible-set]').collapsibleset().trigger('create');
						
						for (i=0 ; i < courses.length ; i++)
							{
							var course = courses[i]; 
							$("<div>").attr("id" , "course_" + i).attr("data-role" , "collapsible").attr("data-collapsed" , "true").appendTo("#courses");
							$("<h2>" + course.Title + "</h2>").appendTo("#course_" + i);
							$("<table>").attr("class" , "courseTable").attr("id" , "course_" + i + "_information").appendTo("#course_" + i);
														
							for (var field in course)
								{
								$("<tr>").attr("id" , "course_" + i + "_" + field).appendTo("#course_" + i + "_information");
								$("<td>" + field + "</td>").attr("class" , "courseData").attr("style" , "font-weight: bold").appendTo("#course_" + i + "_" + field);
								$("<td>" + course[field] + "</td>").attr("class" , "courseData").appendTo("#course_" + i + "_" + field);
								}
							}
						$("#courses").collapsibleset( "refresh" );
						}
						
						
					//INTENDED to generate form for creating new course and updating existing one.
					//Displays OK for existing course, and can update details but ran into problems when committing
					function displayCourseForm(course)
						{
							$("<div>").attr("data-role" , "fieldContain").attr("id" , "courseForm").appendTo("#editArea");
							$("<table>").attr("id" , "courseFormTable").appendTo("#courseForm");
							for (i = 0 ; i < courseFields.length ; i++)
								{	
								field = courseFields[i];
								if (field != "tags")
									{formLineGeneral ( field , course);}
								else if (field === "tags")
									{formLineTags (field , course);}
								}
						}
						
					function formLineGeneral(field , course)
						{
							formLineFieldValue (field) ;
				
							var placeHolderText = '' ;
							$("<textarea>" + field).attr("type" , "text").attr("rows" , "2").attr("cols" , "40").attr("id" , "course_" + field).appendTo("#" + field + "_value");
							$("#" + "course_" + field).val(course[field]);
							if (field === "Title")
								{
								 if (course === '')
									{$("#" + "course_" + field).attr("placeholder" , "This attribute is MANDATORY and must be UNIQUE"); }
								 else
									{$("#" + "course_" + field).attr("disabled","disabled");}
								}
						}

					function formLineTags(field , course)
						{
							formLineFieldValue (field) ;							
							availableTags.sort();
							displayTagsCheckBox();
							currentTags = course[field] ; 

							$("<div>").attr("id" , "newTagArea").appendTo("#courseFormTable");

							$("<button>Add New Tag(s)</button>" + addNewTag).attr("id" , "addNewTagButton").attr("legend" , "Add New Tag(s)").appendTo("#newTagArea");
						
							$(function() {
											$("#addNewTagButton").click( function () {
													$("#addNewTagButton").prop('disabled', true);
													$("<input>").attr("type" , "text").attr("id" , "newTagValue").appendTo("#newTagArea");
													$("<button>Add This Tag</button>" + addNewTag).attr("id" , "addThisTagButton").attr("legend" , "Add This Tag").appendTo("#newTagArea");
													$("<button>Finished Adding Tags</button>" + addNewTag).attr("id" , "finishedTagsButton").attr("legend" , "Finished Adding Tags").appendTo("#newTagArea");
										
													$("#newTagValue").val();
											
													$("#addThisTagButton").click( function () {
																	
															var newTagValue = $("#newTagValue").val();
															if ($.inArray(newTagValue , availableTags) === -1)
																{var selectedTags = getSelectedTags();
																 selectedTags.push(newTagValue);
																 availableTags.push(newTagValue);
																 displayTagsCheckBox();
																 checkSelectedTags(selectedTags);
																}
															else
																{
																alert("Tag " + newTagValue + " already exists!");
																$("#newTagValue").val('');
																}						
											
															}); // encloses addThisTagButton
															
													$("#finishedTagsButton").click( function () {
											
															$("#newTagArea").empty();
																});	
											
													});	// encloses addNewTagButton
											});
						}
						
					function formLineFieldValue (field)
						{
							$("<tr>").attr("id" , field + "_row").appendTo("#courseFormTable");
							$("<td>").attr("id" , field + "_legend").appendTo("#" + field + "_row");
							$("<div>" + field + "</div>").attr("data-role" , "fieldContain").attr("id" , field).appendTo("#" + field + "_legend");
							$("<td>").attr("id" , field + "_value").appendTo("#" + field + "_row");						
						}						

					// takes array of tags as parameter and checks boxes for them in tags checkbox
					function checkSelectedTags (selectedTags)
						{
						for (i=0 ; i < selectedTags.length; i++)
							{
							var alteredTag = selectedTags[i].replace( '#' , 'HASH_SYMBOL');
							$("#" + alteredTag).prop("checked", true);
							}						
						$("#tags_Checkbox").controlgroup("refresh" , true);						
						}
						
					//returns array of tags checked in tags checkbox
					function getSelectedTags ()
						{
						var selectedTags = [] ;
						for (i=0 ; i < availableTags.length; i++)
							{
							var alteredTag = availableTags[i].replace( '#' , 'HASH_SYMBOL');
							var checkBox = document.getElementById(alteredTag);
							if (checkBox.checked)
										{selectedTags.push(availableTags[i]);}
							}						
						
						return selectedTags ; 
						}

					//generates tag checkbox
					function displayTagsCheckBox ()
							{

							//TRIED doing this with a multiple select box, a la http://demos.jquerymobile.com/1.3.0-rc.1/docs/forms/selects/
							//BUT ran into problems with security errors so used checkboxes instead
																
							$("#tags_row").empty();
							$("<div>").attr("data-role" , "fieldcontain").attr("id" , "tags_Checkbox").appendTo("#tags_row");
							$("<fieldset>").attr("data-role" , "controlgroup").attr("id" , "tags_Checkbox_controlgroup").appendTo("#tags_Checkbox");
							$("<legend>Choose Tag(s)</legend>").appendTo("#tags_Checkbox_controlgroup");
							
							for (i=0 ; i < availableTags.length; i++)
								{
									var alteredTag = availableTags[i].replace( '#' , 'HASH_SYMBOL');
									$("<input>").attr("type" , "checkbox").attr("name" , alteredTag).attr("id" , alteredTag).attr("class" , "custom").appendTo("#tags_Checkbox_controlgroup");
									var checkboxlabel = '<label for="' + alteredTag + '">' + availableTags[i] + '</label>' ;
									$(checkboxlabel).appendTo("#tags_Checkbox_controlgroup");
								
								}
								
							$("#tags_Checkbox").controlgroup();
							$("#tags_Checkbox").controlgroup("refresh" , true);		

							}						
						
					function getCourseTitles()
						{
							var existingCourseTitles = [] ;
							for (i=0 ; i < allCourses.Courses.length ; i++)
							{
							var courseTitle = allCourses.Courses[i].Title;
							existingCourseTitles.push(courseTitle);
							}
							return existingCourseTitles;
						}
						
					// retrieves values from form when creating new course	
					function getCourseDetails()
						{
						var newCourse = new Array();
						for (i = 0 ; i < courseFields.length ; i++)
							{
							field = courseFields[i];											
							if (field != "tags")
								{newCourse[field] = $( "#course_" + field ).val();
								}
							console.log("newCourse[" + field +"]=" + newCourse[field]);
							}
													
						var newTags = getSelectedTags();
						newCourse["tags"] = newTags ;
											
						return newCourse;

						}
					
					function blankSheet() {
					$( "#searchTags" ).val('');
					$( "#outputArea").empty();
					$( "#editArea").empty();
					
					}
					
					
					

						



					

					