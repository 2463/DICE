let number = 0;
let parentBox = document.getElementById('rightbox');
let lastdie = document.getElementById('die0');
let dice = [lastdie];

function random(num) {
    return Math.ceil(num * Math.random());
}

function roll(die) {
    return function () {
        let face_b = die.getElementsByClassName('face')[0];
        let result_b = die.getElementsByClassName('result')[0];
        let rnd_value = random(face_b.value);
        result_b.innerHTML = rnd_value;
        return Number(rnd_value);
    }
}
function roll_all(bigdie) {
    return function () {
        let sum = 0;
        dice.forEach(die => {
            sum += roll(die)();
        });
        let result_b = bigdie.getElementsByClassName('result')[0];
        result_b.innerHTML = sum;
    }
}

function fade(die) {
    return function (event) {
        if (event.buttons != 1) { return }
        die.getElementsByClassName('result')[0].innerHTML = '-';
    }
}

function fade_all(bigdie) {
    return function (event) {
        dice.forEach(die => {
            fade(die)(event);
        });
        fade(bigdie)(event);
    }
}

function face(die) {
    return function (keypress_event) {
        if (keypress_event.keyCode != 13) { return }
        roll(die)();
    }
}
function plus() {
    number += 1;

    /** make die block */
    let newdie = document.createElement('div');
    newdie.className = 'die';
    newdie.id = 'die' + number;
    newdie.innerHTML = `
        <input type="text" name="face" class="face" value="6">
        <img class="roll" src="./img/roll.svg" alt="Roll">
        <div class="result">Result</div>
    `;
    parentBox.insertBefore(newdie, lastdie.nextSibling);
    lastdie = newdie;
    dice.push(newdie);

    /** add EventListeners */
    newdie.addEventListener('click', roll(newdie));
    newdie.addEventListener('mousedown', fade(newdie));
    newface_b = newdie.getElementsByClassName('face')[0];
    newface_b.addEventListener('keypress', face(newdie));

}
function minus() {
    if (number === 0) { return }
    number -= 1;
    lastdie.outerHTML = '';
    dice.pop();
    lastdie = dice[dice.length - 1];
}

function init_process() {
    const bigdie = document.getElementById('bigdie');
    const die0 = document.getElementById('die0');
    const face0_b = die0.getElementsByClassName('face')[0];
    const plus_b = document.getElementById('plus');
    const minus_b = document.getElementById('minus');

    bigdie.addEventListener('click', roll_all(bigdie));
    bigdie.addEventListener('mousedown', fade_all(bigdie));
    die0.addEventListener('click', roll(die0));
    die0.addEventListener('mousedown', fade(die0));
    face0_b.addEventListener('keypress', face(die0));
    face0_b.addEventListener('keydown', fade(die0));
    plus_b.addEventListener('click', plus);
    minus_b.addEventListener('click', minus);
}

window.addEventListener('load', init_process);