export const AssetsHandler = (scene) => {
  scene.load.setPath("/assets");
  scene.load.image("background", "background.png?vovo=2");
  scene.load.image("black", "black.png?vovo=2");

  scene.load.image("board", "ludo_board.png?vovo=2");
  scene.load.image("control", "control_panel.png?vovo=2565");
  scene.load.image("control2", "control_panel2.png?vovo=22656");

  scene.load.image("bluePlayer", "blue_player.png?vovo=2");
  scene.load.image("greenPlayer", "green_player.png?vovo=2");
  scene.load.image("noprofile", "noprofile.png?vovo=2");
  scene.load.spritesheet("blueDiceAnim", "blue_dice_anim.png?vovo=2", {
    frameWidth: 115,
    frameHeight: 115,
  });
  scene.load.spritesheet("greenDiceAnim", "green_dice_anim.png?vovo=2", {
    frameWidth: 115,
    frameHeight: 115,
  });
  scene.load.image("prize", "prize.png?vovo=2");

  scene.load.spritesheet("blueDice", "blue_dice_idle.png?vovo=2", {
    frameWidth: 115,
    frameHeight: 115,
  });
  scene.load.spritesheet("greenDice", "green_dice_idle.png?vovo=2", {
    frameWidth: 115,
    frameHeight: 115,
  });

  scene.load.image("dice1", "dice1.png?vovo=2");
  scene.load.image("dice2", "dice2.png?vovo=2");
  scene.load.image("dice3", "dice3.png?vovo=2");
  scene.load.image("dice4", "dice4.png?vovo=2");
  scene.load.image("dice5", "dice5.png?vovo=2");
  scene.load.image("dice6", "dice6.png?vovo=2");

  scene.load.image("arrow", "arrow.png?vovo=2");
  scene.load.image("highlight", "highlighter.png?vovo=2");

  scene.load.image("blueSmoke", "blue_trail.png?vovo=2");
  scene.load.image("greenSmoke", "green_trail.png?vovo=2");

  scene.load.audio("diceSound", "dice.mp3?vovo=2");
  scene.load.audio("startSound", "game_started.mp3?vovo=2");
  scene.load.audio("inhomeSound", "inhome.mp3?vovo=2");
  scene.load.audio("killSound", "killed.mp3?vovo=2");
  scene.load.audio("moveSound", "move.mp3?vovo=2");
  scene.load.audio("safestepSound", "safestep.mp3?vovo=2");
  scene.load.audio("timerSound", "timer.mp3?vovo=2");
  scene.load.audio("clappingSound", "clapping.mp3?vovo=2");
  scene.load.audio("fireworksSound", "fireworks.mp3?vovo=2");

  scene.load.image("playerBorder", "playerborder.png?vovo=2");
  scene.load.image("ready", "ready.png?vovo=2");

  for (let i = 1; i <= 20; i++) {
    scene.load.image("avatar" + i, "avatars/avatar" + i + ".png?vovo=35");
  }

  scene.load.image("marker", "moveMarker.png?vovo=2");

  scene.load.spritesheet("bluefire", "bluefire.png?vovo=2", {
    frameWidth: 256,
    frameHeight: 256,
  });

  scene.load.spritesheet("greenfire", "greenfire.png?vovo=2", {
    frameWidth: 256,
    frameHeight: 256,
  });

  scene.load.image("timerplate", "timer.png?vovo=2");

  scene.load.image("lifeleft", "leftlife.png?vovo=2");
  scene.load.image("lifeused", "endlife.png?vovo=2");

  scene.load.image("finish", "finish.png?vovo=2");
  scene.load.image("particle", "particle.png?vovo=2");
  scene.load.image("play", "play.png?vovo=2");
  scene.load.image("back", "back.png?vovo=2");
  scene.load.image("diceholder", "diceholder.png?vovo=2");

  // scene.load.image("exit", "exit.png?vovo=2");
  // scene.load.image("warning", "warning.png?vovo=2");
  // scene.load.image("yes", "yes.png?vovo=2");
  // scene.load.image("cancel", "cancel.png?vovo=2");
};
