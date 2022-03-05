var nonImportantClass = "far fa-star"; //Global variables
var importantClass = "fas fa-star";
var isImportant = false;
var isFormVisible = true;

function toggleImportant() { //this function is for the important star and will allow us to toggle between a filled and unfilled star to show importance.
  //this function toggles the form. we create the function by providing a name that describes the functionality function()  
    console.log("icon clicked");

    if(isImportant) { //if the task is not important the variable will equal false
        //non important
        isImportant = false;
        $("#iImportant").removeClass(importantClass);//when the variable is false we remove the imporant variable and
        $("#iImportant").addClass(nonImportantClass); //we pass the the non important which is displayed as unclicked
    }
    else { //else will remove the non important variable and pass the imporant variable to displays the important star when clicked.
        //important
    $("#iImportant").removeClass(nonImportantClass);
    $("#iImportant").addClass(importantClass);
    isImportant= true;
    }

}

function toggleForm() { //this function toggles the form. we create the function by providing a name that describes the functionality function()
    if(isFormVisible){  //we can use if/esle to toggle the process true and false with the global variable we created to pass true and false --->
        //inside of the function.
        isFormVisible = false; // if the form isnt displayed on the webpage the function equals false.
        $("#form").hide(); //We use Jquery to call and hide element within the HTML file.
    }
    else{ //else will call the the value true and display the form on the webpage
        //show
        isFormVisible =true; //variable switched to true
        $("#form").show(); //Jquery call the function and displays the form on the webpage.
    }
    
    }
    function saveTask() { // this function will save each value on the form which will display the task on the web page
    

        let title = $("#txtTitle").val();  //we can create variables within the function and use Jquery 
        let date = $("#selDate").val(); //to pass the information passed in the form and create each task
        let contact = $("#txtContact").val(); //that will be displayed 
        let location = $("#txtLocation").val();
        let desc = $("#txtDescription").val();
        let color = $("#selColor").val();
    

         let task = new Task(isImportant, title, date, contact, location, desc, color); //this variable will create a new task
         let dataStr = JSON.stringify(task); //JSON will help pass the information within the the div to be displayed
         console.log(task);
         console.log(dataStr);

         //save the task
         $.ajax({
             type: "POST",
             url: "https://fsdiapi.azurewebsites.net/api/tasks/",
             data: dataStr,
             contentType: "application/json",

             success: function(data) {
                 console.log("Save res", data);
                 let savedTask = JSON.parse(data);

                 displayTask(savedTask);

             },
             error: function(error) {
                 console.log("Save failed", error);
             }
         });

         //display
         

         clearForm();
    }

    function clearForm() {

        let title = $("#txtTitle").val();  //this is jquery
        let date = $("#selDate").val();
        let contact = $("#txtContact").val();
        let location = $("#txtLocation").val();
        let desc = $("#txtDescription").val();
        let color = $("#selColor").val("#000000");

    }

function displayTask(task) {
    let syntax = `<div id="${task._id}" class="task">
    <div class="info">
        <h5>${task.title}</h5>
        <p>${task.description}</p>
    </div>
        <label class="date">${task.dueDate}</label>
    <div class="extra">
        <label class="location">${task.location}</label>
        <label class="contact">${task.contact}</label>
    </div>
        <button onclick="deleteTask('${task._id}')" class="btn btn-sm btn-danger">Remove</button>
    
    </div>`;

    $("#tasks-list").append(syntax);
}

function deleteTask(id) {
    console.log("deleting task", id);
    $("#" + id).remove();
}

function retrieveTasks() {
    https://fsdiapi.azurewebsites.net/api/tasks

    $.ajax({
        type: "GET",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        success: function(data) {
            let list = JSON.parse(data);
            for(let i=0; i< list.length; i++) {
                let task = list[i];
                if (task.name === "Nandoch26")
                displayTask(task);
                
                
            }
        },
        error: function(error) {
            console.error("Retrieve failed", error);
        }
    });

}

function init() {
    console.log("hello");

    //events
    $("#iImportant").click(toggleImportant);
    $("#btnToggleForm").click(toggleForm);
    $("#btnSave").click(saveTask);
    

    //load data
    retrieveTasks();

}

window.onload = init;