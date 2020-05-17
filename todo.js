let counter = 0;

addItem=()=>{
        var item = document.getElementById("input1").value;
        var dat = document.getElementById("input2").valueAsNumber;
        var now = new Date();
        var nowms = now.getTime();
        var timeleft = Math.round((dat - nowms)/(1000*60*60*24)) + 1;

        if(item && timeleft>0){
            document.getElementById("todolist").innerHTML += ("<div id=" + counter + " role='alert'><div>" + item + "<span type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden= 'true'>&times;</span></span></div><div id=" + (counter+1) + ">" + timeleft + " day(s)</div></div>");
            if (timeleft > 6)
            {
                document.getElementById(counter).setAttribute("class", " alert alert-secondary alert-dismissible mr-2 task")
            } 
            else if (timeleft > 2)
            {
                document.getElementById(counter).setAttribute("class", "alert alert-warning alert-dismissible mr-2 task")
            } else 
            {
                document.getElementById(counter).setAttribute("class", "alert alert-danger alert-dismissible mr-2 task")
            }
            counter += 2;
        }
    document.getElementById("input1").value="";
    document.getElementById("input2").value="";
    }
