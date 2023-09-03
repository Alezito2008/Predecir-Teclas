var teclas = ''
var lastKeys = []
var prediction = ''

var persona = 0
var maquina = 0

var maxPoints = 50
var gameOver = false

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

// Detectar teclas
document.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            handlePress('R')
            break
        case 'ArrowLeft':
            handlePress('L')
            break
    }
})

function handlePress(key) {
    // Sumar los puntos
    prediction === key ? maquina++ : persona++
    if (!gameOver) { updatePoints() }

    // Detectar ganador
    persona === maxPoints || maquina === maxPoints ? gameOver = true : void(0)

    teclas += key
    lastKeys.push(key)

    if (lastKeys.length >= 4) {
        if (findNext(lastKeys) != null) {
            prediction = findNext(lastKeys)
        }
        lastKeys.shift()
    } else {
        prediction = ['L', 'R'].random()
    }

    if (gameOver) {
        document.querySelector('div.puntaje').classList.add('ganador')
        document.querySelector('div.puntaje>button').setAttribute('style', '')
        if (persona === maxPoints) {
            document.querySelector('div.puntaje>h2').textContent = 'Ganó persona'
        } else {
            document.querySelector('div.puntaje>h2').textContent = 'Ganó máquina'
        }
    }
}

function findNext(l) {
    let lastKeysStr = l.toString().replaceAll(',', '')
    if (teclas.indexOf(lastKeysStr != -1)) {
        let pos = teclas.indexOf(lastKeysStr)+4
        if (pos != teclas.length) {
            return teclas[pos]
        }
    } else {
        return ['L', 'R'].random()
    }
}

function updatePoints() {
    document.querySelector('div.persona').textContent = `Persona: ${persona}`
    document.querySelector('div.maquina').textContent = `Máquina: ${maquina}`
}
