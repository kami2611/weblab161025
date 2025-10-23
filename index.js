const studentdata = {
    name: "kamran",
    age: 21,
    university: 'uol',
    hobbies: ['badminton', 'cricket']
};
studentdata.hobbies.forEach((hobby) => {
    console.log(hobby);
})

document.addEventListener('DOMContentLoaded', () => {
    const htmlbtn = document.getElementById('mybutton');
    htmlbtn.addEventListener('click', function () {
        const myheading = document.getElementById('myheading');
        myheading.textContent = 'heading changed';
    })
});

setTimeout(() => {
    console.log('after 3 second it executed');

}, 3000);