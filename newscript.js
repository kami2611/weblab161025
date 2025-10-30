document.addEventListener('DOMContentLoaded', () => {
    console.log('added js');
    const myform = document.getElementById('mainform');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    myform.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('form submitted');
        console.log(name.value);
        console.log(email.value);
        console.log(message.value);
    })
})