export const AssetsHandler = (scene) => {
  scene.load.setPath("/assets");
  scene.load.image("background", "background.png?ffovo=2");
  scene.load.image("black", "black.png?ffovo=2");

  scene.load.image("board", "ludo_board.png?ffovo=23");
  scene.load.image("control", "control_panel.png?ffovo=2565");
  scene.load.image("control2", "control_panel2.png?ffovo=22656");

  scene.load.image("bluePlayer", "blue_player.png?ffovo=2");
  scene.load.image("greenPlayer", "green_player.png?ffovo=2");
  scene.load.image("noprofile", "noprofile.png?ffovo=2");
  scene.load.spritesheet("blueDiceAnim", "blue_dice_anim.png?ffovo=2", {
    frameWidth: 115,
    frameHeight: 115,
  });
  scene.load.spritesheet("greenDiceAnim", "green_dice_anim.png?ffovo=2", {
    frameWidth: 115,
    frameHeight: 115,
  });
  scene.load.image("prize", "prize.png?ffovo=2");

  scene.load.spritesheet("blueDice", "blue_dice_idle.png?ffovo=2", {
    frameWidth: 115,
    frameHeight: 115,
  });
  scene.load.spritesheet("greenDice", "green_dice_idle.png?ffovo=2", {
    frameWidth: 115,
    frameHeight: 115,
  });

  scene.load.image("dice1", "dice1.png?ffovo=2");
  scene.load.image("dice2", "dice2.png?ffovo=2");
  scene.load.image("dice3", "dice3.png?ffovo=2");
  scene.load.image("dice4", "dice4.png?ffovo=2");
  scene.load.image("dice5", "dice5.png?ffovo=2");
  scene.load.image("dice6", "dice6.png?ffovo=2");

  scene.load.image("arrow", "arrow.png?ffovo=2");
  scene.load.image("highlight", "highlighter.png?ffovo=2");

  scene.load.image("blueSmoke", "blue_trail.png?ffovo=2");
  scene.load.image("greenSmoke", "green_trail.png?ffovo=2");

  scene.load.audio("diceSound", "dice.mp3?ffovo=2");
  scene.load.audio("startSound", "game_started.mp3?ffovo=2");
  scene.load.audio("inhomeSound", "inhome.mp3?ffovo=2");
  scene.load.audio("killSound", "killed.mp3?ffovo=2");
  scene.load.audio("moveSound", "move.mp3?ffovo=2");
  scene.load.audio("safestepSound", "safestep.mp3?ffovo=2");
  scene.load.audio("timerSound", "timer.mp3?ffovo=2");
  scene.load.audio("clappingSound", "clapping.mp3?ffovo=2");
  scene.load.audio("fireworksSound", "fireworks.mp3?ffovo=2");

  scene.load.image("playerBorder", "playerborder.png?ffovo=2");
  scene.load.image("ready", "ready.png?ffovo=2");

  for (let i = 1; i <= 20; i++) {
    scene.load.image("avatar" + i, "avatars/avatar" + i + ".png?ffovo=35");
  }

  scene.load.image("marker", "moveMarker.png?ffovo=2");

  scene.load.spritesheet("bluefire", "bluefire.png?ffovo=2", {
    frameWidth: 256,
    frameHeight: 256,
  });

  scene.load.spritesheet("greenfire", "greenfire.png?ffovo=2", {
    frameWidth: 256,
    frameHeight: 256,
  });

  scene.load.image("timerplate", "timer.png?ffovo=2");

  scene.load.image("lifeleft", "leftlife.png?ffovo=2");
  scene.load.image("lifeused", "endlife.png?ffovo=2");

  scene.load.image("finish", "finish.png?ffovo=2");
  scene.load.image("particle", "particle.png?ffovo=2");
  scene.load.image("play", "play.png?ffovo=2");
  scene.load.image("back", "back.png?ffovo=2");
  scene.load.image("diceholder", "diceholder.png?ffovo=2");

  // scene.load.image("exit", "exit.png?ffovo=2");
  // scene.load.image("warning", "warning.png?ffovo=2");
  // scene.load.image("yes", "yes.png?ffovo=2");
  // scene.load.image("cancel", "cancel.png?ffovo=2");
};
