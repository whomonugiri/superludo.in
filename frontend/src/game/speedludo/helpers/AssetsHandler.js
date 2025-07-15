export const AssetsHandler = (scene) => {
  scene.load.setPath("/assets");
  scene.load.image("background", "background.png?fxovo=2");
  scene.load.image("black", "black.png?fxovo=2");

  scene.load.image("board", "ludo_board2.png?fxovo=2");
  scene.load.image("control", "control_panel.png?fxovo=256");
  scene.load.image("control2", "control_panel2.png?fxovo=256");

  scene.load.image("bluePlayer", "blue_player.png?fxovo=2");
  scene.load.image("greenPlayer", "green_player.png?fxovo=2");
  scene.load.image("noprofile", "noprofile.png?fxovo=2");
  scene.load.spritesheet("blueDiceAnim", "blue_dice_anim.png?fxovo=2", {
    frameWidth: 115,
    frameHeight: 115,
  });
  scene.load.spritesheet("greenDiceAnim", "green_dice_anim.png?fxovo=2", {
    frameWidth: 115,
    frameHeight: 115,
  });

  scene.load.spritesheet("blueDice", "blue_dice_idle.png?fxovo=2", {
    frameWidth: 115,
    frameHeight: 115,
  });
  scene.load.spritesheet("greenDice", "green_dice_idle.png?fxovo=2", {
    frameWidth: 115,
    frameHeight: 115,
  });
  scene.load.image("ready", "ready.png?fxovo=2");

  scene.load.image("dice1", "dice1.png?fxovo=2");
  scene.load.image("prize", "prize.png?fxovo=2");

  scene.load.image("dice2", "dice2.png?fxovo=2");
  scene.load.image("dice3", "dice3.png?fxovo=2");
  scene.load.image("dice4", "dice4.png?fxovo=2");
  scene.load.image("dice5", "dice5.png?fxovo=2");
  scene.load.image("dice6", "dice6.png?fxovo=2");

  scene.load.image("arrow", "arrow.png?fxovo=2");
  scene.load.image("highlight", "highlighter.png?fxovo=2");

  scene.load.image("blueSmoke", "blue_trail.png?fxovo=2");
  scene.load.image("greenSmoke", "green_trail.png?fxovo=2");

  scene.load.audio("diceSound", "dice.mp3?fxovo=2");
  scene.load.audio("startSound", "game_started.mp3?fxovo=2");
  scene.load.audio("inhomeSound", "inhome.mp3?fxovo=2");
  scene.load.audio("killSound", "killed.mp3?fxovo=2");
  scene.load.audio("moveSound", "move.mp3?fxovo=2");
  scene.load.audio("safestepSound", "safestep.mp3?fxovo=2");
  scene.load.audio("timerSound", "timer.mp3?fxovo=2");
  scene.load.audio("clappingSound", "clapping.mp3?fxovo=2");
  scene.load.audio("fireworksSound", "fireworks.mp3?fxovo=2");

  scene.load.image("playerBorder", "playerborder.png?fxovo=2");

  for (let i = 1; i <= 20; i++) {
    scene.load.image("avatar" + i, "avatars/avatar" + i + ".png?fxovo=55");
  }

  scene.load.image("marker", "moveMarker.png?fxovo=2");

  scene.load.spritesheet("bluefire", "bluefire.png?fxovo=2", {
    frameWidth: 256,
    frameHeight: 256,
  });

  scene.load.spritesheet("greenfire", "greenfire.png?fxovo=2", {
    frameWidth: 256,
    frameHeight: 256,
  });

  // scene.load.image("crown", "crown.png?fxovo=2");
  scene.load.image("lifeleft", "leftlife.png?fxovo=2");
  scene.load.image("lifeused", "endlife.png?fxovo=2");

  scene.load.image("finish", "finish.png?fxovo=2");
  scene.load.image("finish3", "finish3.png?fxovo=2");

  scene.load.image("particle", "particle.png?fxovo=2");
  scene.load.image("play", "play.png?fxovo=2");
  scene.load.image("back", "back.png?fxovo=2");
  scene.load.image("timerplate", "timer.png?fxovo=2");
  scene.load.image("safer", "safer.png?fxovo=2");
  scene.load.image("score", "score.png?fxovo=2");
  scene.load.image("diceholder", "diceholder.png?fxovo=2");

  // scene.load.image("exit", "exit.png?fxovo=2");
  // scene.load.image("warning", "warning.png?fxovo=2");
  // scene.load.image("yes", "yes.png?fxovo=2");
  // scene.load.image("cancel", "cancel.png?fxovo=2");
};
