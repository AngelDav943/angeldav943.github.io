var targets = [
    "big fart",
    "fart",
    "super epic fart",
    "fak"
]

function submit() {
    var input = document.getElementById('MInput')
    var output = document.getElementById('MOutput')
    
    var correct = 0;
    var incorrect = 0;
    
    const splitinput = input.value.split("")
    var splittarget = target.split("")
    var length_dif = target.length - splitinput.length

    for (let i = 0; i < splitinput.length; i++) {
        if (i < splittarget.length && splittarget[i] === splitinput[i]) {
            correct++;
        } else {
            incorrect++;
        }
    }

    var result = (correct-incorrect) / (target.length + length_dif);

    if (result < 0) result = 0

    result = Math.ceil(result*100)/100

    output.innerHTML = `${result * 100}% <br> ${correct}-${incorrect}`;
    input.value = "";
}