const items = document.querySelectorAll('.countdown-item > h4');


// start time

let halvings = {
    halv4: {},
    halv5: {},
    halv6: {},
    halv7: {},
    halv8: {},
};

halvings.halv4.date = new Date(2024, 3, 8, 0, 0, 0);
halvings.halv5.date = new Date(2028, 5, 0, 0, 0, 0);
halvings.halv6.date = new Date(2032, 5, 0, 0, 0, 0);
halvings.halv7.date = new Date(2036, 5, 0, 0, 0, 0);
halvings.halv8.date = new Date(2040, 5, 0, 0, 0, 0);

halvings.halv4.reward = [6.25, 3.125];
halvings.halv5.reward = [3.125, 1.5625];
halvings.halv6.reward = [1.5625, 0.78125];
halvings.halv7.reward = [0.78125, 0.390625];
halvings.halv8.reward = [0.390625, 0.1953125];

halvings.halv4.mined = '96.875';
halvings.halv5.mined = '98.4375';
halvings.halv6.mined = '99.21875';
halvings.halv7.mined = '99.609375';
halvings.halv8.mined = '99.8046875';


let targetTime = halvings.halv4.date;
// let countDown = setInterval(getCountdownTime, 1000, targetTime);
let countDown;
changeData(halvings.halv4);

let buttons = document.querySelectorAll('button');

buttons.forEach(btn => {
    console.log(btn.id);
    btn.addEventListener('click', event => {
        changeData(halvings[btn.id]);
        
        const type = event.target.dataset.type;

        if (type == 'off') {
            // make all buttons off
            buttons.forEach(button => {
                button.classList = 'halving';
                button.dataset.type = 'off'
            })
            
            const node = event.target
            node.classList = 'halving halving-off';
        }
        console.log(type);
    });
})



/// functions

function changeData(data) {
    //restart timer
    targetTime = data.date;
    clearInterval(countDown);
    countDown = setInterval(getCountdownTime, 1000, targetTime);
    
    // change text
    document.getElementById('now').textContent = data.reward[0];
    document.getElementById('after').textContent = data.reward[1];
    document.getElementById('mined').textContent = data.mined;

}

function getCountdownTime(countdownDate = halvings.halv4.date) {
    //current time
    const now = new Date().getTime();

    const differense = countdownDate - now;

    
    const oneMinute = 60 * 1000;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;
    const oneYear = oneDay * 365;

    

    let years = Math.floor(differense / oneYear);
    let days = Math.floor((differense % oneYear) / oneDay);
    let hours = Math.floor((differense % oneDay) /oneHour);
    let minutes = Math.floor(((differense % oneDay) % oneHour) / oneMinute);
    let second = Math.floor((((differense % oneDay) % oneHour) % oneMinute) / 1000);

    let timeArr = [years, days, hours, minutes, second];

    items.forEach((item, index) => {
        item.textContent = timeArr[index];
    })
}

