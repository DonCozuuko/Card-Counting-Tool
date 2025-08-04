class Deck {
    constructor() {
        this.cardList = ['cardClubs2.png', 'cardClubs3.png', 'cardClubs4.png', 'cardClubs5.png', 'cardClubs6.png', 'cardClubs7.png', 'cardClubs8.png', 'cardClubs9.png', 'cardClubs10.png', 'cardClubsJ.png', 'cardClubsQ.png', 'cardClubsK.png', 'cardClubsA.png', 'cardHearts2.png', 'cardHearts3.png', 'cardHearts4.png', 'cardHearts5.png', 'cardHearts6.png', 'cardHearts7.png', 'cardHearts8.png', 'cardHearts9.png', 'cardHearts10.png', 'cardHeartsJ.png', 'cardHeartsQ.png', 'cardHeartsK.png', 'cardHeartsA.png', 'cardDiamonds2.png', 'cardDiamonds3.png', 'cardDiamonds4.png', 'cardDiamonds5.png', 'cardDiamonds6.png', 'cardDiamonds7.png', 'cardDiamonds8.png', 'cardDiamonds9.png', 'cardDiamonds10.png', 'cardDiamondsJ.png', 'cardDiamondsQ.png', 'cardDiamondsK.png', 'cardDiamondsA.png', 'cardSpades2.png', 'cardSpades3.png', 'cardSpades4.png', 'cardSpades5.png', 'cardSpades6.png', 'cardSpades7.png', 'cardSpades8.png', 'cardSpades9.png', 'cardSpades10.png', 'cardSpadesJ.png', 'cardSpadesQ.png', 'cardSpadesK.png', 'cardSpadesA.png'];
        this.cardListLen = this.cardList.length;
    }

    shuffleDeck() {
        for (let i = this.cardListLen - 1; i > 0; i--) {
            // random index from 0 to i
            const j = Math.floor(Math.random() * i)
            const card1 = this.cardList[i];
            const card2 = this.cardList[j];
            this.cardList[j] = card1;
            this.cardList[i] = card2;
        }
        console.log("Finished Shufflin");
    }

    drawNewCard(drawnCardIndex) {
        // returns the file path for a new card in the shuffled deck 
        // (e.g. "./card_assets/back_of_card.png")
        const card_name = this.cardList[drawnCardIndex]
        const cardFilePath = "/card_assets/";
        const full_file_path = cardFilePath + card_name;
        return full_file_path
    }
}

const Element = {
    // HTMLtag_name
    img_card: document.getElementById("card_img"),
    form_count: document.getElementById("count_form"),
    input_count: document.getElementById("count_input"),
    p_deck_counter: document.getElementById("deck_counter"),
    p_timer: document.getElementById("timer"),
    p_incr_num_decks: document.getElementById("incr_num_decks"),
    p_decr_num_decks: document.getElementById("decr_num_decks"),
    p_start_msg: document.getElementById("start_msg"),
    p_play_again_msg: document.getElementById("play_again_msg"),
    p_card_index: document.getElementById("card_index"),
    p_players_true_count_header: document.getElementById("players_true_count_header"),
    p_players_true_count_counter: document.getElementById("players_true_count_counter"),
    p_actual_true_count_header: document.getElementById("actual_true_count_header"),
    p_actual_true_count_counter: document.getElementById("actual_true_count_counter"),
    p_card_rank: document.getElementById("card_rank"),
    canvas_end_screen_stats_chart: document.getElementById("end_screen_stats_chart"),
    p_average_time_per_card_header: document.getElementById("average_time_per_card_header"),
    p_average_time_per_card_counter: document.getElementById("average_time_per_card_counter"),
    btn_blurb: document.getElementById("blurb_btn"),
    btn_stats_graph: document.getElementById("stats_graph_btn"),
    div_scoreboard_container: document.getElementById("scoreboard_container"),
    table_scoreboard: document.getElementById("scoreboard"),
    table_header: document.getElementById("scoreboard_header"),
    btn_clear_scores: document.getElementById("clear_scores"),
    p_yes: document.getElementById("yes"),
    btn_hide_actual_true_count: document.getElementById("hide_actual_true_count"),
}

const Flag = {
    initGame: false,
    endGame: false,
    initTimer: false,
    timerIntverval: 0,
    actualTrueCountHidden: false,
}

const Counter = {
    numberOfDecks: 1,
    currDeckNum: 1,
    drawnCardIndex: 0,
    actualCount: 0,
    playersCount: 0,
    prevEnd: 0,
    currentTime: 0,
    startGameTimeMs: 0,
    startTimeCapture: 0,
    endTimeCapture: 0,
    xValues: [],
    yValues: [],
}

const Scoreboard = {
    // deckSize: time
    topTen: new Map(),
}

const cardDeck = new Deck();

