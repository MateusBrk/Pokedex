// Seleciona elementos HTML para manipulação
const pokemonName = document.querySelector('.pokemon__name'); // Nome do Pokémon
const pokemonNumber = document.querySelector('.pokemon__number'); // Número do Pokémon
const pokemonImage = document.querySelector('.pokemon__image'); // Imagem do Pokémon

const form = document.querySelector('.form'); // Formulário de busca
const input = document.querySelector('.input__search'); // Campo de entrada para nome ou número
const buttonPrev = document.querySelector('.btn-prev'); // Botão "Anterior"
const buttonNext = document.querySelector('.btn-next'); // Botão "Próximo"

let searchPokemon = 1; // Variável que armazena o número do Pokémon atual para a busca

// Função assíncrona para buscar dados do Pokémon na API
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  // Verifica se a resposta foi bem-sucedida (status 200)
  if (APIResponse.status === 200) {
    const data = await APIResponse.json(); // Converte a resposta para JSON
    return data; // Retorna os dados do Pokémon
  }
}

// Função para renderizar os dados do Pokémon na interface
const renderPokemon = async (pokemon) => {
  // Exibe "Loading..." enquanto busca os dados
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon); // Chama a função fetchPokemon para obter os dados

  // Se os dados do Pokémon foram encontrados
  if (data) {
    pokemonImage.style.display = 'block'; // Exibe a imagem
    pokemonName.innerHTML = data.name; // Mostra o nome do Pokémon
    pokemonNumber.innerHTML = data.id; // Mostra o número do Pokémon
    // Define a imagem animada do Pokémon (versão Black-White, geração V)
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = ''; // Limpa o campo de busca
    searchPokemon = data.id; // Atualiza o Pokémon atual na variável
  } else {
    // Se não encontrou o Pokémon, exibe mensagem de erro
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

// Adiciona evento de "submit" ao formulário de busca
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita o recarregamento da página ao enviar o formulário
  renderPokemon(input.value.toLowerCase()); // Renderiza o Pokémon com o valor digitado no input
});

// Evento de clique para o botão "Anterior"
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) { // Garante que o número do Pokémon não seja menor que 1
    searchPokemon -= 1; // Decrementa o número do Pokémon
    renderPokemon(searchPokemon); // Renderiza o Pokémon anterior
  }
});

// Evento de clique para o botão "Próximo"
buttonNext.addEventListener('click', () => {
  searchPokemon += 1; // Incrementa o número do Pokémon
  renderPokemon(searchPokemon); // Renderiza o próximo Pokémon
});

// Renderiza o primeiro Pokémon (inicial) ao carregar a página
renderPokemon(searchPokemon);
