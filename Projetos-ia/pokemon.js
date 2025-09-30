// obterPokemonAleatorio = inicio

/*
Explicação das Funções:

obterPokemonAleatorio(): Pega um Pokémon aleatório a partir de um ID gerado aleatoriamente e retorna as informações desse Pokémon (como tipo, stats, etc.).

tiposVantagens: Define como o tipo de um Pokémon interage com o tipo do adversário. A tabela de vantagens pode ser expandida conforme necessário.

calcularDano(): Calcula o dano baseado no ataque do Pokémon, na defesa do adversário e nas vantagens de tipo.

batalha(): Simula uma batalha entre dois Pokémons. Cada Pokémon ataca em turnos até que o HP de um deles chegue a 0. O primeiro a zerar o HP perde.

1. Obter Pokémon Aleatórios da PokéAPI

Vamos usar a fetch para obter dois Pokémon aleatórios da PokéAPI. Para isso, vamos fazer uma função que busca dados sobre Pokémon usando um ID aleatório.



*/

async function obterPokemonAleatorio() {
    const id = Math.floor(Math.random() * 1000) + 1; // ID aleatório entre 1 e 1000
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const pokemon = await resposta.json();
    return pokemon;
}

// obterPokemonAleatorio = Fim

/*

2. Vantagens e Desvantagens de Tipos (Tabela de Tipos)

Em seguida, vamos criar uma tabela de vantagens e desvantagens entre os tipos. No nosso caso, vamos definir uma tabela simples.

*/

const tiposVantagens = {
    "fire": { "grass": 2, "water": 0.5, "fire": 1, "electric": 1 },
    "water": { "fire": 2, "grass": 0.5, "water": 1, "electric": 1 },
    "grass": { "water": 2, "fire": 0.5, "grass": 1, "electric": 1 },
    "electric": { "water": 2, "ground": 0, "electric": 1, "fire": 1 }
    // Adicione mais tipos conforme necessário
};

/*

3. Estrutura de Cálculo de Dano

Agora, vamos calcular o dano, levando em consideração o tipo e as estatísticas de cada Pokémon.

*/

function calcularDano(atacante, defensor, tipoAtacante, tipoDefensor) {
    const multiplicadorTipo = tiposVantagens[tipoAtacante]?.[tipoDefensor] || 1;
    const dano = atacante.stats.find(stat => stat.stat.name === 'attack').base_stat * multiplicadorTipo -
        defensor.stats.find(stat => stat.stat.name === 'defense').base_stat;
    return Math.max(dano, 0); // Não pode ser dano negativo
}

/*

4. Batalha entre os Pokémon

Agora, vamos criar uma função que simula a batalha entre os dois Pokémon.

*/

async function batalha() {
    const pokemon1 = await obterPokemonAleatorio();
    const pokemon2 = await obterPokemonAleatorio();

    console.log(`Pokémon 1: ${pokemon1.name}`);
    console.log(`Pokémon 2: ${pokemon2.name}`);

    let hp1 = pokemon1.stats.find(stat => stat.stat.name === 'hp').base_stat;
    let hp2 = pokemon2.stats.find(stat => stat.stat.name === 'hp').base_stat;

    let tipo1 = pokemon1.types[0].type.name; // Pegando o primeiro tipo
    let tipo2 = pokemon2.types[0].type.name;

    while (hp1 > 0 && hp2 > 0) {
        // Pokémon 1 ataca Pokémon 2
        let dano1 = calcularDano(pokemon1, pokemon2, tipo1, tipo2);
        hp2 -= dano1;
        console.log(`${pokemon1.name} atacou! Causou ${dano1} de dano. HP do ${pokemon2.name}: ${hp2}`);

        if (hp2 <= 0) {
            console.log(`${pokemon1.name} venceu!`);
            break;
        }

        // Pokémon 2 ataca Pokémon 1
        let dano2 = calcularDano(pokemon2, pokemon1, tipo2, tipo1);
        hp1 -= dano2;
        console.log(`${pokemon2.name} atacou! Causou ${dano2} de dano. HP do ${pokemon1.name}: ${hp1}`);

        if (hp1 <= 0) {
            console.log(`${pokemon2.name} venceu!`);
            break;
        }
    }
}

/*

5. Executar o Jogo

Agora, podemos executar o jogo chamando a função batalha().

*/

batalha();

/*

Explicação das Funções:

obterPokemonAleatorio(): Pega um Pokémon aleatório a partir de um ID gerado aleatoriamente e retorna as informações desse Pokémon (como tipo, stats, etc.).

tiposVantagens: Define como o tipo de um Pokémon interage com o tipo do adversário. A tabela de vantagens pode ser expandida conforme necessário.

calcularDano(): Calcula o dano baseado no ataque do Pokémon, na defesa do adversário e nas vantagens de tipo.

batalha(): Simula uma batalha entre dois Pokémons. Cada Pokémon ataca em turnos até que o HP de um deles chegue a 0. O primeiro a zerar o HP perde.

Como Rodar Esse Código

Em um Navegador: Você pode criar um arquivo HTML simples e incluir esse código JavaScript dentro de uma tag <script>. Aqui está um exemplo de HTML básico:

<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pokémon Battle</title>
</head>
<body>
  <h1>Batalha Pokémon!</h1>
  <button onclick="batalha()">Iniciar Batalha</button>
  <script src="pokemon.js"></script>
</body>
</html>


Em Node.js: Se você quiser rodar isso no Node.js, você pode usar o módulo node-fetch para realizar as requisições HTTP. Aqui está um exemplo de como fazer isso no Node.js:

npm install node-fetch


E no código:

const fetch = require('node-fetch');

Melhorias Possíveis:

Adicionar mais tipos: Você pode expandir a tabela de vantagens com mais tipos de Pokémon.

Exibir informações dos Pokémon: Ao invés de apenas imprimir no console, você pode mostrar o nome, tipo e HP dos Pokémons na interface.

Movimentos Especiais: Você pode adicionar movimentos com efeitos especiais (como paralisação, envenenamento, etc.).

Interface Gráfica: Usar algo como HTML e CSS para tornar a batalha visualmente mais interessante.

Isso te ajuda a dar os primeiros passos no desenvolvimento do jogo? Se você quiser, posso te ajudar a refinar mais detalhes ou adicionar novas funcionalidades!

*/
