import store from "../../config/store";
import { tiles } from "../../data/maps/1";
import knight from "../npc/knight";

export default function fight(attackInput) {
  const enemyMaxHP = store.getState().player.eMaxHp;
  let enemyHP = store.getState().player.enemyHealth;
  let playerHP = store.getState().player.health;
  let fightingNow = true;
  let visibility = "none";

  const fightNowFalse = () => {
    fightingNow = false;
  };

  let newDialogue = [];
  if (enemyHP && playerHP) {
    if (attackInput === "attack") {
      // console.log("attack");
      playerAttack();
    } else if (attackInput === "heal") {
      // console.log("heal");
      playerHeal();
    }
  }
  //CHANGE S
  // console.log(`This is the newDialogue Arr ${newDialogue}`);
  if (enemyHP) {
    // console.log("ENEMY ATTACK -------------------------------------");

    if (Math.floor(Math.random() * (2 - 0) + 0)) {
      enemyAttack();
    } else {
      enemyHeal();
    }
  }
  if (enemyHP <= 0) {
    // fightingNow = false;
    fightNowFalse();

    if (store.getState().player.talkingTo === "knightBattle") {
      setTimeout(function() {
        knightBattleWin();
      }, 5000);
    } else if (store.getState().player.talkingTo === "goblinBattle") {
      setTimeout(function() {
        goblinBattleWin();
      }, 5000);
    } else if (store.getState().player.talkingTo === "goblinTwoBattle") {
      setTimeout(function() {
        goblinTwoBattleWin();
      }, 5000);
    } else if (store.getState().player.talkingTo === "bossBattle") {
      setTimeout(function() {
        bossBattleWin();
      }, 5000);
    }
    newDialogue.push("Congratulations!", "YOU WIN!!!");
  } else if (playerHP <= 0) {
    fightNowFalse();
    newDialogue.push("you lost....");
  } else {
    newDialogue.push(" I to Heal \xa0\xa0\xa0\xa0\xa0\xa0 L to Attack");
  }

  fightingNow ? (visibility = "none") : (visibility = "visible");
  // setTimeout(()=>{}, 5000);

  dispatchCombat(newDialogue, playerHP, enemyHP, fightingNow, visibility);

  function dispatchCombat(
    newDialogue,
    playerHP,
    enemyHP,
    fightingNow,
    canBeSeen
  ) {
    store.dispatch({
      type: "FIGHT_SEQUENCE",
      payload: {
        currDialogue: newDialogue,
        enemyHealth: enemyHP,
        health: playerHP,
        page: 0,
        fightingNow: fightingNow
      }
    });

    setTimeout(function() {
      dispatchVisibility(canBeSeen);
    }, 5000);
  }
  function dispatchVisibility(canBeSeen) {
    store.dispatch({
      type: "VISIBILITY",
      payload: {
        visibility: canBeSeen
      }
    });
  }

  function dispatchSignDisplay(displayValue) {
    store.dispatch({
      type: "SHOW_SIGN",
      payload: {
        display: displayValue
      }
    });
  }

  function knightBattleWin() {
    dispatchPrevMap();
    if (store.getState().player.prevMapName === "Stage1") {
      dispatchSignDisplay("flex");
    }
    store.dispatch({
      type: "KNIGHT_DISPLAY",
      payload: {
        display: "none"
      }
    });

    dispatchCombat(null, 20, null, false, "visible");
  }

  function dispatchPrevMap() {
    store.dispatch({
      type: "ADD_TILES",
      payload: {
        tiles: store.getState().player.prevMap,
        name: store.getState().player.prevMapName
      }
    });
    // dispatchCombat(null, 20, null, false, "visible");
  }

  function goblinOneDisplay(display) {
    store.dispatch({
      type: "GOBLIN_DISPLAY",
      payload: {
        display
      }
    });
  }

  function goblinOneVisibility(visi) {
    store.dispatch({
      type: "GOBLIN_VISIBILITY",
      payload: {
        visibility: visi
      }
    });
  }

  function goblinTwoDisplay(display) {
    store.dispatch({
      type: "GOBLIN_DISPLAY_TWO",
      payload: {
        display
      }
    });
  }

  function bossDisplay(display) {
    store.dispatch({
      type: "BOSS_DISPLAY",
      payload: {
        display
      }
    });
  }
  function goblinBattleWin() {
    dispatchPrevMap();
    dispatchSignDisplay("flex");
    goblinOneDisplay("none");
    dispatchCombat(null, 20, null, false, "visible");
  }

  function goblinTwoBattleWin() {
    dispatchPrevMap();
    dispatchSignDisplay("flex");
    goblinTwoDisplay("none");
    goblinOneVisibility("visible");
    dispatchCombat(null, 20, null, false, "visible");
  }
  function bossBattleWin() {
    const winDialogue = [
      "CONGRATULATIONS!!!",
      "YOU BEAT THE GAME",
      "YOU DEFEATED THE KNIGHT!!!",
      "YOU DEFEATED THE GOBLINS!!!",
      "YOU'RE NOT A WIMP!!!!!"
    ];
    dispatchPrevMap();
    dispatchSignDisplay("flex");
    bossDisplay("none");
    // goblinOneVisibility( "visible");
    dispatchCombat(winDialogue, 20, null, false, "visible");
  }
  function playerAttack() {
    let ability = Math.floor(Math.random() * (3 - 1) + 1);
    enemyHP -= ability;
    newDialogue.push(`YOU ATTACK FOR ${ability}HP`);
    // return ability;
  }
  function enemyAttack() {
    let ability = Math.floor(Math.random() * (4 - 0) + 0);
    playerHP -= ability;
    newDialogue.push(`ENEMY ATTACKS YOU FOR ${ability}HP`);
    // return ability;
  }
  function playerHeal() {
    let ability = Math.floor(Math.random() * (3 - 0) + 0);
    playerHP += ability;
    if (playerHP >= 20) {
      playerHP = 20;
    }
    newDialogue.push(`YOU HEAL ${ability}HP`);
    // return ability;
  }

  function enemyHeal() {
    let ability = Math.floor(Math.random() * (3 - 0) + 0);
    enemyHP += ability;
    if (enemyHP >= enemyMaxHP) {
      enemyHP = enemyMaxHP;
    }
    newDialogue.push(`ENEMY HEALS ${ability}HP`);
    // return `ENEMY HEALS ${ability}HP`;
  }
  //   return fightingNow;
  //Need a return
  //   return true;
}