function reload() {
    Element.form_count.reset();
    cardDeck.shuffleDeck();
    cardDeck.shuffleDeck();
    cardDeck.shuffleDeck();
    cardDeck.shuffleDeck();
    document.addEventListener("keydown", startGame);
    console.log("Finished Reloadin Baby")
}

function incrNumDecks() {
    Counter.numberOfDecks++;
    Element.p_deck_counter.innerHTML = Counter.numberOfDecks;
}

function decrNumDecks() {
    if (Counter.numberOfDecks > 1) {
        Counter.numberOfDecks--;
        Element.p_deck_counter.innerHTML = Counter.numberOfDecks;
    }
}

function hideActualTrueCount() {
    if (!Flag.actualTrueCountHidden) {
        Element.p_actual_true_count_header.style.visibility = "hidden";
        Element.p_actual_true_count_counter.style.visibility = "hidden";
        Element.btn_hide_actual_true_count.innerHTML = "Show";
        Flag.actualTrueCountHidden = true;
    }
    else {
        Element.p_actual_true_count_header.style.visibility = "visible";
        Element.p_actual_true_count_counter.style.visibility = "visible";
        Element.btn_hide_actual_true_count.innerHTML = "Hide";
        Flag.actualTrueCountHidden = false;
    }
}

function clearScores() {
    localStorage.clear()
    Element.p_yes.style.display = "block";
}

function updateTimer(startGameTimeMs) {
    const end = Date.now();
    if (end != Counter.prevEnd) {
        Counter.currentTime = end - startGameTimeMs;
        Element.p_timer.innerHTML = formatTime(Counter.currentTime);
        Counter.prevEnd = end;
    }
}

function formatTime(ms) {
    // min/sec/ms
    const formattedMili = ms % 1000;
    const secs = Math.floor(ms / 1000);  // total secs (integers)
    const formattedSecs = secs % 60;
    const min = Math.floor(secs / 60);   // total minutes (integers)
    const formattedMin = min % 60;
    return String(formattedMin).padStart(2, '0') + ":" + String(formattedSecs).padStart(2, '0')  + ":" + String(formattedMili).padStart(3, '0');
}


function startGame(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        startDealing(cardDeck);
        
        // Timer Logic
        if (!Flag.initTimer) {
            Flag.timerIntverval = setInterval(updateTimer, 1, Counter.startGameTimeMs);
            Flag.initTimer = true;
        }
        else if (Flag.endGame) {
            clearInterval(Flag.timerIntverval);
            Scoreboard.topTen.set(formatTime(Counter.currentTime), Counter.numberOfDecks);
            endScreen();
        }
    }
}

function startDealing(cardDeck) {
    if (!Flag.initGame) {
        Element.p_incr_num_decks.style.visibility = "hidden";
        Element.p_decr_num_decks.style.visibility = "hidden";
        Element.p_start_msg.innerHTML = "";

        Counter.startGameTimeMs = Date.now();
        Flag.initGame = true;
        // Counter.drawnCardIndex = ;

        Counter.endTimeCapture = Date.now();
    }

    Element.p_card_index.innerHTML = `Card Index: ${Counter.drawnCardIndex}`
    // to avoid the get request error
    if (Counter.drawnCardIndex !== cardDeck.cardListLen) {
        Element.img_card.src = cardDeck.drawNewCard(Counter.drawnCardIndex);
        Element.p_card_rank.innerHTML = `Card Rank: ${getCurrCardRank()}`;
    }

    // Avg Time logic
    Counter.startTimeCapture = Date.now();
    if (Counter.startTimeCapture != Counter.endTimeCapture) {
        Counter.yValues.push(Counter.startTimeCapture - Counter.endTimeCapture);
        Counter.xValues.push(Counter.drawnCardIndex);
        Counter.endTimeCapture = Counter.startTimeCapture
    }

    // logic handling regular dealing
    if (Counter.drawnCardIndex < cardDeck.cardListLen - 1) {
        Counter.drawnCardIndex += 1;
        Element.input_count.focus();
    }
    // logic handling dealing when last card in A deck (out of multiple decks) is currently displayed
    else if (Counter.drawnCardIndex === cardDeck.cardListLen - 1) {
        // last deck in the mega deck
        if (Counter.currDeckNum === Counter.numberOfDecks) {
            Counter.drawnCardIndex += 1;
        }
        else {
            Counter.drawnCardIndex = 0;
            Counter.currDeckNum += 1;
            cardDeck.shuffleDeck();
            Element.input_count.focus();
        }
    }
    // logic handling event of pressing enter after the last card in the deck
    else if (Counter.drawnCardIndex === cardDeck.cardListLen) {
        Flag.endGame = true;
    }
}

