'use strict'




import Authorization from "./Authorization.js";

function Main(){
    const formView = document.getElementById('1');
    const div = document.createElement('div');
    div.classList.add('inner-formView');
    formView.appendChild(div);
    let auth = new Authorization(div);
    auth.render();
}

Main();