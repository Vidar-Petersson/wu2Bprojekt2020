//Meny-funktion för att öppna nav på mobil
function menu() {
    let menu = document.querySelector(".menu");
    menu.classList.toggle("show");
}
document.querySelector(".toggler").addEventListener("click", menu)

// Kontrollerar opacity på headern beroende på scroll
$(document).ready(function(){ 
    $(window).scroll(function(){ 
        $('.header-bg').css("opacity", 0 + $(window).scrollTop() / 300) 
    }) 
}) 

// Set the date we're counting down to
var countDownDate = new Date();
countDownDate.setDate(countDownDate.getDate() + (3 + 7 - countDownDate.getDay()) % 7);
countDownDate.setHours(15, 00, 00);
// Update the count down every 1 second
var x = setInterval(function() {
  // Get today's date and time
  var now = new Date().getTime();
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  // Output the result in an element with id="demo"
  document.getElementById("time-to-meeting").innerHTML = days + "dagar " + hours + "timmar "
  + minutes + "m " + seconds + "s kvar";

  // If the count down is over, write some text 
  if (distance <= 0) {
    clearInterval(x);
    document.getElementById("time-to-meeting").innerHTML = "Mötesdags!";
  }
}, 1000);

//ES6 Class
class TypeWriter {
    constructor(txtElement, words, wait = 2500) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        //Current index of word
        const current = this.wordIndex % this.words.length;
        //Get full text of current word
        const fullTxt = this.words[current];

        //Check if deleting
        if (this.isDeleting) {
            //Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            //Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        //Insert txt intp element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

        //Initial type speed
        let typeSpeed = 200;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        //If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            //Make pause at end
            typeSpeed = this.wait;
            //Set delete to true
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            //Move to next word
            this.wordIndex++;
            //Pause before start typing
            typeSpeed = 400;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

//Init on DOM load
document.addEventListener("DOMContentLoaded", init);

//Init app
function init() {
    const txtElement = document.querySelector(".txt-type");
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");
    //Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}