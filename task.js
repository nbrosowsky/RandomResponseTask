let landing = {

    create: function () {
        document.querySelector("#load-div").style.display = "none"
        document.querySelector("#main-display").innerHTML = [
             '<div id="landing" class="standard-display absolute-center">',
                '<div style="width:80%;">',
                    '<p>Thank you for agreeing to participate in this research.</p>',
                    '<p>When you’re ready to get started, press “Next” to begin.</p>',
                    '<br>',
                '<div style="text-align: right">',
                    '<button id="dyn-bttn" style="text-align: center" class="button-green">NEXT</button>',
               '</div>',
            '</div>'

        ].join("\n")

        document.querySelector("#dyn-bttn").setAttribute("onClick", "javascript: landing.end();")

    },

    end: function () {
        instructions.create_1();
    }



}

let instructions = {

    create_1: function () {
        document.querySelector("#main-display").innerHTML = [
             '<div id="landing" class="standard-display absolute-center">',
                '<div style="width:80%;">',
                    '<p>How random can you be?</p>',
                    '<p>Your task in this experiment is to press M or N. The computer is going to try guess which button you are about to press.</p>',
                    '<p>Every time the computer guesses right, it will get a point. Every time it guesses wrong, you will get a point.</p>',
                    '<p>To win, you have to respond as random as possible and keep the computer from guessing correctly.</p>',
                    '<br>',
                '<div style="text-align: right">',
                    '<button id="dyn-bttn" style="text-align: center" class="button-green">START</button>',
               '</div>',
            '</div>'

        ].join("\n")

        document.querySelector("#dyn-bttn").setAttribute("onClick", "javascript: instructions.end();")

    },

    end: function () {
        RR_task.start();
    }



}


let RR_task = {

    start: function () {
        document.querySelector("#main-display").innerHTML = [
             '<div class="score">',
              '<p>ME: <span id="YOU" style="color:green">0</span></p>',
                '<p>AI: <span id="AI" style="color: red">0</span></p>',
             '</div>'
        ].join("\n")

    }

}


let createRList = function (length) {

    function LoopIt(depth, baseString, arrLetters) {
        var returnValue = "";
        for (var i = 0; i < arrLetters.length; i++) {
            returnValue += (depth == 1 ? "," + baseString + arrLetters[i] : LoopIt(depth - 1, baseString + arrLetters[i], arrLetters));
        }
        return returnValue;
    }

    let combos = LoopIt(length, "", ["1", "0"]).split(",")
    combos.shift()

    r = {}

    for (i = 0; i < combos.length; i++) {
        r[combos[i]] = [0, 0]
    }

    return r
};



data = {
    ai: 0,
    you: 0,
    response_tracker: createRList(2),
    response: [],
    response_times: [],
    response_last: []
}

document.addEventListener("keydown", event => {
    if (event.keyCode == 8) {
        event.preventDefault();
        return;
    }


    key_time = window.performance.now();

    /* if M or N*/
    if (event.keyCode === 77 || event.keyCode === 78) {
        event.preventDefault();

        let r,
            guess;

        (event.keyCode === 77) ? r = 0: r = 1;

        if (data.response_last.length < 2) {
            guess = g.shuffle([1, 0])[0]
            console.log(guess)
            console.log(r)
            data.response_last.push(r)
            data.response.push(r)
            data.response_times.push(key_time)
        } else {
            guess = MaxOrRandom(data.response_tracker[data.response_last.join("")])
            data.response_tracker[data.response_last.join("")][r]++
            data.response.push(r)
            data.response_last.push(r)
            data.response_last.shift();
            console.log(guess)
            console.log(r)
        }
        
        if(guess === r){
            data.ai++
        } else {
            data.you++
        }
        
        document.querySelector("#YOU").innerHTML = data.you
        document.querySelector("#AI").innerHTML = data.ai

    }

}, false)

function MaxOrRandom(arr) {
    function shuffle(array) {
    var tmp, current, top = array.length;
    if (top)
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }

    return array;
}
    
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    if (arr[0] === arr[1]) {
        maxIndex = shuffle([0, 1])[0]
    } else {
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }


    }


    return maxIndex;
}
