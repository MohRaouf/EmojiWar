const circle = 2 * Math.PI;
const canvas = document.getElementById("canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const X_PLAYER = canvas.width / 2;
const Y_PLAYER = canvas.height / 2;
/* [1]CREATE PLAYER */////////////////////////////////////////
const c = canvas.getContext('2d');
//CLASS PLAYER: 
class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    } //draw player:
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, circle);
        c.fillStyle = this.color;
        c.fill();
    }
}
const player = new Player(X_PLAYER, Y_PLAYER, 15, '#fff')
/////////////////////////////////////////////////////////////////////////////////
/* [2]shoting projectile: as is like player but has diff attribute which is velocity becaouse its move*/
class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    } //draw player:
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, circle);
        c.fillStyle = this.color;
        c.fill();
    }
    update() {
        this.draw();//call it again
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}
/* [3]Enemy class */
class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    } //draw player:
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, circle);
        c.fillStyle = this.color;
        c.fill();
    }
    update() {
        this.draw();//call it again
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}
//[7]explosion starts from here: 
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
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, circle);
        c.fillStyle = this.color;
        c.fill();
        c.restore();
    }
    update() {
        this.draw();//call it again
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        this.alpha -= 0.01;
    }
}
let animationId;
//loop
function animate() {
    //tells the browser to perform an animation and requests 
    //that the browser calls a specified function to update 
    //an animation before the next repaint.
    //need allback => like recursion.
    //then we need to go to projectile class to perform update method
    animationId = requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0,0,0,.3)'
    c.fillRect(0, 0, canvas.width, canvas.height);
    //needed to add player again
    player.draw();
    //projectile.draw();
    //projectile.update();
    //[7]explosion 
    particles.forEach((particle, index) => {
        //[7]particles fadeout
        if (particle.alpha <= 0) {
            particles.splice(index, 1)
        } else {
            particle.update();
        }

    })
    projectiles.forEach((projectile, projectileIndex) => {
        projectile.update();
        //[7]removing projectile from array 
        if (projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > canvas.width
            || projectile.y + projectile.radius < 0 || projectile.y - projectile.radius > canvas.height
        ) {
            setTimeout(() => {
                projectiles.splice(projectileIndex, 1)
            }, 0)
        }
    })

    enemies.forEach((enemy, enemyIndex) => {
        enemy.update();
        //[5]DETECT COLLISISION BETWEEN ENEMY AND player||END GAME
        const dist_player_enemy = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if (dist_player_enemy - player.radius - enemy.radius < 1) {
            cancelAnimationFrame(animationId);
        }
        //[4]DETECT COLLISISION BETWEEN ENEMY AND PROJECTILE
        //distance between enemy and projectile
        projectiles.forEach((projectile, projectileIndex) => {
            const dist_proj_enemy = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
            //when projectile touches enemy
            //[7]explosion of enemy
            if (dist_proj_enemy - projectile.radius - enemy.radius < 1) {
                for (let i = 0; i < enemy.radius; i++) {
                    particles.push(new Particle(
                        projectile.x,
                        projectile.y,
                        Math.random() * 2,
                        enemy.color,
                        {
                            x: (Math.random() - 0.5) * (Math.random() * 8),
                            y: (Math.random() - 0.5) * (Math.random() * 8)
                        }))
                }
                //[6]shrink enemy 
                if (enemy.radius - 10 > 5) {
                    gsap.to(enemy, { radius: enemy.radius - 10 })
                    setTimeout(() => {
                        projectiles.splice(projectileIndex, 1)
                    }, 0)
                } else {
                    setTimeout(() => {
                        enemies.splice(enemyIndex, 1)
                        projectiles.splice(projectileIndex, 1)
                    }, 0)
                }
            }
        })
    })
}
const enemies = [];
let x;
let y;
function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random() * (30 - 4) + 4;
        if (Math.random() < 0.5) {
            x = Math.random() > 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() > 0.5 ? 0 - radius : canvas.height + radius;
        }
        //ENEMY COLR RANDOM
        const color = `hsl(${Math.random() * 360},50%,50%)`;
        const angel = Math.atan2(Y_PLAYER - y, X_PLAYER - x)
        const velocity = { x: Math.cos(angel), y: Math.sin(angel) };

        enemies.push(new Enemy(x, y, radius, color, velocity))
    }, 1000)
}
const projectiles = [];
window.addEventListener('click', (event) => {
    //FINDING THE ANGEL TO CALC VELOCITY
    //atan2(Y/X) that's how it works.
    //we will use sin and cos to determine the velocity 
    const angel = Math.atan2(event.clientY - Y_PLAYER, event.clientX - X_PLAYER)
    const velocity = { x: Math.cos(angel) * 4, y: Math.sin(angel) * 4 };
    //make it dynamically created in the array
    projectiles.push(new Projectile(X_PLAYER, Y_PLAYER, 5, 'white', velocity))
})
/* Velocity here is how the projectile mover from center to the mouse click 
we have anothr events here 
    1. get the angle.
    2. put in atan2.
    3. get x and y velocities.
 */
animate();
spawnEnemies()