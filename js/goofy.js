// Play Nyan Cat Music
document.getElementById('play-audio').addEventListener('click', () => {
    const audio = document.getElementById('nyan-audio');
    audio.volume = 1.0; // Ensure full volume
    audio.play();
});

// Emoji Rain
const emojis = ['🖕', '🌈', '🖕', '🖕', '🖕', '🖕'];
const emojiCount = 2;

function createEmojiRain() {
    for (let i = 0; i < emojiCount; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = `${Math.random() * 100}vw`;
        emoji.style.animationDuration = `${2 + Math.random() * 3}s`;
        emoji.style.animationDelay = `${Math.random() * 2}s`;
        document.body.appendChild(emoji);

        // Remove emoji after animation
        setTimeout(() => emoji.remove(), 5000);
    }
}

setInterval(createEmojiRain, 1000);

// Mouse Trail
document.addEventListener('mousemove', (event) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.left = `${event.pageX}px`;
    dot.style.top = `${event.pageY}px`;
    document.body.appendChild(dot);

    setTimeout(() => dot.remove(), 500);
});

// Random Fonts
const fonts = [
    'Comic Neue, cursive',
    'Press Start 2P, cursive',
    'Gloria Hallelujah, cursive',
    'Permanent Marker, cursive'
];

function changeHeadingFont() {
    const headings = document.querySelectorAll('h1, h2');
    headings.forEach(heading => {
        heading.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
    });
}

setInterval(changeHeadingFont, 3000);

// Funny Sounds
const sounds = [
    'sounds/meow.mp3',
    'sounds/boing.mp3',
    'sounds/laugh.mp3'
];

document.querySelectorAll('.sensor').forEach(section => {
    section.addEventListener('click', () => {
        const sound = new Audio(sounds[Math.floor(Math.random() * sounds.length)]);
        sound.play();
    });
});

// Dancing GIFs
const dancerGifs = [
    'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
    'https://media.giphy.com/media/12NUbkX6p4xOO4/giphy.gif',
    'https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif'
];

function spawnDancer() {
    const dancer = document.createElement('img');
    dancer.className = 'dancer';
    dancer.src = dancerGifs[Math.floor(Math.random() * dancerGifs.length)];
    dancer.style.left = `${Math.random() * 100}vw`;
    dancer.style.top = `${Math.random() * 100}vh`;
    document.body.appendChild(dancer);

    setTimeout(() => dancer.remove(), 3000);
}

setInterval(spawnDancer, 2000);

// Confetti
function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

document.querySelectorAll('button, .sensor').forEach(element => {
    element.addEventListener('click', launchConfetti);
});

// Funny Messages
const funnyMessages = [
    "Hey! Why'd you click that?!",
    "Oops, you woke up the Nyan Cat!",
    "This button does nothing. Or does it?",
    "Congratulations! You just won... nothing.",
    "Are you having fun yet? 😄"
];

document.querySelectorAll('.sensor').forEach(section => {
    section.addEventListener('click', () => {
        alert(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
    });
});

// Random Background Color
function changeBackgroundColor() {
    const randomColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
    document.body.style.backgroundColor = randomColor;
}

setInterval(changeBackgroundColor, 2000);

// Random Facts
const facts = [
    "Bananas are berries, but strawberries aren't.",
    "Cats sleep for 70% of their lives.",
    "Octopuses have three hearts.",
    "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs!"
];

function showRandomFact() {
    const fact = facts[Math.floor(Math.random() * facts.length)];
    alert(`Did you know? ${fact}`);
}

document.querySelectorAll('.sensor').forEach(section => {
    section.addEventListener('click', showRandomFact);
});

// Flying Objects
const flyingGifs = [
    'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
    'https://media.giphy.com/media/12NUbkX6p4xOO4/giphy.gif',
    'https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif'
];

function spawnFlyingObject() {
    const gif = document.createElement('img');
    gif.src = flyingGifs[Math.floor(Math.random() * flyingGifs.length)];
    gif.style.position = 'absolute';
    gif.style.left = `${Math.random() * 100}vw`;
    gif.style.top = `${Math.random() * 100}vh`;
    gif.style.width = '100px';
    gif.style.zIndex = '1000';
    document.body.appendChild(gif);

    setTimeout(() => gif.remove(), 5000);
}

setInterval(spawnFlyingObject, 2000);

// Konami Code Easter Egg
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A
let konamiIndex = 0;

document.addEventListener('keydown', (event) => {
    if (event.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            alert('🎉 You unlocked the secret! 🎉');
            launchConfetti(); // Trigger confetti
            konamiIndex = 0; // Reset
        }
    } else {
        konamiIndex = 0; // Reset if wrong key is pressed
    }
});
