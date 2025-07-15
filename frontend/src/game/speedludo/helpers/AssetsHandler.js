export const AssetsHandler = (scene) => {
  scene.load.setPath("/assets");
  scene.load.image("background", "background.png?vxovo=2");
  scene.load.image("black", "black.png?vxovo=2");

  scene.load.image("board", "ludo_board.png?vxovo=2");
  scene.load.image("control", "control_panel.png?vxovo=256");
  scene.load.image("control2", "control_panel2.png?vxovo=256");

  scene.load.image("bluePlayer", "blue_player.png?vxovo=2");
  scene.load.image("greenPlayer", "green_player.png?vxovo=2");
  scene.load.image("noprofile", "noprofile.png?vxovo=2");
  scene.load.spritesheet("blueDiceAnim", "blue_dice_anim.png?vxovo=2", {
    frameWidth: 115,
    frameHeight: 115,
  });
  scene.load.spritesheet("greenDiceAnim", "green_dice_anim.png?vxovo=2", {
    frameWidth: 115,
    frameHeight: 115,
  });

  scene.load.spritesheet("blueDice", "blue_dice_idle.png?vxovo=2", {
    frameWidth: 115,
    frameHeight: 115,
  });
  scene.load.spritesheet("greenDice", "green_dice_idle.png?vxovo=2", {
    frameWidth: 115,
    frameHeight: 115,
  });
  scene.load.image("ready", "ready.png?vxovo=2");

  scene.load.image("dice1", "dice1.png?vxovo=2");
  scene.load.image("prize", "prize.png?vxovo=2");

  scene.load.image("dice2", "dice2.png?vxovo=2");
  scene.load.image("dice3", "dice3.png?vxovo=2");
  scene.load.image("dice4", "dice4.png?vxovo=2");
  scene.load.image("dice5", "dice5.png?vxovo=2");
  scene.load.image("dice6", "dice6.png?vxovo=2");

  scene.load.image("arrow", "arrow.png?vxovo=2");
  scene.load.image("highlight", "highlighter.png?vxovo=2");

  scene.load.image("blueSmoke", "blue_trail.png?vxovo=2");
  scene.load.image("greenSmoke", "green_trail.png?vxovo=2");

  scene.load.audio("diceSound", "dice.mp3?vxovo=2");
  scene.load.audio("startSound", "game_started.mp3?vxovo=2");
  scene.load.audio("inhomeSound", "inhome.mp3?vxovo=2");
  scene.load.audio("killSound", "killed.mp3?vxovo=2");
  scene.load.audio("moveSound", "move.mp3?vxovo=2");
  scene.load.audio("safestepSound", "safestep.mp3?vxovo=2");
  scene.load.audio("timerSound", "timer.mp3?vxovo=2");
  scene.load.audio("clappingSound", "clapping.mp3?vxovo=2");
  scene.load.audio("fireworksSound", "fireworks.mp3?vxovo=2");

  scene.load.image("playerBorder", "playerborder.png?vxovo=2");

  for (let i = 1; i <= 20; i++) {
    scene.load.image("avatar" + i, "avatars/avatar" + i + ".png?vxovo=55");
  }

  scene.load.image("marker", "moveMarker.png?vxovo=2");

  scene.load.spritesheet("bluefire", "bluefire.png?vxovo=2", {
    frameWidth: 256,
    frameHeight: 256,
  });

  scene.load.spritesheet("greenfire", "greenfire.png?vxovo=2", {
    frameWidth: 256,
    frameHeight: 256,
  });

  // scene.load.image("crown", "crown.png?vxovo=2");
  scene.load.image("lifeleft", "leftlife.png?vxovo=2");
  scene.load.image("lifeused", "endlife.png?vxovo=2");

  scene.load.image("finish", "finish.png?vxovo=2");
  scene.load.image("finish3", "finish3.png?vxovo=2");

  scene.load.image("particle", "particle.png?vxovo=2");
  scene.load.image("play", "play.png?vxovo=2");
  scene.load.image("back", "back.png?vxovo=2");
  scene.load.image("timerplate", "timer.png?vxovo=2");
  scene.load.image("safer", "safer.png?vxovo=2");
  scene.load.image("score", "score.png?vxovo=2");
  scene.load.image("diceholder", "diceholder.png?vxovo=2");

  // scene.load.image("exit", "exit.png?vxovo=2");
  // scene.load.image("warning", "warning.png?vxovo=2");
  // scene.load.image("yes", "yes.png?vxovo=2");
  // scene.load.image("cancel", "cancel.png?vxovo=2");
};
