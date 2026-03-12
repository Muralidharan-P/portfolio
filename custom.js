




window.addEventListener("load", () => {

const heroImage = document.querySelector(".hero-image-wrap");
const heroText = document.querySelector(".hero-text");


/* Frame 2 — portrait zoom */

setTimeout(()=>{

heroImage.classList.add("zoom-stage");

},600);


/* Frame 3 — image fills screen */

setTimeout(()=>{

heroImage.classList.add("fullscreen");

},1400);


/* AFTER image fills screen → reveal text */

setTimeout(()=>{

heroText.classList.add("active");

},2000);

});


const aboutIntro = document.querySelector(".about-intro");

window.addEventListener("scroll", () => {

const triggerPoint = window.innerHeight * 0.85;

const sectionTop = aboutIntro.getBoundingClientRect().top;

if(sectionTop < triggerPoint){

aboutIntro.classList.add("active");

}

});



/* smooth scrolling */

document.addEventListener("DOMContentLoaded", () => {

  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: false
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

});


/* ================= SMOOTH GSAP IMAGE TRAIL ================= */

const aboutSection = document.querySelector(".about-intro");
const floatingContainer = document.querySelector(".about-floating-images");

const images = [
"assets/trail1.png",
"assets/trail2.png",
"assets/trail3.png",
"assets/trail4.png",
"assets/trail5.png"
];

let lastX = 0;
let lastY = 0;

aboutSection.addEventListener("mousemove", (e) => {

const dx = e.clientX - lastX;
const dy = e.clientY - lastY;

/* only spawn image if cursor moved enough */

if(Math.sqrt(dx*dx + dy*dy) < 70) return;

lastX = e.clientX;
lastY = e.clientY;

const img = document.createElement("img");

img.src = images[Math.floor(Math.random()*images.length)];
img.className = "floating-img";

img.style.left = e.clientX + "px";
img.style.top = e.clientY + "px";

floatingContainer.appendChild(img);

const rotation = gsap.utils.random(-20,20);

/* smooth reveal */

gsap.fromTo(img,
{
scale:0.5,
opacity:0,
rotate:0
},
{
scale:1,
opacity:1,
rotate:rotation,
duration:0.6,
ease:"power3.out"
});

/* smooth exit */

gsap.to(img,{
opacity:0,
scale:0.7,
duration:0.8,
delay:0.6,
ease:"power2.out",
onComplete:()=> img.remove()
});

});


/* ================= HERO PARALLAX ================= */

const heroImage = document.querySelector(".hero-lottie");

window.addEventListener("scroll", () => {

const scrollY = window.scrollY;

/* move image slower than scroll */

heroImage.style.transform = `translateY(${scrollY * 0.25}px)`;

});

/* ================= CUSTOM CURSOR ================= */

const cursor = document.querySelector(".custom-cursor");

/* follow mouse */

document.addEventListener("mousemove",(e)=>{

cursor.style.left = e.clientX + "px";
cursor.style.top = e.clientY + "px";

});


/* hover links */

const links = document.querySelectorAll("a, button");

links.forEach(link => {

link.addEventListener("mouseenter",()=>{
cursor.classList.add("hover");
});

link.addEventListener("mouseleave",()=>{
cursor.classList.remove("hover");
});

});


gsap.registerPlugin(ScrollTrigger);


/* TITLE SCALE */

gsap.to(".works-title",{
scale:0.45,
scrollTrigger:{
trigger:".works-showcase",
start:"top center",
end:"bottom top",
scrub:true
}
});


/* PARALLAX SPEEDS */

// gsap.registerPlugin(ScrollTrigger);

// const workimages = document.querySelectorAll(".work-img");

// workimages.forEach((img, i) => {

// gsap.to(img,{
// y: -150 - (i * 20),

// scrollTrigger:{
// trigger:".works-showcase",
// start:"top bottom",
// end:"bottom top",
// scrub:true
// }

// });

// });


/* CURSOR OPPOSITE MOVEMENT */

// const gallery = document.querySelector(".works-showcase");

// gallery.addEventListener("mousemove",(e)=>{

// const x = (window.innerWidth/2 - e.clientX) / 40;
// const y = (window.innerHeight/2 - e.clientY) / 40;

// document.querySelectorAll(".work-img").forEach(img=>{

// gsap.to(img,{
// x:x,
// y:y,
// duration:1,
// ease:"power2.out"
// });

// });

// });

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".work-item").forEach((item,i)=>{

const img = item.querySelector("img");

gsap.to(img,{
y:80,

scrollTrigger:{
trigger:item,
start:"top bottom",
end:"bottom top",
scrub:true
}

});

});