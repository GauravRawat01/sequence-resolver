var modal = document.getElementById('id01');

window.onclick = function(event){
    if(event.target ==modal{
        modal.style.display= "none";
    }
}

function storeUsername(event){
    var username = document.getElementById('username').value;
    localStorage.setItem('username',username);
}