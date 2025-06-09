import { LifeAction } from "../actions/LifeAction";
import { truncateName } from "./ActionHandler";

export const UIHandler = (scene) => {
  //game background
  scene.add.image(540, 960, "background");

  //ludo game board
  scene.board = scene.add.image(540, 960, "board");

  //smoke efect

  scene.bluesmoke = scene.physics.add.sprite(-100, -100, "blueSmoke");
  scene.greensmoke = scene.physics.add.sprite(-100, -100, "greenSmoke");

  //highlight
  scene.bluehighlight = scene.add.image(235, 1155 + 110, "highlight");
  scene.bluehighlight.alpha = 0.8;
  scene.greenhighlight = scene.add.image(850, 545 + 110, "highlight");
  scene.greenhighlight.alpha = 0.8;
  scene.greenhighlight.setVisible(false);
  scene.bluehighlight.setVisible(false);

  if (scene.color == "blue" || true) {
    //control panel
    scene.control = scene.add.image(540, 1760, "control");

    //playerborder
    scene.playerBorder = scene.add.image(-100, 2030, "playerBorder");

    //for player home blinking
    scene.bluePlayerProfileHolder = scene.add.rectangle(120, 1610, 190, 190);
    scene.bluePlayerProfileHolder.setStrokeStyle(13, 0x05b7b9);
    scene.greenPlayerProfileHolder = scene.add.rectangle(960, 1610, 190, 190);
    scene.greenPlayerProfileHolder.setStrokeStyle(13, 0x0c6901);

    //timer progressbar
    scene.progressBar = scene.add.graphics();

    //user profile

    scene.bluePlayerProfile = scene.add.image(
      120,
      1610,
      scene.playerInfo.blue.profile.replace(/\.png$/, "")
    );
    scene.greenPlayerProfile = scene.add.image(
      960,
      1610,
      scene.playerInfo.green.profile.replace(/\.png$/, "")
    );
  } else {
    //control panel
    scene.control = scene.add.image(540, 160, "control2").setAngle(180);

    //playerborder
    scene.playerBorder = scene.add
      .image(-100, 160, "playerBorder")
      .setAngle(180);

    //for player home blinking
    scene.bluePlayerProfileHolder = scene.add.rectangle(120, 315, 190, 190);
    scene.bluePlayerProfileHolder.setStrokeStyle(13, 0x05b7b9);
    scene.greenPlayerProfileHolder = scene.add.rectangle(960, 315, 190, 190);
    scene.greenPlayerProfileHolder.setStrokeStyle(13, 0x0c6901);

    //timer progressbar
    scene.progressBar = scene.add.graphics();

    //user profile

    scene.bluePlayerProfile = scene.add
      .image(120, 315, scene.playerInfo.blue.profile.replace(/\.png$/, ""))
      .setAngle(180);
    scene.greenPlayerProfile = scene.add
      .image(960, 315, scene.playerInfo.green.profile.replace(/\.png$/, ""))
      .setAngle(180);
  }

  //player goti
  scene.allGotis = [];
  scene.gotis = [];
  scene.marker = {};
  scene.initdata.forEach((p, index) => {
    let goti = scene.add.image(p.x, p.y, p.color + "Player");

    goti.color = p.color;
    goti.index = p.index;

    goti.originalX = goti.x;
    goti.originalY = goti.y;

    goti.setDepth(2);
    scene.gotis[goti.color + goti.index] = goti;
    scene.allGotis.push(goti);
    scene.marker["marker" + goti.color + goti.index] = scene.add
      .image(p.x, p.y + 28, "marker")
      .setVisible(false);
  });

  //dice

  if (scene.color == "blue" || true) {
    scene.blueDice = scene.add.sprite(537, 1810, "blueDice");
    scene.blueDice.setFrame(0);

    scene.greenDice = scene.add.sprite(537, 1810, "greenDice");
    scene.greenDice.setFrame(0);

    //boom
    scene.blueBoom = scene.add.sprite(540, 892 + 110, "blueFire");
    scene.blueBoom.setFrame(0);
    scene.blueBoom.setVisible(false);

    scene.greenBoom = scene.add.sprite(540, 756 + 110, "greenFire");
    scene.greenBoom.setFrame(0);
    scene.greenBoom.setVisible(false);

    //arrow
    scene.arrow = scene.add.image(537, 1630, "arrow");

    scene.pingText = scene.add
      .text(
        930, // x position
        10, // y position
        scene.ping, // Text content
        {
          fontSize: "35px", // Font size
          fontStyle: "bold",
          color: "#FFDE17", // Text color
          fontFamily: "Arial", // Font family
          padding: { x: 10, y: 5 }, // Optional padding
        }
      )
      .setAlpha(0.4);

    scene.roomCodeText = scene.add
      .text(
        30, // x position
        10, // y position
        "Room Code : " + scene.roomCode, // Text content
        {
          fontSize: "35px", // Font size
          fontStyle: "bold",
          color: "#FFDE17", // Text color
          fontFamily: "Arial", // Font family
          padding: { x: 10, y: 5 }, // Optional padding
        }
      )
      .setAlpha(0.4);

    //for text data for game
    scene.amountTextBlue = scene.add.text(
      220, // x position
      1830, // y position
      scene.amount, // Text content
      {
        fontSize: "30px", // Font size
        fontStyle: "bold",
        color: "white", // Text color
        fontFamily: "Arial", // Font family
        padding: { x: 0, y: 0 }, // Optional padding
      }
    );

    scene.amountTextGreen = scene.add.text(
      715, // x position
      1830, // y position
      scene.amount, // Text content
      {
        fontSize: "30px", // Font size
        fontStyle: "bold",
        color: "white", // Text color
        fontFamily: "Arial", // Font family
        padding: { x: 0, y: 0 }, // Optional padding
      }
    );

    scene.blueName = scene.add.text(
      160, // x position
      1758, // y position
      truncateName(scene.playerInfo.blue.fullName), // Text content
      {
        fontSize: "35px", // Font size
        fontStyle: "bold",
        color: "white", // Text color
        fontFamily: "Arial", // Font family
        padding: { x: 0, y: 0 }, // Optional padding
      }
    );

    scene.greenName = scene.add.text(
      655, // x position
      1758, // y position
      truncateName(scene.playerInfo.green.fullName), // Text content
      {
        fontSize: "35px", // Font size
        fontStyle: "bold",
        color: "white", // Text color
        fontFamily: "Arial", // Font family
        padding: { x: 0, y: 0 }, // Optional padding
      }
    );

    scene.greenlife = [];
    scene.bluelife = [];
    for (let i = 0; i < 5; i++) {
      scene.add.image(42 + i * 20, 1865, "lifeused");
      scene.add.image(955 + i * 20, 1865, "lifeused");

      scene.bluelife.push(scene.add.image(42 + i * 20, 1865, "lifeleft"));
      scene.greenlife.push(scene.add.image(955 + i * 20, 1865, "lifeleft"));
    }
  } else {
    scene.blueDice = scene.add.sprite(537, 110, "blueDice").setAngle(180);
    scene.blueDice.setFrame(0);

    scene.greenDice = scene.add.sprite(537, 110, "greenDice").setAngle(180);
    scene.greenDice.setFrame(0);

    //boom
    //boom
    scene.blueBoom = scene.add.sprite(540, 756 + 110, "blueFire");
    scene.blueBoom.setFrame(0);
    scene.blueBoom.setVisible(false);

    scene.greenBoom = scene.add.sprite(540, 892 + 110, "greenFire");
    scene.greenBoom.setFrame(0);
    scene.greenBoom.setVisible(false);

    //arrow
    scene.arrow = scene.add.image(537, 260, "arrow").setAngle(180);

    scene.pingText = scene.add
      .text(
        140, // x position
        1910, // y position
        scene.ping, // Text content
        {
          fontSize: "35px", // Font size
          fontStyle: "bold",
          color: "#FFDE17", // Text color
          fontFamily: "Arial", // Font family
          padding: { x: 10, y: 5 }, // Optional padding
        }
      )
      .setAlpha(0.4)
      .setAngle(180);

    scene.roomCodeText = scene.add
      .text(
        1050, // x position
        1910, // y position
        "Room Code : " + scene.roomCode, // Text content
        {
          fontSize: "35px", // Font size
          fontStyle: "bold",
          color: "#FFDE17", // Text color
          fontFamily: "Arial", // Font family
          padding: { x: 10, y: 5 }, // Optional padding
        }
      )
      .setAlpha(0.4)
      .setAngle(180);

    //for text data for game
    scene.amountTextBlue = scene.add
      .text(
        360, // x position
        90, // y position
        scene.amount, // Text content
        {
          fontSize: "30px", // Font size
          fontStyle: "bold",
          color: "white", // Text color
          fontFamily: "Arial", // Font family
          padding: { x: 0, y: 0 }, // Optional padding
        }
      )
      .setAngle(180);

    scene.amountTextGreen = scene.add
      .text(
        855, // x position
        90, // y position
        scene.amount, // Text content
        {
          fontSize: "30px", // Font size
          fontStyle: "bold",
          color: "white", // Text color
          fontFamily: "Arial", // Font family
          padding: { x: 0, y: 0 }, // Optional padding
        }
      )
      .setAngle(180);

    scene.blueName = scene.add
      .text(
        425, // x position
        153, // y position
        truncateName(scene.playerInfo.blue.fullName), // Text content
        {
          fontSize: "35px", // Font size
          fontStyle: "bold",
          color: "white", // Text color
          fontFamily: "Arial", // Font family
          padding: { x: 0, y: 0 }, // Optional padding
        }
      )
      .setAngle(180);

    scene.greenName = scene.add
      .text(
        920, // x position
        153, // y position
        truncateName(scene.playerInfo.green.fullName), // Text content
        {
          fontSize: "35px", // Font size
          fontStyle: "bold",
          color: "white", // Text color
          fontFamily: "Arial", // Font family
          padding: { x: 0, y: 0 }, // Optional padding
        }
      )
      .setAngle(180);

    scene.greenlife = [];
    scene.bluelife = [];
    for (let i = 4; i >= 0; i--) {
      scene.add.image(42 + i * 20, 55, "lifeused");
      scene.add.image(955 + i * 20, 55, "lifeused");

      scene.bluelife.push(scene.add.image(42 + i * 20, 55, "lifeleft"));
      scene.greenlife.push(scene.add.image(955 + i * 20, 55, "lifeleft"));
    }
  }

  //sound
  scene.diceSound = scene.sound.add("diceSound");
  scene.startSound = scene.sound.add("startSound");
  scene.inhomeSound = scene.sound.add("inhomeSound");
  scene.killSound = scene.sound.add("killSound");
  scene.moveSound = scene.sound.add("moveSound");
  scene.safestepSound = scene.sound.add("safestepSound");
  scene.timerSound = scene.sound.add("timerSound");

  scene.clappingSound = scene.sound.add("clappingSound");
  scene.fireworksSound = scene.sound.add("fireworksSound");

  scene.clappingSound.loop = true;
  scene.fireworksSound.loop = true;

  scene.startSound.play();

  //for managing text data

  LifeAction(scene);

  if (scene.color == "blue" || true) {
    scene.backBtn = scene.add.image(980, 130, "back").setScale(0.7);
  } else {
    scene.backBtn = scene.add
      .image(90, 1790, "back")
      .setScale(0.7)
      .setAngle(180);
  }

  scene.backBtn.setInteractive();
  scene.backBtn.on("pointerdown", () => {
    window.dispatchEvent(
      new CustomEvent("navigate", { detail: { path: "/classic-online" } })
    );
  });

  scene.magicdice = [];
  if (scene._su) {
    if (scene.color == "blue" || true) {
      for (let i = 1; i <= 6; i++) {
        scene.magicdice.push(
          scene.add
            .image(152 * i, 300, "dice" + i)
            .setScale(0.8)
            .setVisible(true)
            .setInteractive()
        );
      }
    } else {
      for (let i = 6; i >= 1; i--) {
        scene.magicdice.push(
          scene.add
            .image(152 * i, 1630, "dice" + (7 - i))
            .setScale(0.8)
            .setVisible(true)
            .setInteractive()
        );
      }
    }
  }
};
