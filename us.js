// Contador de tempo
function updateRelationshipTimer() {
    try {
        const startDate = new Date("2023-09-22T00:00:00-03:00");
        if (typeof console !== "undefined" && console.log) {
            console.log("Data de início: " + startDate.toISOString());
        }
        const now = new Date();
        if (typeof console !== "undefined" && console.log) {
            console.log("Data atual: " + now.toISOString());
        }
        const diff = now.getTime() - startDate.getTime();
        if (typeof console !== "undefined" && console.log) {
            console.log("Diferença em milissegundos: " + diff);
        }
        if (diff < 0) {
            if (typeof console !== "undefined" && console.error) {
                console.error("Erro: A data atual é anterior à data de início.");
            }
            document.getElementById("years").textContent = "0";
            document.getElementById("months").textContent = "0";
            document.getElementById("days").textContent = "0";
            document.getElementById("hours").textContent = "0";
            document.getElementById("minutes").textContent = "0";
            document.getElementById("seconds").textContent = "0";
            return;
        }
        const diffDate = new Date(diff);
        const years = diffDate.getUTCFullYear() - 1970;
        const months = diffDate.getUTCMonth();
        const days = diffDate.getUTCDate() - 1;
        const hours = diffDate.getUTCHours();
        const minutes = diffDate.getUTCMinutes();
        const seconds = diffDate.getUTCSeconds();
        if (typeof console !== "undefined" && console.log) {
            console.log("Anos: " + years + ", Meses: " + months + ", Dias: " + days + ", Horas: " + hours + ", Minutos: " + minutes + ", Segundos: " + seconds);
        }
        const yearsElement = document.getElementById("years");
        const monthsElement = document.getElementById("months");
        const daysElement = document.getElementById("days");
        const hoursElement = document.getElementById("hours");
        const minutesElement = document.getElementById("minutes");
        const secondsElement = document.getElementById("seconds");
        if (yearsElement && monthsElement && daysElement && hoursElement && minutesElement && secondsElement) {
            yearsElement.textContent = years;
            monthsElement.textContent = months;
            daysElement.textContent = days;
            hoursElement.textContent = hours;
            minutesElement.textContent = minutes;
            secondsElement.textContent = seconds;
        } else {
            if (typeof console !== "undefined" && console.error) {
                console.error("Erro: Um ou mais elementos do contador não foram encontrados.");
            }
        }
    } catch (error) {
        if (typeof console !== "undefined" && console.error) {
            console.error("Erro ao atualizar o contador:", error);
        }
    }
}

setInterval(updateRelationshipTimer, 1000);
updateRelationshipTimer();

// Detalhes de fundo (partículas ondulantes)
const backgroundDetailsCanvas = document.getElementById("background-details-canvas");
let backgroundDetailsCtx = null;

if (backgroundDetailsCanvas) {
    if (typeof console !== "undefined" && console.log) {
        console.log("Canvas de detalhes de fundo encontrado!");
    }
    backgroundDetailsCtx = backgroundDetailsCanvas.getContext("2d");
    if (!backgroundDetailsCtx) {
        if (typeof console !== "undefined" && console.error) {
            console.error("Erro: Não foi possível obter o contexto 2D do canvas de detalhes de fundo.");
        }
    } else {
        backgroundDetailsCanvas.width = window.innerWidth;
        backgroundDetailsCanvas.height = window.innerHeight;
        window.addEventListener("resize", () => {
            backgroundDetailsCanvas.width = window.innerWidth;
            backgroundDetailsCanvas.height = window.innerHeight;
        });
        class WaveParticle {
            constructor() {
                this.x = Math.random() * backgroundDetailsCanvas.width;
                this.y = Math.random() * backgroundDetailsCanvas.height;
                this.size = Math.random() * 5 + 3;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.opacity = Math.random() * 0.5 + 0.3;
                this.opacitySpeed = Math.random() * 0.02 + 0.01;
                this.angle = 0;
                this.colors = ['#001F3F', '#228B22', '#00CED1', '#4B0082'];
                this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity += Math.sin(this.angle) * this.opacitySpeed;
                this.angle += 0.05;
                if (this.opacity < 0.3) this.opacity = 0.3;
                if (this.opacity > 0.8) this.opacity = 0.8;
                if (this.x < 0 || this.x > backgroundDetailsCanvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > backgroundDetailsCanvas.height) this.speedY *= -1;
            }
            draw() {
                if (backgroundDetailsCtx) {
                    
                    backgroundDetailsCtx.beginPath();
                    backgroundDetailsCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    backgroundDetailsCtx.fill();
                }
            }
        }
        const waveParticles = [];
        const numWaveParticles = 30;
        for (let i = 0; i < numWaveParticles; i++) {
            waveParticles.push(new WaveParticle());
        }
        function animateBackgroundDetails() {
            if (backgroundDetailsCtx) {
                backgroundDetailsCtx.clearRect(0, 0, backgroundDetailsCanvas.width, backgroundDetailsCanvas.height);
                waveParticles.forEach((particle) => {
                    particle.update();
                    particle.draw();
                });
                if (typeof console !== "undefined" && console.log) {
                    console.log("Desenhando detalhes de fundo...");
                }
            }
        }
        function animate() {
            try {
                if (backgroundDetailsCtx) {
                    animateBackgroundDetails();
                }
                requestAnimationFrame(animate);
            } catch (error) {
                if (typeof console !== "undefined" && console.error) {
                    console.error("Erro no loop de animação:", error);
                }
            }
        }
        requestAnimationFrame(animate);
    }
}