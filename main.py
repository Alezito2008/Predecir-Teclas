from pynput import keyboard
import random, os

teclas = ''
lastKeys = []
prediction = ''

persona = 0
maquina = 0

os.system('cls')

def onRelease(k):
    global teclas
    match str(k):
        case 'Key.left':
            handlePress('L')
        case 'Key.right':
            handlePress('R')
            
def handlePress(key):
    global teclas, prediction, persona, maquina
    
    if (prediction == str(key)):
        maquina = maquina + 1
    else:
        persona = persona + 1
        
    os.system('cls')
    print(f'''
          #############
          Tus Puntos: {persona}
          #############
          Máquina: {maquina}
          #############''')
    if persona == 50 or maquina == 50:
        quit()        
    
    teclas += key
    lastKeys.append(key)
    
    
    if len(lastKeys) >= 4:
        if findNext(lastKeys) != None:
            prediction = findNext(lastKeys)
        lastKeys.pop(0)

def findNext(l):
    lastKeysStr = ''.join(l)
    if teclas.find(lastKeysStr) != -1:
        pos = teclas.find(lastKeysStr)+4
        if (pos != len(teclas)):
            return (teclas[pos])
    else:
        return random.choice(['L', 'R'])

with keyboard.Listener(on_release = onRelease) as listener:
    listener.join()
