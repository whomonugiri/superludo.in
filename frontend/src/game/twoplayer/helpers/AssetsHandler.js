export const AssetsHandler = (scene) => {
  scene.load.setPath("/assets");
  scene.load.image("background", "background.png?fovo=2");
  scene.load.image("black", "black.png?fovo=2");

  scene.load.image("board", "ludo_board.png?fovo=2");
  scene.load.image("control", "control_panel.png?fovo=2565");
  scene.load.image("control2", "control_panel2.png?fovo=22656");

  scene.load.image("bluePlayer", "blue_player.png?fovo=2");
  scene.load.image("greenPlayer", "green_player.png?fovo=2");
  scene.load.image("noprofile", "noprofile.png?fovo=2");
  scene.load.spritesheet("blueDiceAnim", "blue_dice_anim.png?fovo=2", {
    frameWidth: 115,
    frameHeight: 115,
  });
  scene.load.spritesheet("greenDiceAnim", "green_dice_anim.png?fovo=2", {
    frameWidth: 115,
    frameHeight: 115,
  });
  scene.load.image("prize", "prize.png?fovo=2");

  scene.load.spritesheet("blueDice", "blue_dice_idle.png?fovo=2", {
    frameWidth: 115,
    frameHeight: 115,
  });
  scene.load.spritesheet("greenDice", "green_dice_idle.png?fovo=2", {
    frameWidth: 115,
    frameHeight: 115,
  });

  scene.load.image("dice1", "dice1.png?fovo=2");
  scene.load.image("dice2", "dice2.png?fovo=2");
  scene.load.image("dice3", "dice3.png?fovo=2");
  scene.load.image("dice4", "dice4.png?fovo=2");
  scene.load.image("dice5", "dice5.png?fovo=2");
  scene.load.image("dice6", "dice6.png?fovo=2");

  scene.load.image("arrow", "arrow.png?fovo=2");
  scene.load.image("highlight", "highlighter.png?fovo=2");

  scene.load.image("blueSmoke", "blue_trail.png?fovo=2");
  scene.load.image("greenSmoke", "green_trail.png?fovo=2");

  scene.load.audio("diceSound", "dice.mp3?fovo=2");
  scene.load.audio("startSound", "game_started.mp3?fovo=2");
  scene.load.audio("inhomeSound", "inhome.mp3?fovo=2");
  scene.load.audio("killSound", "killed.mp3?fovo=2");
  scene.load.audio("moveSound", "move.mp3?fovo=2");
  scene.load.audio("safestepSound", "safestep.mp3?fovo=2");
  scene.load.audio("timerSound", "timer.mp3?fovo=2");
  scene.load.audio("clappingSound", "clapping.mp3?fovo=2");
  scene.load.audio("fireworksSound", "fireworks.mp3?fovo=2");

  scene.load.image("playerBorder", "playerborder.png?fovo=2");
  scene.load.image("ready", "ready.png?fovo=2");

  for (let i = 1; i <= 20; i++) {
    scene.load.image("avatar" + i, "avatars/avatar" + i + ".png?fovo=35");
  }

  scene.load.image("marker", "moveMarker.png?fovo=2");

  scene.load.spritesheet("bluefire", "bluefire.png?fovo=2", {
    frameWidth: 256,
    frameHeight: 256,
  });

  scene.load.spritesheet("greenfire", "greenfire.png?fovo=2", {
    frameWidth: 256,
    frameHeight: 256,
  });

  scene.load.image("timerplate", "timer.png?fovo=2");

  scene.load.image("lifeleft", "leftlife.png?fovo=2");
  scene.load.image("lifeused", "endlife.png?fovo=2");

  scene.load.image("finish", "finish.png?fovo=2");
  scene.load.image("particle", "particle.png?fovo=2");
  scene.load.image("play", "play.png?fovo=2");
  scene.load.image("back", "back.png?fovo=2");
  scene.load.image("diceholder", "diceholder.png?fovo=2");

  // scene.load.image("exit", "exit.png?fovo=2");
  // scene.load.image("warning", "warning.png?fovo=2");
  // scene.load.image("yes", "yes.png?fovo=2");
  // scene.load.image("cancel", "cancel.png?fovo=2");
};
