# Walkies

Developed in 24 hours at the [HackBordeaux 2018](https://hackbordeaux.com/) hackathon.

Devpost link: [Walkies](https://devpost.com/software/walkies)

<img src="/design/Ipad mockups/splash.png?raw=true" width="600px">

**Authors:**

- Pierre Archambault ([bor504](https://github.com/bor504))
- Adam Kantorík ([Kanter666](https://github.com/Kanter666))
- Juraj Mičko ([jjurm](https://github.com/jjurm))
- Akira Nagao ([akiranagao](https://github.com/akiranagao))

## Inspiration
We were thinking about games suitable for a hospital environment. Patients lie in beds and are bored and alone, physically and/or psychologically. We devised a game world for hospital patients - where they can interact together and play different minigames against others.

## What it does
It is a voice controlled game. Players can choose a character, move around the map and interact with it. Each map element is a minigame, which allows multiple methods of interaction for various tastes. It has a graphic interface where players can see their position and other players, for inclusivity.

## How we built it
We used javascript with node js and typescript. For game features we use Phaser framework and we also implemented google assistant for voice commands and dialogflow for recognizing commands.

## Challenges we ran into
There were many roadblocks: authentication for multiple players, javascript game framework, voice control, for example.

## Accomplishments that we are proud of
We successfully made a client-server game which allows multiple players to play at the same time with voice control and move around the map and interact with it.

## What we learned
Google voice control, javascript games and operating a server client.

## What's next for Walkies
Making minigames and more interactions with players. We would like to implement the point system for longer term patients to remain engaged and build their character with customization options.

## Built With
`google-assistant`, `node.js`, `typescript`, `javascript`, `phaser.js`, `webpack`, `vps`, `html`, `css`, `google-oauth`, `dialogflow`, `digitalocean`, `websockets`, `express.js`, `oauth`

## Screens

<img src="/design/screens/2. Pick character/1pick your character.png?raw=true" width="420px"> <img src="/design/screens/2. Pick character/2pick your character 2.png?raw=true" width="420px"> <img src="/design/screens/3. Map/map 2.png?raw=true" width="420px"> <img src="/design/screens/5. Mini Games/trivia.png?raw=true" width="420px">
