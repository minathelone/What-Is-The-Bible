// gsap scroll trigger
gsap.registerPlugin(ScrollTrigger);

// Fetch event data from JSON
fetch('events.json')
    .then(response => response.json() )
    .then(events => {
        const timeline = document.getElementById('timeline');

        // Dynamically create event elements
        events.forEach((event, index) => {
            const eventDiv = document.createElement('div');
            eventDiv.className = `event ${ index % 2 === 0 ? 'event-top' : 'event-bottomn' }`;

            eventDiv.innerHTML = `
            <a href="${event.link}" style="color:white;">
            <img src="${event.image}" alt="${event.title}">
            </a>
            <div class="event-content">
              <h3 class="event-title">${event.title}</h3>
              <p class="event-date">${event.date}</p>
              <p class="event-description">${event.description}</p>
            </div>
          `;

            timeline.appendChild(eventDiv);
        });

        // Initialize GSAP after events are added
        initializeScrollTrigger();
    })
    .catch(error => console.error('Error loading events:', error));


function initializeScrollTrigger() {
const timeline = document.querySelector('.timeline');
const timelineContainer = document.querySelector('.timeline-container');

gsap.to(timeline, {
    x: () => -(timeline.scrollWidth - window.innerWidth) + "px",
    ease: "none",
    scrollTrigger: {
        trigger: timelineContainer,
        start: "top top",
        end: () => "+=" + (timeline.scrollWidth - window.innerWidth),
        scrub: true,
        pin: true,
    },
});
}

/* intro para animation */
const paragraphs = document.querySelectorAll('.fade-slide');
paragraphs.forEach((para, index) => {
  gsap.from(para, {
      opacity: 0,                    
      y: 50,                        
      duration: 1,                   
      delay: index * 2,            
      ease: "power3.out",            
      scrollTrigger: {
          trigger: "#intro",         
          start: "top 90%",           
          end: "bottom 50%",         
          toggleActions: "play none none reverse", 
          markers: false,            
      }
  });
});


// Initialize the map 
var map = L.map('map', {
  center: [38, 28],  // Center the map 
  zoom: 7,                      
  scrollWheelZoom: false        
});

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//the 7 churches and their coordinates
var locations = [
  { name: "Ephesus", lat: 37.9496, lon: 27.3635, color: "#FF6347" },   // Ephesus (Tomato Red)
  { name: "Smyrna", lat: 38.4237, lon: 27.1428, color: "#4682B4" },    // Smyrna (Steel Blue)
  { name: "Pergamum", lat: 39.1291, lon: 27.1889, color: "#32CD32" },  // Pergamum (Lime Green)
  { name: "Thyatira", lat: 38.2923, lon: 27.8354, color: "#FFD700" },   // Thyatira (Gold)
  { name: "Sardis", lat: 38.4937, lon: 28.8923, color: "#7b5cd3" },    // Sardis (Blue Violet)
  { name: "Philadelphia", lat: 39.7184, lon: 27.8384, color: "#bd5c6e" }, // Philadelphia 
  { name: "Laodicea", lat: 37.8386, lon: 29.0081, color: "#20B2AA" }
];

locations.forEach(function(location) {
  const markerColor = location.color;  // Get the color for the church

  // Create a custom icon with the selected color
  const customIcon = L.divIcon({
    className: 'custom-marker',  // Custom class name for styling
    html: `<div style="background-color:${markerColor}; width: 20px; height: 20px; border-radius: 50%;"></div>`, // Custom HTML for the marker
    iconSize: [30, 30],  // Size of the icon
  });

  // Add the marker to the map with the custom icon
  L.marker([location.lat, location.lon], { icon: customIcon })
    .bindPopup(location.name)  
    .addTo(map);
});

// map scrolling
document.addEventListener('DOMContentLoaded', function () {


  ScrollTrigger.create({
    trigger: "#map-container",  // Pin the entire section when it reaches the top of the viewport
    start: "top top",           
    end: "+=100%",              
    pin: true,                  
    scrub: true,                
    markers: false,              
  });
});