function endScreen() {
    // hide + show end screen elements
    Element.img_card.style.visibility = "hidden";
    Element.form_count.style.visibility = "hidden";
    Element.p_play_again_msg.style.visibility = "visible";
    Element.p_actual_true_count_header.style.visibility = "hidden";
    Element.p_actual_true_count_counter.style.visibility = "hidden";
    Element.p_players_true_count_header.style.visibility = "hidden";
    Element.p_players_true_count_counter.style.visibility = "hidden";
    Element.p_card_index.style.visibility = "hidden";
    Element.p_card_rank.style.visibility = "hidden";
    Element.btn_blurb.style.visibility = "hidden";
    Element.btn_hide_actual_true_count.style.visibility = "hidden";
    Element.btn_stats_graph.style.display = "flex";
    // Time Graph
    new Chart("end_screen_stats_chart", {
        type: "line",
        data: {
            labels: Counter.xValues,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: Counter.yValues
            }]
        },
        options: {
            legend: {display: false},
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Card Indices',
                        fontFamily: 'Arial',
                        fontSize: 14,
                        fontStyle: 'bold'
                    },
                    ticks: {
                        autoSkip: false,
                        stepSize: 1,
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'ms',
                        fontFamily: 'Arial',
                        fontSize: 14,
                        fontStyle: 'bold'
                    }
                }]
            }
        } 
    });
    Element.canvas_end_screen_stats_chart.style.display = "block";
    // Average Time
    let roundedAvg = Math.round((Counter.currentTime / Counter.yValues.length) * 100) / 100;
    if (roundedAvg > 999) {
        roundedAvg = Math.round(((roundedAvg / 1000)) * 100) / 100
        Element.p_average_time_per_card_counter.innerHTML = `${roundedAvg}/s`;  
    }
    else {
        Element.p_average_time_per_card_counter.innerHTML = `${roundedAvg}/ms`;  
    }
    Element.p_average_time_per_card_header.style.display = "block";
    Element.p_average_time_per_card_counter.style.display = "block";
    // Scoreboard + cache
    Element.btn_clear_scores.style.display = "block";
    populateScoreBoard();
    drawScoreBoard();
    // Clean up listners
    document.removeEventListener("keydown", startGame);
    document.addEventListener("keydown", playAgainCleanUp);
    console.log("End of the Road");
}


function populateScoreBoard() {
    // populates and sorts the scoreboard map based on time
    const cachedTimesRaw = localStorage.getItem("cachedTimes");
    let cachedTimesArr;
    let cachedTimes;
    if (cachedTimesRaw !== null) {
        cachedTimesArr = JSON.parse(cachedTimesRaw);
        cachedTimes = new Map(cachedTimesArr);
        for (const [key, value] of cachedTimes) {
            Scoreboard.topTen.set(key, value);
        }
    }
    Scoreboard.topTen = new Map([...Scoreboard.topTen.entries()].sort().reverse().slice(-10));
    localStorage.setItem("cachedTimes", JSON.stringify([...Scoreboard.topTen])); 
}

function drawScoreBoard() {
    let i = Scoreboard.topTen.size;
    for (const [time, deckSize] of Scoreboard.topTen) {
        const tableRow = `<tr><td>${i}</td><td>${time}</td><td>${deckSize}</td></tr>`;
        Element.table_header.insertAdjacentHTML("afterend", tableRow);
        i--;
    }
    Element.div_scoreboard_container.style.display = "flex";
}

function playAgainCleanUp(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        console.log("Cleanin UP");
        window.location.reload();
    }
}

Element.form_count.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        // Updates the players count counter from key input
        const inputCountValue = Element.input_count.value;
        Counter.playersCount += Number(inputCountValue);
        Element.p_players_true_count_counter.innerHTML = Counter.playersCount;
        
        // Calculates the actual count
        const cardCountValue = determineCardsCountValue(getCurrCardRank());
        Counter.actualCount += cardCountValue;
        Element.p_actual_true_count_counter.innerHTML = Counter.actualCount;
        
        Element.form_count.reset();
    }
});

function getCurrCardRank() {
    // returns a the current sourced card's rank in a string
    // 0 is ten btw
    const cardName = Element.img_card.src;
    const cardVal = cardName.slice(-5)[0];
    return cardVal;
}

function determineCardsCountValue(cardRank) {
    // cardRank must be a string
    if (!(cardRank === "0" || cardRank === "J" || cardRank === "Q" || cardRank === "K" || cardRank === "A")) {
        cardRank = Number(cardRank);
    }
    else {
        return -1;
    }
    
    if (cardRank >= 2 && cardRank <= 6) {
        return 1;
    }
    else if (cardRank >= 7 && cardRank <= 9) {
        return 0;
    }
}

Element.input_count.addEventListener("beforeinput", function(event) {
    // Shortcuts baby
    // beforeinput.data is the keystroke
    // input.value is the thing in the input box
    if (event.inputType === "insertText") { 
        if (event.data === "1" || event.data === "0" || event.data === "-" || event.data === "-1") {
            return;
        }
        event.preventDefault();
        if (event.data === "q") {
            Element.input_count.value = "1";
        }
        else if (event.data === "w") {
            Element.input_count.value = "0";
        }
        else if (event.data === "e") {
            Element.input_count.value = "-1";
        }
    }
});