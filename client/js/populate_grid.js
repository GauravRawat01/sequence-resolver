function fillgrid(){
    var content  = "";
    var count =0;
    for(var i=0; i<8; i++){
        content = content + "<div id=\"row" + i + "\" class=\"row\">";
        for(var j=0; j<8; j++){
            content = content + "<div id=\"column"+j+"\" class=\"column\" onclick=\"clicked("+(++count)+")\" style=\"background-color:";
            switch(count%10){
                case 0 : content = content + "blue;\">";
                break;
                case 1 : content = content + "red;\">";
                break;
                case 2 : content = content + "yellow;\">";
                break;
                case 3 : content = content + "green;\">";
                break;
                case 4 : content = content + "orange;\">";
                break;
                case 5 : content = content + "violet;\">";
                break;
                case 6 : content = content + "brown;\">";
                break;
                case 7 : content = content + "teal;\">";
                break;
                case 8 : content = content + "pink;\">";
                break;
                case 9 : content = content + "grey;\">";
                break;
            }
            content = content + "<h1>" + (count) + "</h1>";
            content = content + "</div>";
        }
        content = content + "</div>"
    }
    document.getElementById('grid').innerHTML = content;
}

function clicked(value){
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addClick", true);
    xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhttp.send("username="+localStorage.getItem('username')+"&click_num="+value);
}