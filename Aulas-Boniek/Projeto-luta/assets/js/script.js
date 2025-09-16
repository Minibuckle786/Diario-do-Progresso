let log = new Log(document.querySelector('.log'));



// Criando lutadores e mostro e eventos - inicio

let char = new Sorcerer("Emerson");
let monster = new LittleMonster();

const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
);

// Criando lutadores e mostro e eventos - Fim

stage.start();