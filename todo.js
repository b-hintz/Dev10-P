let tasks = [];

addItem=()=>{
    document.getElementById("validatedate").innerText = "";
    document.getElementById("validatetask").innerText = "";
    var item = document.getElementById("input1").value;
    var d = document.getElementById("input2").value;
    var dat = document.getElementById("input2").valueAsNumber;
    var now = new Date();
    var nowms = now.getTime();
    var format_date = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`
    var timeleft = Math.round((dat - nowms)/(1000*60*60*24)) + 1;

    if(item && timeleft>0)
    {
        document.getElementById("todolist").innerHTML = "";
        if (tasks.length == 0 || timeleft >= tasks[tasks.length-1][1])
        {
            tasks.push([item, timeleft]);
        }
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
        for (var i = 0; i < tasks.length; i++){
            if (tasks[i][1] == 1)
            {
                document.getElementById("todolist").innerHTML += (`<div id="${i}" role='alert'><div>${tasks[i][0]}<span type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden= 'true'>&times;</span></span></div><div>1 day</div></div>`);
            }
            else
            {
                document.getElementById("todolist").innerHTML += (`<div id="${i}" role='alert'><div>${tasks[i][0]}<span type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden= 'true'>&times;</span></span></div><div>${tasks[i][1]} days</div></div>`);
            }
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
    else
    {
        if (item == "")
        {
            document.getElementById("validatetask").innerHTML = "<span class='validate px-3 pb-2'>You must enter in a task!</span>";
            return false;
        }
        else if (d == "")
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
    document.getElementById("myform").reset();
}
