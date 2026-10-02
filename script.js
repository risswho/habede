// Inisialisasi Latar Belakang Balon & Hati Melayang
document.addEventListener("DOMContentLoaded", () => {
    const floatingBg = document.getElementById("floatingBg");
    const icons = ["🎈", "💖", "🌸", "✨", "🎉", "🍰"];

    // Buat elemen mengambang secara periodik
    setInterval(() => {
        const span = document.createElement("span");
        span.classList.add("float-element");
        span.innerText = icons[Math.floor(Math.random() * icons.length)];
        span.style.left = Math.random() * 100 + "vw";
        span.style.animationDuration = (Math.random() * 5 + 5) + "s"; // 5 - 10 detik
        span.style.fontSize = (Math.random() * 15 + 18) + "px";
        floatingBg.appendChild(span);

        // Hapus elemen setelah animasi selesai
        setTimeout(() => {
            span.remove();
        }, 10000);
    }, 600);

    // Tombol Mulai Perayaan
    const startBtn = document.getElementById("startBtn");
    const heroSection = document.getElementById("hero");
    const mainContent = document.getElementById("mainContent");

    startBtn.addEventListener("click", () => {
        heroSection.style.opacity = "0";
        heroSection.style.transition = "opacity 0.6s ease";
        setTimeout(() => {
            heroSection.classList.add("hidden");
            mainContent.classList.remove("hidden");
            window.scrollTo({ top: 0, behavior: "smooth" });
            triggerConfetti();
        }, 600);
    });

    // Interaksi Kotak Kado
    const giftBox = document.getElementById("giftBox");
    const greetingCard = document.getElementById("greetingCard");
    const giftMusic = document.getElementById("giftMusic");
    let isOpened = false;

    giftBox.addEventListener("click", () => {
        if (!isOpened) {
            isOpened = true;
            triggerHeartBurst(giftBox);
            giftBox.style.transform = "scale(0.9)";
            giftMusic.play().catch(err => console.log("Audio play failed:", err));
            setTimeout(() => {
                giftBox.classList.add("hidden");
                greetingCard.classList.remove("hidden");
                triggerConfetti();
            }, 500);
        }
    });

    // Interaksi Tiup Lilin
    const blowBtn = document.getElementById("blowBtn");
    const flame = document.getElementById("flame");
    const wishMessage = document.getElementById("wishMessage");
    let isBlown = false;

    blowBtn.addEventListener("click", () => {
        if (!isBlown) {
            isBlown = true;
            flame.classList.add("extinguished");
            wishMessage.classList.remove("hidden");
            blowBtn.innerText = "Lilin Padam ✨";
            blowBtn.disabled = true;
            blowBtn.style.opacity = "0.6";
            triggerConfetti();
        }
    });

    // Interaksi Dinding Harapan
    const addWishBtn = document.getElementById("addWishBtn");
    const wishInput = document.getElementById("wishInput");
    const wishesContainer = document.getElementById("wishesContainer");

    addWishBtn.addEventListener("click", () => {
        const wishText = wishInput.value.trim();
        if (wishText !== "") {
            const bubble = document.createElement("div");
            bubble.classList.add("wish-bubble");
            bubble.innerText = wishText + " 🌸";
            wishesContainer.prepend(bubble);
            wishInput.value = "";
        }
    });

    wishInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addWishBtn.click();
        }
    });
});

// Efek Konfeti Sederhana dengan Canvas
function triggerConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const colors = ["#ff8fab", "#ffb7b2", "#ffdac1", "#c77dff", "#a0c4ff", "#ffd166"];

    for (let i = 0; i < 120; i++) {
        particles.push({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.7) * 12,
            gravity: 0.25,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
        });
    }

    function updateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.rotation += p.rotationSpeed;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();

            if (p.y > canvas.height) {
                particles.splice(index, 1);
            }
        });

        if (particles.length > 0) {
            requestAnimationFrame(updateConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    updateConfetti();
}

// Fungsi Efek Ledakan Emoji Love Berbentuk Hati Memenuhi Layar
function triggerHeartBurst(targetElement) {
    const container = document.createElement("div");
    container.classList.add("heart-burst-container");
    document.body.appendChild(container);

    const heartEmojis = ["❤️"];
    const particleCount = 20;

    // Skala berdasarkan ukuran layar agar memenuhi layar penuh
    const screenMin = Math.min(window.innerWidth, window.innerHeight);
    const scaleFactor = screenMin * 0.42;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("span");
        particle.classList.add("heart-particle");
        particle.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

        // Persamaan parametrik kurva hati (heart shape)
        const angle = (i / particleCount) * 2 * Math.PI;
        const t = angle;
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        
        const dx = hx * (scaleFactor / 16) + (Math.random() - 0.5) * 30;
        const dy = hy * (scaleFactor / 16) + (Math.random() - 0.5) * 30;

        particle.style.setProperty("--dx", `${dx}px`);
        particle.style.setProperty("--dy", `${dy}px`);
        particle.style.fontSize = (Math.random() * 20 + 40) + "px";

        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1500);
    }

    setTimeout(() => {
        container.remove();
    }, 1800);
}
