async function informacoesPokemon() {
    // 1. Faz a requisição para obter os dados do Pokémon (ID 1)
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/1`);

    // 2. Verifica se a requisição foi bem-sucedida
    if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.status} ${res.statusText}`);
    }

    // 3. Converte a resposta para JSON
    const data = await res.json();

    // 4. Acessa a lista de movimentos (moves) a partir do objeto 'data'
    const moves = data.moves;

    console.log(data);
}