
class Pokemon {
    constructor(nome, foto, hp, tipos, poderes) {
        this.nome = nome;
        this.foto = foto;
        this.hp = hp;
        this.tipos = tipos; // Ex: ["fogo"]
        this.poderes = poderes; // Ex: [{ nome: "Chama", poder: 50 }]
    }

    atacar(indicePoder, oponente, tiposVantagens) {
        const poder = this.poderes[indicePoder];
        const tipoAtacante = this.tipos[0]; // Usa o primeiro tipo
        const tipoOponente = oponente.tipos[0];

        let danoBase = poder.poder || 40;
        const fatorAleatorio = (Math.random() * 0.3) + 0.85;
        let dano = danoBase * fatorAleatorio;

        if (tiposVantagens[tipoAtacante]?.forteContra === tipoOponente) {
            dano *= 1.5;
        } else if (tiposVantagens[tipoAtacante]?.fracoContra === tipoOponente) {
            dano *= 0.5;
        }

        oponente.receberDano(dano);
    }

    receberDano(dano) {
        this.hp -= dano;
        if (this.hp < 0) this.hp = 0;
        console.log(`${this.nome} recebeu ${dano.toFixed(2)} de dano. HP restante: ${this.hp}`);
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
const traducaoTipos = {
    normal: "Normal",
    fire: "Fogo",
    water: "Água",
    electric: "Elétrico",
    grass: "Planta",
    ice: "Gelo",
    fighting: "Lutador",
    poison: "Veneno",
    ground: "Terrestre",
    flying: "Voador",
    psychic: "Psíquico",
    bug: "Inseto",
    rock: "Pedra",
    ghost: "Fantasma",
    dark: "Noturno",
    dragon: "Dragão",
    steel: "Metálico",
    fairy: "Fada"
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

        const tipos = data.types.map(typeInfo => {
            const tiposIngles = typeInfo.type.name;
            return traducaoTipos[tiposIngles] || tiposIngles;
        }); // Tipos de Pokémon (ex: 'fogo', 'agua')

        const hp = 100; // HP

        // Pegar 4 poderes aleatórios
        const poderes = data.moves
            .slice(0, 4) // primeiros 4 ataques (ou você pode sortear aleatórios)
            .map(move => ({
                nome: move.move.name,
                poder: Math.floor(Math.random() * 40) + 30, // poder aleatório entre 30 e 70
            }));


        /*
                // Preenchendo os dados no HTML Player
                // const teste = document.getElementsByClassName('imagemPokemonDesafiante');
                document.getElementsByClassName('nomedoPokemon')[0].textContent = nome; // Enviando o nome para o html
                document.getElementsByClassName('imagemPokemonDesafiante')[0].src = foto; // Enviando a foto para o html
                document.getElementsByClassName('imagemPokemonDesafiante')[0].alt = nome; // // Enviando o nome da foto para o html
                document.querySelector('#nomePlayer .corVida').style.width = `${hp}%`;
                let hpEl = document.getElementById('pokemon-types').textContent = `Tipos: ${tipos.join(', ')}`;
        
                // Preenchendo os dados no HTML Desafiante
                document.getElementsByClassName('nomedoPokemonDesafiante')[0].textContent = nome; // Enviando o nome para o html
                document.getElementsByClassName('imagemPokemonDesafiante2')[0].src = foto; // Enviando a foto para o html
                document.getElementsByClassName('imagemPokemonDesafiante2')[0].alt = nome; // // Enviando o nome da foto para o html
                document.querySelector('#nomedesafiante .vida .corVida').style.width = `${hp}%`;
        
        
                //document.getElementById('pokemon-moves').textContent = `Poderes: ${poderes.map(p => p.nome).join(', ')}`;
        
                console.log(hpEl);

                */

        const pokemon = new Pokemon(nome, foto, hp, tipos, poderes);
        return pokemon;
    } catch (error) {
        console.log('Erro ao buscar Pokémon:', error);
    }
}
obterPokemon();



// Botoes poderes
document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('click', () => {
        skill.classList.add('active');
        setTimeout(() => skill.classList.remove('active'), 3000);
    });
});
(async () => {
    // Busca dois pokémons aleatórios
    const pokemon1 = await obterPokemon(6);  // Charizard
    const pokemon2 = await obterPokemon(3);  // Venusaur

    console.log(pokemon1);
    console.log(pokemon2);

    // pokemon1.atacar(0, pokemon2, tiposVantagens);
})();

