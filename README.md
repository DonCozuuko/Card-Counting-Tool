# Card Counting Trainer
An interactive tool that helps practice card counting in Blackjack. Playing perfect strategy can only get you so far since the house still has an edge against you. Counting cards enables the player to better assess the odds and risk of the current hand to make a more calculated play. In other words, you gain a statistical edge against the house which can be leveraged to win more booty. (lowkey a cheese strat, but fuck the house 🖕)
## Features
- Counting cards at a live table is a very stressful environment primarily because getting caught counting will get you thrown out and most likely banned from the institution. On top of that, the dealer is dealing cards at fucking lighting speeds. So I included a timer, accurate to miliseconds, to record the time it takes for you to go through your choice of deck size.
- Additionally, the top ten best times are weighted by deck size and displayed at the end screen. 
- Your best times are also cached in the browser so you can come back and track your progress.
- I've included the average time (ms/s) it takes to count a card, aswell as a graph (using the Chart.js lib) which displays the actual time it took to count each card.
- Most institutions shuffle in multiple decks (6+) to make it harder for people to keep track of an accurate true count, and thus gaining an edge. So I've also added the option to add multiple decks to the current session to train for the grown-up table.
## Demo

https://github.com/user-attachments/assets/74342528-4bd9-4ef3-8215-fd92715c0bcf

_decks were modified to have only a couple cards for demonstration purposes_

## Quick Start
- I am not hosting this website lol, do I look like I'm made of money. Use five-server start command in visual studio code.
