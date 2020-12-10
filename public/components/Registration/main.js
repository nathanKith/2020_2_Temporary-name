'use strict';


import Registration from './Registration.js';

function Main(){
    const formView = document.getElementById('1');
    const div = document.createElement('div');
    div.classList.add('inner-formView');
    formView.appendChild(div);
    let reg = new Registration(div);
    reg.render();
}

Main();