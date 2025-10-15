// knight  ou Sorcerer
// LittleMonster ou BigMoster

// Modelo de dados que os pesonagem vai ter

//Inicio Crianção de persogens

class Character {

    _life = 1; // Vou trabalhar com get e set para não deixar a vida ser menos que 0
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name;
    }

    get life() {            // Me retorna a vida 
        return this._life;
    }

    set life(newLife) {      // Verifica se a vida e menos do que 0 se não for retorna o valor da vida se for retona 0 (Controla para não ter um valor menos do que 0)
        this._life = newLife < 0 ? 0 : newLife;
    }
}
class knight extends Character {    // class Guerreiro
    constructor(name) {     // Estou recebendo um valor 
        super(name);        // Estou puxando os dados da minha class pai
        this.life = 100;    // Não preciso mudar mais se eu não mudar os dados do meu pai o valor que tem la e o que eu vou herdar(Nesse caso estou mudando por que o meu guerreiro tem suas proprio dados mais não preciso definir tudo de novo so os valor de atualização de guerreiro)
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }
}
class Sorcerer extends Character {    // class Guerreiro
    constructor(name) {     // Estou recebendo um valor 
        super(name);        // Estou puxando os dados da minha class pai
        this.life = 80;    // Não preciso mudar mais se eu não mudar os dados do meu pai o valor que tem la e o que eu vou herdar(Nesse caso estou mudando por que o meu guerreiro tem suas proprio dados mais não preciso definir tudo de novo so os valor de atualização de guerreiro)
        this.attack = 14;
        this.defense = 3;
        this.maxLife = this.life;
    }
}

class LittleMonster extends Character {
    constructor() {
        super('Little Moster'); // Definindo valor(nome) padrão para esse tipo de mostro       
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxLife = this.life;
    }
}

class BigMoster extends Character {
    constructor() {
        super('Big Moster'); // Definindo valor(nome) padrão para esse tipo de mostro       
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxLife = this.life;
    }
}

//Fim Crianção de persogens

// Inicio pegar que e os persogens e cenario

class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }
    start() {
        this.update();

        // Todo: Evento do botão de atacar
        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }
    update() {
        // fighter1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(2)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;



        // fighter2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(2)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`
    }

    doAttack(attacking, attacked) {

        // Verificando se algum lado esta morto - inicio
        if (attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage(`Atacando cachorro morto.`);
            return;
        }
        // Verificando se algum lado esta morto - Fim

        // Criando ataques ou danos aleatorios - Inicio 
        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);
        // Criando ataques ou danos aleatorios - Fim

        // Pegando o dano aleatorio e multiplicando pelo ataque do NPS - inicio
        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacking.defense * defenseFactor;
        // Pegando o dano aleatorio e multiplicando pelo ataque do NPS - Fim

        // Esse if verifica se o dano atual e maior que a defesa e o que deve fazer caso for ou não - Inicio
        if (actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`)
        } else {
            this.log.addMessage(`${attacked.name} conseguiu defender...`);
        }
        // Esse if verifica se o dano atual e maior que a defesa e o que deve fazer caso for ou não - Inicio

        this.update();
    }
}
// LOG ou mostrar na tela o que esta acontecendo
class Log {
    list = [];


    constructor(listEl) {
        this.listEl = listEl;
    }

    addMessage(msg) {
        this.list.push(msg); // Adiciona a mensagem no array
        this.render(); // Exibi a lista de mensagem 
    }
    render() {
        // Limpando a lista - Inicio
        this.listEl.innerHTML = '';
        // Limpando a lista - Fim

        // Mostrando a mensagem - Inicio
        for (let i in this.list) {
            this.listEl.innerHTML += ` <li>${this.list[i]}</li>`;
        }
        // Mostrando a mensagem - Fim
    }
}