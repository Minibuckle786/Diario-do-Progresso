async function mostrarGolpesDoPokemon(pokemonNome) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNome.toLowerCase()}`);
    const data = await res.json();

    // Pegamos os primeiros 4 golpes disponíveis com power (se quiser mudar, aumente aqui)
    const golpesComDetalhes = await Promise.all(
        data.moves.slice(0, 12).map(async (move) => {
            const resDetalhe = await fetch(move.move.url);
            const detalhe = await resDetalhe.json();
            return {
                nome: move.move.name,
                power: detalhe.power || 0,
                tipo: detalhe.type.name
            };
        })
    );

    // Filtra golpes com power válido e pega os 4 mais fracos
    const golpes = golpesComDetalhes
        .filter(g => g.power > 0)
        .sort((a, b) => a.power - b.power)
        .slice(0, 4);

    // Criar botões
    const container = document.getElementById('ataquesDoPokemon');
    container.innerHTML = ''; // Limpa antes
    golpes.forEach(golpe => {
        const btn = document.createElement('button');
        btn.className = 'botaodeAtaque';
        btn.innerText = `${golpe.nome} (${golpe.power})`;
        btn.onclick = () => {
            registrarNaTela(`${pokemonNome} usou ${golpe.nome}!`);
            // Aqui você pode aplicar dano, animar, etc.
        };
        container.appendChild(btn);
    });
}

// Função para mostrar ações na tela
function registrarNaTela(mensagem) {
    const log = document.querySelector('.TelaInformativa');
    const item = document.createElement('li');
    item.innerText = mensagem;
    log.appendChild(item);
}
