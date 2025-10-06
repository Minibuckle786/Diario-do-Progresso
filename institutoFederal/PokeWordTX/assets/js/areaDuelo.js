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

    // Atacar() = gera uma valor aleatorio de poder 
    atacar() {
        // Atacar com um poder aleatório
        const poderAleatorio = this.poderes[Math.floor(Math.random() * this.poderes.length)];
        return poderAleatorio;
    }

    // Recebo o dano como parametro para dar sequencia nos processos o if não esta com o {} para poder mostrar o console independente do resultado se positivo ou negativo
    receberDano(dano) {
        this.hp -= dano;
        if (this.hp < 0) this.hp = 0;
        console.log(`${this.nome} recebeu ${dano} de dano. HP restante: ${this.hp}`);
    }

    estaVivo() {
        return this.hp > 0;
    }

}

// Objeto de vantagens entre tipos (externo)
const tiposVantagens = {
    fire: { grass: 2, water: 0.5, fire: 1, electric: 1 },
    water: { fire: 2, grass: 0.5, water: 1, electric: 1 },
    grass: { water: 2, fire: 0.5, grass: 1, electric: 1 },
    electric: { water: 2, ground: 0, electric: 1, fire: 1 },
    ground: { electric: 2, grass: 0.5, flying: 0, fire: 2 },
    rock: { fire: 2, fighting: 0.5, flying: 2, steel: 0.5 },
    flying: { grass: 2, rock: 0.5, electric: 0.5, fighting: 2 },
    fighting: { normal: 2, ghost: 0, rock: 2, psychic: 0.5 },
    psychic: { fighting: 2, poison: 2, dark: 0, psychic: 0.5 },
    dark: { psychic: 2, ghost: 2, fairy: 0.5, dark: 0.5 },
    ghost: { psychic: 2, ghost: 2, normal: 0, dark: 0.5 },
    dragon: { dragon: 2, steel: 0.5, fairy: 0, fire: 1 },
    fairy: { fighting: 2, dragon: 2, fire: 0.5, poison: 0.5 },
    ice: { grass: 2, fire: 0.5, ground: 2, dragon: 2 },
    steel: { rock: 2, water: 0.5, ice: 2, fairy: 2 },
    bug: { psychic: 2, fire: 0.5, grass: 2, fighting: 0.5 },
    poison: { fairy: 2, grass: 2, steel: 0, rock: 0.5 },
    normal: { ghost: 0, rock: 0.5, steel: 0.5, electric: 1 }
};


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
        // const teste = document.getElementsByClassName('imagemPokemonDesafiante');
        document.getElementsByClassName('nomedoPokemon')[0].textContent = nome; // Enviando o nome para o html
        document.getElementsByClassName('imagemPokemonDesafiante')[0].src = foto; // Enviando a foto para o html
        document.getElementsByClassName('imagemPokemonDesafiante')[0].alt = nome; // // Enviando o nome da foto para o html
        const hpEl = document.querySelector('#nomePlayer .corVida');
        /*
        
        
        
        document.getElementById('pokemon-types').textContent = `Tipos: ${tipos}`;
        document.getElementById('pokemon-moves').textContent = `Poderes: ${poderes.map(p => p.nome).join(', ')}`;
        */
        console.log(hpEl);
    } catch (error) {
        console.log('Erro ao buscar Pokémon:', error);
    }
}
obterPokemon();
