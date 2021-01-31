// particles
const particles = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    const particlesLength = Math.floor(window.innerWidth / 10);

    for(let i = 0; i < particlesLength; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(55, 100, 144);
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        p.checkParticles(particles.slice(index));
    });
}

class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-2, 2), random(-2, 2));
        this.size = 5;
    }

    update() {
        this.pos.add(this.vel);
        this.edges();
    }

    draw() {
        noStroke();
        fill('#ffffff'); 
        circle(this.pos.x, this.pos.y, this.size);
    }

    edges() {
        if(this.pos.x < 0 || this.pos.x > width) {
            this.vel.x *= -1;
        }

        if(this.pos.y < 0 || this.pos.y > height) {
            this.vel.y *= -1;
        }
    }

    checkParticles(particles) {
        particles.forEach(particle => {
            const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

            if(d < 120) {
                stroke('#ffffff');
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            }
        });
    }
}

// covid data API
let covidApi = 'https://covidapi.info/api/v1/country/';
let button = document.querySelector('.button');
let inputValue = document.querySelector('.inputValue');
let countryName = document.querySelector('.name');
let cases = document.querySelector('.cases');

button.addEventListener('click', function() {
    fetch(covidApi+inputValue.value).then(response => response.json()).then(data => {
        let caseAmount = data['result']['2021-01-29']['confirmed'];
        // console.log(caseAmount);
        cases.innerHTML = caseAmount;
    })
    .catch(error => alert("Please search by using ISO 3166 countrycodes."));
});