// Estudar daqui para baixo

// Função auxiliar para preencher os dados de UM Pokémon no HTML
function preencherHtmlPokemon(pokemon, prefixo) {
    // 1. Preenche o NOME e o HP
    document.querySelector(`.${prefixo} .nomedoPokemon`).textContent = pokemon.nome;
    document.querySelector(`#${prefixo} .corVida`).style.width = `${pokemon.hp}%`;
    document.querySelector(`#${prefixo} .hpTotal`).textContent = pokemon.hp; // Se você tiver um elemento para mostrar o HP total

    // 2. Preenche a IMAGEM
    document.querySelector(`.${prefixo} .imagemPokemon`)[0].src = pokemon.foto;
    document.querySelector(`.${prefixo} .imagemPokemon`)[0].alt = pokemon.nome;

    // 3. Preenche os TIPOS (usando o array de tradução que salvamos)
    document.querySelector(`#${prefixo} .pokemon-types`).textContent = `Tipos: ${pokemon.tiposParaExibicao.join(', ')}`;

    // 4. Preenche os BOTÕES DE PODER (Apenas para o Player)
    if (prefixo === 'player') {
        const skillsContainer = document.querySelector('.skills');
        skillsContainer.innerHTML = ''; // Limpa os botões anteriores

        pokemon.poderes.forEach((poder, index) => {
            const button = document.createElement('button');
            button.classList.add('skill');
            button.textContent = poder.nome;
            button.dataset.index = index; // Salva o índice do poder para usar no ataque
            skillsContainer.appendChild(button);
        });

        // RE-ADICIONA os listeners aos NOVOS botões de poder
        document.querySelectorAll('.skill').forEach(skill => {
            skill.addEventListener('click', () => {
                skill.classList.add('active');
                setTimeout(() => skill.classList.remove('active'), 3000);
            });
        });
    }
}


// Função principal para iniciar o jogo
async function iniciarBatalha() {
    // 1. Busca os dois Pokémon
    const pokemonPlayer = await obterPokemon();
    const pokemonDesafiante = await obterPokemon();

    if (!pokemonPlayer || !pokemonDesafiante) {
        console.error("Não foi possível carregar um ou ambos os Pokémon.");
        return;
    }

    console.log("Pokémon do Jogador:", pokemonPlayer);
    console.log("Pokémon Desafiante:", pokemonDesafiante);

    // 2. Preenche o HTML separadamente
    // **Atenção:** Os seletores HTML devem ser ajustados para usar estes prefixos.
    // Ex: Use `.player .nomedoPokemon` e `.desafiante .nomedoPokemon`
    preencherHtmlPokemon(pokemonPlayer, 'player'); // Assumindo que você usa 'player' como prefixo/classe
    preencherHtmlPokemon(pokemonDesafiante, 'desafiante'); // Assumindo que você usa 'desafiante' como prefixo/classe


    // 3. Adiciona a lógica de ataque (Exemplo de como o Player ataca)
    document.querySelectorAll('.skill').forEach(button => {
        button.addEventListener('click', (event) => {
            const indicePoder = parseInt(event.target.dataset.index);

            // Player ataca o Desafiante
            pokemonPlayer.atacar(indicePoder, pokemonDesafiante, tiposVantagens);

            // Lógica de turno (Desafiante ataca de volta)
            if (pokemonDesafiante.estaVivo()) {
                // Desafiante escolhe um poder aleatório (índice 0 a 3)
                const indicePoderDesafiante = Math.floor(Math.random() * pokemonDesafiante.poderes.length);
                pokemonDesafiante.atacar(indicePoderDesafiante, pokemonPlayer, tiposVantagens);
            }

            // Atualizar as barras de vida no HTML após o ataque
            // É crucial que estas barras usem o ID ou classe correta.
            document.querySelector('#player .corVida').style.width = `${pokemonPlayer.hp}%`;
            document.querySelector('#desafiante .corVida').style.width = `${pokemonDesafiante.hp}%`;

            // Lógica de vitória/derrota (Opcional)
            if (!pokemonPlayer.estaVivo()) {
                alert(`${pokemonPlayer.nome} foi derrotado! Você perdeu!`);
            } else if (!pokemonDesafiante.estaVivo()) {
                alert(`${pokemonDesafiante.nome} foi derrotado! Você venceu!`);
            }
        });
    });
}

// Inicia o jogo
iniciarBatalha();