/* Animation for Flauvius image */
gsap.to("#flauvius", {
  scrollTrigger: {
    trigger: "#flauv",           
    start: "top bottom",            
    end: "bottom 90%",           
    scrub: true,                 
    markers: false,              
  },
  opacity: 1,                    
  scale: 1,                      
  duration: 2                     
});

/* flauv text animation */
gsap.to("#target", {
  scrollTrigger: {
    trigger: "#flauv",           
    start: "top 75%",           
    end: "bottom 10%",           
    scrub: true,                 
    markers: false,             
  },
  opacity: 1,                    
  transform: "translateY(0)",    
  duration: 2                     
});

/* what is the bible title animation */
document.addEventListener('DOMContentLoaded', () => {
  var textWrapper = document.querySelector('.ml10 .letters');
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  // Trigger Anime.js animation when the element is in view
  gsap.to('.ml10', {
    scrollTrigger: {
      trigger: '.ml10',
      start: 'top 80%',   
      end: 'bottom top',  
      scrub: true,       
      toggleActions: "play none none none",  
      markers: false,     
      onEnter: () => {
  
        anime.timeline({loop: false})  
          .add({
            targets: '.ml10 .letter',
            rotateY: [-90, 0],
            opacity: [0, 1],  
            duration: 1300,
            delay: (el, i) => 45 * i, 
            easing: 'easeOutExpo',
          });
      }
    }
  });
});

/*  hebrew particles using p5js */
let particles = [];
let quotes = [
    "בראשית ברא אלוהים את השמים ואת הארץ",
    "שמע ישראל יהוה אלוהינו יהוה אחד",
    "ואהבת לרעך כמוך אני יהוה"
];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('ot'); 
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(24);

    
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    clear(); 
    for (let particle of particles) {
        particle.update();
        particle.display();
    }
}

class Particle {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = random(16, 32);
        this.speedX = random(-1, 1);
        this.speedY = random(-1, 1);
        this.text = random(quotes); 
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reset position if out of bounds
        if (this.x > width || this.x < 0) this.x = random(width);
        if (this.y > height || this.y < 0) this.y = random(height);
    }

    display() {
        fill(0, 50); // Semi-transparent black
        text(this.text, this.x, this.y);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

/* Torah canon animation */
document.addEventListener("DOMContentLoaded", () => {
  const textWrapper = document.querySelector(".ml13");

 
  textWrapper.innerHTML = textWrapper.innerHTML.replace(
    /(\S(?![^<]*>))/g, // Matches characters but skips inside tags like <br>
    "<span class='letter'>$&</span>"
  );

  // Animation logic
  ScrollTrigger.create({
    trigger: "#ot",
    start: "top 30%",
    onEnter: () => {
      anime.timeline({ loop: false })
        .add({
          targets: ".ml13 .letter",
          translateY: [100, 0],
          translateZ: 0,
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 1400,
          delay: (el, i) => 300 + 30 * i,
        });
    },
  });
});


/* NT canon animation */
document.addEventListener("DOMContentLoaded", () => {
  const textWrapper = document.querySelector(".ml12");
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );
  ScrollTrigger.create({
    trigger: "#nt", 
    start: "top 30%", 
    onEnter: () => {
      anime.timeline({ loop: false }) 
        .add({
          targets: '.ml12 .letter',
          translateX: [40,0],
          translateZ: 0,
          opacity: [0,1],
          easing: "easeOutExpo",
          duration: 1200,
          delay: (el, i) => 500 + 30 * i
        })
        
    },
  });
});


/* preserve bg animation using anime.js*/
anime({
  targets: '#preserve::before',
  backgroundPosition: ['0% 0%', '100% 100%'],
  duration: 5000,
  loop: true,
  easing: 'linear'
});

