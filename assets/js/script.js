const eyeIcon = document.querySelector('.eye');
const input = document.querySelector('#password');
const passwordBox = document.querySelector('.password-box');
const toggle = document.querySelector('.toggle');
const modalInput = document.querySelectorAll('.reset-modal-container form div input');
const modalEyeIcon = document.querySelectorAll('.reset-modal-container form div span')
const resetPassword = document.querySelector('.reset-container a');
const resetModal = document.querySelector('.reset-modal');
const modalPassword = document.querySelector('#password1');
const checkList = document.querySelectorAll('.password-check-div ul li');

const success = document.querySelector('#confirm-message');
const match = document.querySelector('#match-msg');



let getValue = localStorage.getItem('key');

if(getValue) {
    input.value = getValue;
}

function display() {
    if(input.type == "password") {
        input.type = "text";
        input.style.fontWeight = "normal";
        input.style.fontSize = 15 + "px";
        passwordBox.classList.add('active');
        eyeIcon.classList.add('active');
        eyeIcon.innerHTML = '&#xf06e;';
    } else if(input.type = "text"){
        input.type = "password";
        eyeIcon.classList.remove('active');
        passwordBox.classList.remove('active');
    }
}

eyeIcon.addEventListener('click', ()=> {
    display();
})

modalEyeIcon.forEach((li,index)=> {
    li.addEventListener('click', ()=> {
        if(modalInput[index].type == "password") {
            modalInput[index].type = "text";
            modalInput[index].style.fontWeight = "normal";
            modalInput[index].style.fontSize = 15 + "px";
            li.classList.add('active');
        } else if(modalInput[index].type == "text"){
            modalInput[index].type = "password";
            li.classList.remove('active');
        }
    })
})

resetPassword.addEventListener('click', ()=> {
    document.querySelector('.info-box').style.display = 'none';
    resetModal.style.display = 'block';
    modalPassword.value = "";
    modalConfirmPassword.value = "";
})

toggle.addEventListener('click', ()=> {
    toggle.classList.toggle('show');

    localStorage.setItem('key',input.value);
})

//Password validation
let validation = [
    { regex: /.{8,}/, index:0 }, // Atleast 8 characters
    { regex: /[A-Z]/, index:1}, // One uppercase letter
    { regex: /[a-z]/, index:2}, // One lowercase letter
    { regex: /[0-9]/, index:3 }, // One number
    { regex: /[^A-Za-z0-9]/, index:4} // One special character
]

modalPassword.addEventListener('keyup', ()=> {
    validation.forEach((item) => {
        let validReg = item.regex.test(modalPassword.value);
        var validItem = checkList[item.index];
        
        if(validReg) {
            validItem.classList.add('checked');
        } else {
            validItem.classList.remove('checked');
        }
    } )
})

//confirm button functionality
const confirmBtn = document.querySelector('.confirm-btn');
const modalConfirmPassword = document.querySelector('#password2');
var errorMsg = document.querySelector('.error-container p'); 

confirmBtn.addEventListener('click', ()=> {
    var count = 0;
    checkList.forEach((li,ind) => {
        var countValue = li.classList.contains('checked') ? count++ : count;
    })

    console.log(count);

    if(count == 5) {

        console.log(count);
         if(modalPassword.value === modalConfirmPassword.value) {
             errorMsg.innerHTML = "";
             success.innerHTML = 'Your password has been successfully reset.';
             match.innerHTML = '';
            } else {
                console.log(match);
                match.innerHTML = 'Both passwords should match.';
                errorMsg.innerHTML = "";
            }

        } else {
        errorMsg.style.display = 'block';
        errorMsg.innerHTML = "password should satisfy all the mentioned condition";
    }
})

//Back button functionality
const backBtn = document.querySelector('.back-box');

backBtn.addEventListener('click', ()=> {
    resetModal.style.display = 'none';
    document.querySelector('.info-box').style.display = 'block';

    checkList.forEach((li) => {
        console.log(checkList);
        if(li.classList.contains('checked')) {
            li.classList.remove('checked')
        }
    })
    document.querySelector('#confirm-message').innerHTML = '';

})

