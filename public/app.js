let jokes = [];
const jokeText = document.getElementById('joke-text');
const newJokeBtn = document.getElementById('new-joke');
const copyJokeBtn = document.getElementById('copy-joke');
const jokeCard = document.getElementById('joke-card');

async function init() {
    try {
        const response = await fetch('data/jokes.json');
        jokes = await response.json();
        showRandomJoke();
    } catch (error) {
        console.error('Failed to load jokes:', error);
        jokeText.innerText = 'Błąd podczas ładowania żartów. Spróbuj odświeżyć stronę.';
    }
}

function showRandomJoke() {
    if (jokes.length === 0) return;

    // Add fade out effect
    jokeText.style.opacity = '0';

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * jokes.length);
        jokeText.innerText = jokes[randomIndex];

        // Add fade in effect
        jokeText.style.opacity = '1';
        jokeText.style.transition = 'opacity 0.3s ease';
    }, 200);
}

function copyToClipboard() {
    const text = jokeText.innerText;
    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyJokeBtn.innerHTML;
        copyJokeBtn.innerHTML = '<span>Skopiowano!</span>';
        setTimeout(() => {
            copyJokeBtn.innerHTML = originalText;
        }, 2000);
    });
}

newJokeBtn.addEventListener('click', showRandomJoke);
copyJokeBtn.addEventListener('click', copyToClipboard);

init();
