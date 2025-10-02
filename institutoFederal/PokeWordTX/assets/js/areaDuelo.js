// Classe Pokémon para armazenar as propriedades do Pokémon
class Pokemon {
    constructor(nome, foto, animacao, hp, tipos, poderes) {
        this.nome = nome;
        this.foto = foto;
        this.animacao = animacao;
        this.hp = hp;
        this.tipos = tipos;
        this.poderes = poderes; // Um array de poderes
    }

    atacar() {
        // Atacar com um poder aleatório
        const poderAleatorio = this.poderes[Math.floor(Math.random() * this.poderes.length)];
        return poderAleatorio;
    }

    receberDano(dano) {
        this.hp -= dano;
        if (this.hp < 0) this.hp = 0;
        console.log(`${this.nome} recebeu ${dano} de dano. HP restante: ${this.hp}`);
    }

    estaVivo() {
        return this.hp > 0;
    }
}

// Função para buscar dados da API Pokémon

async function obterPokemon() {
    try {
        // Fazendo a requisição para a API Pokémon
        const id = Math.floor(Math.random() * 1000) + 1;
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await resposta.json();

        // Extrair os dados relevantes
        const nome = data.name;
        const foto = data.sprites.front_default; // Foto do Pokémon
        const tipos = data.types.map(typeInfo => typeInfo.type.name); // Tipos de Pokémon (ex: 'fogo', 'agua')
        const hp = 100; // Você pode definir um HP inicial fixo ou puxar da API
        const poderes = data.moves.map(move => ({ nome: move.move.name, dano: Math.floor(Math.random() * 20) + 10, tipo: 'normal' })); // Poderes do Pokémon

        // Preenchendo os dados no HTML
        document.getElementsByClassName('nomedoPokemon').textContent = nome;
        document.getElementsByClassName('imagemPokemonDesafiante')[0].src = foto;
        const hpEl = document.querySelector('#nomePlayer .corVida');
        document.getElementById('pokemon-types').textContent = `Tipos: ${tipos}`;
        document.getElementById('pokemon-moves').textContent = `Poderes: ${poderes.map(p => p.nome).join(', ')}`;
    } catch (error) {
        console.log('Erro ao buscar Pokémon:', error);
    }
}
obterPokemon();