/* preservation section animations- header and bullet points*/
document.addEventListener('DOMContentLoaded', () => {
  // Select the text wrapper for the animation
  var textWrapper = document.querySelector('.ml1 .letters');
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  
  gsap.to('.ml1', {
    scrollTrigger: {
      trigger: '#preserve',   
      start: 'top 80%',       
      end: 'bottom top',      
      scrub: true,             
      toggleActions: "play none none none",  
      markers: false,          
      onEnter: function() {   
        anime.timeline({loop: false})  
          .add({
            targets: '.ml1 .letter',
            scale: [0.3, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 600,
            delay: (el, i) => 70 * (i + 1)
          })
          .add({
            targets: '.ml1 .line',
            scaleX: [0, 1],
            opacity: [0.5, 1],
            easing: "easeOutExpo",
            duration: 700,
            offset: '-=875',
            delay: (el, i, l) => 80 * (l - i)
          })
      }
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
      "#preserve .fade-item", // Target the fade items
      { opacity: 0, y: 20 }, 
      {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power1.out",
          stagger: 2, 
          scrollTrigger: {
              trigger: "#preserve", 
              start: "top 75%", 
              end: "bottom 25%", 
              toggleActions: "play none none reverse", 
              markers: false, 
          },
      }
  );
});
  
/* importance carousel */
document.addEventListener('DOMContentLoaded', () => {
  const verses = document.querySelectorAll("#bible-carousel .verse");

  // GSAP timeline for the carousel that triggers on scroll
  gsap.timeline({
    scrollTrigger: {
      trigger: "#bible-carousel",  
      start: "top 80%",            
      toggleActions: "play none none none", 
      markers: false               
    },
    repeat: -1, 
  })
    .to(verses[0], {               
      opacity: 1,                  
      transform: "translateY(0)",  
      visibility: 'visible',       
      duration: 3,               
      ease: "power2.out"
    })
    .to(verses[0], {               
      opacity: 0,                  
      transform: "translateY(50px)", 
      visibility: 'hidden',        
      duration: 1,                
      ease: "power2.in",
      delay: 4                      
    })
    .to(verses[1], {              
      opacity: 1,                 
      transform: "translateY(0)",  
      visibility: 'visible',       
      duration: 1.5,              
      ease: "power2.out",
      delay: -1                   
    })
    .to(verses[1], {             
      opacity: 0,                  
      transform: "translateY(50px)", 
      visibility: 'hidden',        
      duration: 1,                 
      ease: "power2.in",
      delay: 4                     
    })
    
    .to(verses[2], {
      opacity: 1,
      transform: "translateY(0)",
      visibility: 'visible',
      duration: 1.5,
      ease: "power2.out",
      delay: -1
    })
    .to(verses[2], {
      opacity: 0,
      transform: "translateY(50px)",
      visibility: 'hidden',
      duration: 1,
      ease: "power2.in",
      delay: 3
    })
    .to(verses[3], {
      opacity: 1,
      transform: "translateY(0)",
      visibility: 'visible',
      duration: 1.5,
      ease: "power2.out",
      delay: -1
    })
    .to(verses[3], {
      opacity: 0,
      transform: "translateY(50px)",
      visibility: 'hidden',
      duration: 1,
      ease: "power2.in",
      delay: 3
    })

});



/* video  */
var video = document.getElementById("vp");

// bind the play and pause functions to specific variables
play_video = video.play.bind(video);
pause_video = video.pause.bind(video);


// evvent oriented programming
// once everything has loaded do this:
document.addEventListener("DOMContentLoaded", (event) => {

  // use scroll triggre plugin
  gsap.registerPlugin(ScrollTrigger)



  //video play
  ScrollTrigger.create({
      trigger: '.cont',
      onEnter: () => {
          play_video();
          gsap.to("#vp", { opacity: 1, duration: 1 });

      },
      onLeave: () => {
          pause_video();
          gsap.to("#vp", { opacity: 0, duration: 1 });

      },

      onEnterBack: () => {
          play_video();
          gsap.to("#vp", { opacity: 1, duration: 1 });

      },
      onLeaveBack: () => {
          pause_video();
          gsap.to("#vp", { opacity: 0, duration: 1 });

      },
      markers: false,
      start: "center 80%",
      end: "center 10%"
  });
  
});
