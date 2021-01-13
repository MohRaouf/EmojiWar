const circle = 2 * Math.PI;
const canvas = document.getElementById("canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
const particles = [];
const friction = 0.97;
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        //[7]explosion
        this.alpha = 1;
    } //draw player:
    draw() {
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, circle);
        c.fillStyle = this.color;
        c.fill();
    }
    update() {
        console.log(this.x)
        this.draw();//call it
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        this.alpha -= 0.01;
    }
}
let animationId;
//loop
window.addEventListener('click', (event) => {
    function animate() {
        animationId = requestAnimationFrame(animate);
        //c.fillStyle = 'rgba(0,0,0,.3)'
        //c.fillRect(0, 0, canvas.width, canvas.height);
        c.clearRect(0, 0, canvas.width, canvas.height);
        //[7]explosion 
        particles.forEach((particle, index) => {
            //[7]particles fadeout
            if (particle.alpha <= 0) {

                particles.splice(index, 1)
            } else {
                particle.update();
            }
        })
        //[7]explosion of enemy
        for (let i = 0; i < 3; i++) {
            var partic = new Particle(
                event.clientX,
                event.clientY,
                2,
                'red',
                {
                    x: (Math.random() - 0.5) * (Math.random() * 8),
                    y: (Math.random() - 0.5) * (Math.random() * 8)
                }
            )
            particles.push(partic);
            console.log(partic)
        }
    }
    animate();
})
