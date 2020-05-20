//store tasks entered in by user
let tasks = [];
//function executed upon submission of the form
addItem=()=>{
    //clear validation alerts
    document.getElementById("validatedate").innerText = "";
    document.getElementById("validatetask").innerText = "";
    //assign user inputs to variables
    var item = document.getElementById("input1").value;
    var dat = document.getElementById("input2").valueAsNumber;
    //get current date
    var now = new Date();
    var nowms = now.getTime();
    //format date for validation feedback
    var format_date = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`
    //calculate time until deadline
    var timeleft = Math.round((dat - nowms)/(1000*60*60*24)) + 1;
    //check if inputs are valid
    if(item && timeleft > 0)
    {
        //clear task field in order to resort
        document.getElementById("todolist").innerHTML = "";
        //add first task if none exist yet
        if (tasks.length == 0 || timeleft >= tasks[tasks.length-1][1])
        {
            tasks.push([item, timeleft]);
        }
        //sort tasks in order by deadline
        else 
        {
            for (var i = 0; i < tasks.length; i++)
            {
                if (timeleft < tasks[i][1])
                {
                    tasks.splice(i, 0, [item, timeleft])
                    break;
                }
            }
        }
        //populate tasks onto page
        for (var i = 0; i < tasks.length; i++){
            //handle day/days
            if (tasks[i][1] == 1)
            {
                document.getElementById("todolist").innerHTML += (`<div id="${i}" role='alert'><div>${tasks[i][0]}<span type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true' onclick='remove(${i})'>&times;</span></span></div><div>1 day</div></div>`);
            }
            else
            {
                document.getElementById("todolist").innerHTML += (`<div id="${i}" role='alert'><div>${tasks[i][0]}<span type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true' onclick='remove(${i})'>&times;</span></span></div><div>${tasks[i][1]} days</div></div>`);
            }
            //assign color to task alerts based on deadline (<2 days = red, <7 days = yellow, >= 7 days = grey)
            if (tasks[i][1] > 6)
            {
                document.getElementById(i).setAttribute("class", " alert alert-secondary alert-dismissible mr-2 task")
            } 
            else if (tasks[i][1] > 2)
            {
                document.getElementById(i).setAttribute("class", "alert alert-warning alert-dismissible mr-2 task")
            } 
            else 
            {
                document.getElementById(i).setAttribute("class", "alert alert-danger alert-dismissible mr-2 task")
            }
        }
    }
    //feedback if inputs aren't valid
    else
    {
        if (item == "")
        {
            document.getElementById("validatetask").innerHTML = "<span class='validate px-3 pb-2'>You must enter in a task!</span>";
            return false;
        }
        else if (!dat)
        {
            document.getElementById("validatedate").innerHTML = "<span class='validate px-3 pb-2'>You must enter in a date!</span>";
            return false;
        }
        else
        {
            document.getElementById("validatedate").innerHTML = `<span class='validate px-3 pb-2'>You must enter in date after ${format_date}!</span>`;
            return false;
        }
    }
    //clear input fields
    document.getElementById("myform").reset();
}

remove=(x)=>{
    tasks.splice(x,1);
}