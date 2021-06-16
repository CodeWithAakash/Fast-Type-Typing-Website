const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quotedisplay = document.getElementById("quote-display");
const textarea = document.getElementById("textarea");
const mainresultdiv = document.getElementById("main-result-div");
const resetbtn = document.getElementById("reset-btn");
const showspeedspan = document.getElementById("showspeedspan");
const showaccuracyspan = document.getElementById("showaccuracyspan");

const btn = document.getElementById("btn");
const countdown = document.getElementById("countdown");
const timer = document.getElementById("timer");
const message = document.getElementById("message");
let count = 4;
let initialtimer = 1;
var starttimerInterval;
let totalkeycounting = 0;
    


resetbtn.addEventListener("click", () => {
    window.location.reload();
})

const startcountdown = () => {
    const countdownInterval = setInterval(() => {
        count--;
        countdown.innerHTML = `00:0${count}`;
        if (count < 0) {
            clearInterval(countdownInterval);
            textarea.style.pointerEvents = "all";
            textarea.focus();
            starttimer();
            countdown.innerHTML = "Let's go!";
        }
    }, 1000);
}

const starttimer = () => {
    starttimerInterval = setInterval(() => {
        timer.innerHTML = initialtimer;
        initialtimer++;
    }, 1000);
}

textarea.addEventListener("keydown",()=>{
    totalkeycounting++;

})

textarea.addEventListener('input', () => {  
    const arrayQuote = quotedisplay.querySelectorAll('span')
    const arrayValue = textarea.value.split('')

    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })

    if (correct) {
        clearInterval(starttimerInterval);
        const totaltime = timer.innerHTML;
        var finaltotaltime = (totaltime / 60);
        const spancount = quotedisplay.querySelectorAll('span').length;
        const finalspancount = (spancount / 5);
        const finalresult = Math.ceil(finalspancount / finaltotaltime);
        showspeedspan.innerHTML = finalresult;
        const keycount = totalkeycounting;
        const keydifference = keycount - spancount;
        const finalaccuracy = (100.00 - ((keydifference/spancount)*100));
        showaccuracyspan.innerHTML = finalaccuracy.toFixed(2);
        if (finalresult <= 40) {
            message.innerHTML = "Your Level is Average.";
        } else if (finalresult > 40 && finalresult <= 60) {
            message.innerHTML = "Nice! Your Level is Pro.";
        } else if (finalresult > 61 && finalresult <= 80) {
            message.innerHTML = "Great! your Level is TypeMaster.";
        } else {
            message.innerHTML = "WOW! Your Level is MegaTypist.";
        }
        if (showaccuracyspan.innerHTML < 90) {
            showaccuracyspan.style.color = 'red';
        } else if (showaccuracyspan.innerHTML>=90 && showaccuracyspan.innerHTML<= 94) {
            showaccuracyspan.style.color = " #2f1c6a";
        }else{
            showaccuracyspan.style.color = "rgb(49, 209, 49)";            
        }
        textarea.disabled = true;
        mainresultdiv.style.display = "block";
    }
})

const randomquote = () => {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}
async function displayquote() {        
    const quote = await randomquote()
    quotedisplay.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quotedisplay.appendChild(characterSpan)
    });
    textarea.value = null;
}

if(displayquote()){
    startcountdown();
}