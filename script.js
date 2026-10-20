const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const target = Number(counter.dataset.target);

    let current = 0;

    const increment = Math.max(1, Math.ceil(target / 100));

    function updateCounter(){

        current += increment;

        if(current >= target){

            counter.innerText = target + "+";

        }else{

            counter.innerText = current;

            requestAnimationFrame(updateCounter);

        }

    }

    updateCounter();

});



/*=========================
      TESTIMONIAL SLIDER
==========================*/

const cards = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".dot");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0;
let interval;

function showSlide(i){

    cards.forEach(card=>card.classList.remove("active"));
    dots.forEach(dot=>dot.classList.remove("active"));

    cards[i].classList.add("active");
    dots[i].classList.add("active");

}

function nextSlide(){

    index++;

    if(index>=cards.length){

        index=0;

    }

    showSlide(index);

}

function prevSlide(){

    index--;

    if(index<0){

        index=cards.length-1;

    }

    showSlide(index);

}

function startSlider(){

    interval=setInterval(nextSlide,5000);

}

function stopSlider(){

    clearInterval(interval);

}

next.addEventListener("click",()=>{

    nextSlide();

    stopSlider();

    startSlider();

});

prev.addEventListener("click",()=>{

    prevSlide();

    stopSlider();

    startSlider();

});

dots.forEach((dot,i)=>{

    dot.addEventListener("click",()=>{

        index=i;

        showSlide(index);

        stopSlider();

        startSlider();

    });

});

const slider=document.querySelector(".testimonial-slider");

slider.addEventListener("mouseenter",stopSlider);
slider.addEventListener("mouseleave",startSlider);

showSlide(index);

startSlider();

/*==========================
      BACK TO TOP
==========================*/

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY>400){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});