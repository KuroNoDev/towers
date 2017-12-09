import Boot from './states/boot';
import Game from './states/game';

const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'towers-game');

game.state.add('boot', new Boot());
game.state.add('game', new Game());

game.state.start('boot');
