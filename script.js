const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const voiceApiKey = config.VOICE_API;

// Disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: voiceApiKey,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from Joke API
async function getJokes() {
    let joke = '';
    const jokeApiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(jokeApiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-speech
        tellMe(joke);
        // Disable button
        toggleButton();
    } catch (error) {
        console.log('Joke function error', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);