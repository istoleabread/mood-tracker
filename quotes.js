const QUOTES = {
    1: ['Managing your mood can help you manage your life, your finances and your town hall 11.', 'Mood Tracker Sponsor'],
    2: ['What is life? Life is nothing more than a perception of reality, you never know what\'ll happen yesterday. Steal bread.', 'Me'],
    3: ['Do you think cats would listen to us lowly human beings? They are the supreme gods!', 'Advik'],
    4: ['Sometimes in life, you should bungee jump without a rope.', 'JS Dev'],
    5: ['Throughout heaven and earth, I alone am the honored one.', 'Gojo Satoru'],
    6: ['Have you seen an orange cat with little black spot on the head? Please find him, he went missing. Thanks.', 'Anonymous #1'],
    7: ['Why do we even exist? Just to suffer, to go through everyday\'s pain? No, we exist to hail and serve our one and only god, cats.', 'Cat Enthusiast #2'],
    8: ['Don\'t know what to do with the additional empty space in your UI? Just put some fancy stuff like weather or graph, people will love it.', 'Anonymous #2'],
    9: ['Not a pinch of life is cinch', 'Madusudan'],
}

let previousIdx;
function newQuote() {
    let idx = Math.floor(Math.random() * Object.keys(QUOTES).length) + 1;
    if (previousIdx) {
        while (idx == previousIdx) {
            idx = Math.floor(Math.random() * Object.keys(QUOTES).length) + 1;
        }
    }
    previousIdx = idx;
    console.log(idx);
    getClass("quote").textContent = '"' + QUOTES[idx][0] + '"';
    getClass("author").textContent = "- " + QUOTES[idx][1]
}

newQuote();

getClass("refresh").addEventListener("click", newQuote);