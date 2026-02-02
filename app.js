function increaseValue(input) {
    let el = document.getElementById(input);
    if (el.value !== el.max) {
        el.value++;
    }
}

function decreaseValue(input) {
    let el = document.getElementById(input);
    if (el.value !== el.min) {
        el.value--;
    }
}

function roll2d6() {
    let roll1 = parseInt(Math.random() * 6) + 1;
    let roll2 = parseInt(Math.random() * 6) + 1;

    return [roll1, roll2];
}

function dealDamage(id, value) {
    let healthNode = document.getElementById(id);
    const currVal = parseInt(healthNode.value);
    const newVal = currVal - value;
    healthNode.value = newVal < 0 ? 0 : newVal;
}

function checkDead(id) {
    const healthVal = parseInt(document.getElementById(id).value);
    return healthVal === 0;
}

function doBattle() {
    const name = document.getElementById("name").value;
    const battle = parseInt(document.getElementById("battle").value);
    const enemyName = document.getElementById("enemy-name").value;
    const enemyBattle = parseInt(document.getElementById("enemy-battle").value);

    let log = document.getElementById("log");

    // Your turn
    let [roll1, roll2] = roll2d6();
    let para = document.createElement("p");
    let text = document.createTextNode("");
    if (roll1 === roll2 && roll1 !== 1) {
        // Crit!
        text.nodeValue = name + " forårsagede kritisk skade med to " + roll1 + "'ere!";
        dealDamage("enemy-health", 4)
    } else if (roll1 + roll2 <= battle) {
        // Hit!
        text.nodeValue = name + " forårsagede almindelig skade med et slag på " + (roll1 + roll2) + ".";
        dealDamage("enemy-health", 2)
    } else {
        // Miss ...
        text.nodeValue = name + " forårsagede ingen skade med et slag på " + (roll1 + roll2) + ".";
    }
    para.appendChild(text);
    log.appendChild(para);

    if (checkDead("enemy-health")) {
        let deadPara = document.createElement("p");
        let deadText = document.createTextNode(name + " har besejret " + enemyName + "!");
        deadPara.appendChild(deadText);
        log.appendChild(deadPara);
        return
    }

    // Enemy turn
    let [eRoll1, eRoll2] = roll2d6();
    let ePara = document.createElement("p");
    let eText = document.createTextNode("");
    if (eRoll1 + eRoll2 <= enemyBattle) {
        // Hit!
        eText.nodeValue = enemyName + " forårsagede almindelig skade med et slag på " + (eRoll1 + eRoll2) + ".";
        dealDamage("health", 2)
    } else {
        // Miss ...
        eText.nodeValue = enemyName + " forårsagede ingen skade med et slag på " + (eRoll1 + eRoll2) + ".";
    }
    ePara.appendChild(eText);
    log.appendChild(ePara);

    if (checkDead("health")) {
        let deadPara = document.createElement("p");
        let deadText = document.createTextNode(name + " er DØD!")
        deadPara.appendChild(deadText);
        log.appendChild(deadPara);
        return
    }
}