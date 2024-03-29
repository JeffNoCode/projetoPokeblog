const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonShinyImage = document.querySelector('.pokemon__shiny__image');
const pokemonTypes = document.querySelector('.types')
const statNumber   = document.querySelectorAll('.status__number');
const barInner     = document.querySelectorAll('.status__bar__inner');
const stat = document.querySelector('.status');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');



let searchPokemon = 1;

const typeColors = {
  "rock":     [182, 158,  49],
  "ghost":    [112,  85, 155],
  "steel":    [183, 185, 208],
  "water":    [100, 147, 235],
  "grass":    [116, 203,  72],
  "psychic":  [251,  85, 132],
  "ice":      [154, 214, 223],
  "dark":     [117,  87,  76],
  "fairy":    [230, 158, 172],
  "normal":   [170, 166, 127],
  "fighting": [193,  34,  57],
  "flying":   [168, 145, 236],
  "poison":   [164,  62, 158],
  "ground":   [222, 193, 107],
  "bug":      [167, 183,  35],
  "fire":     [245, 125,  49],
  "electric": [249, 207,  48],
  "dragon":   [112,  55, 255]
}


const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Carregando...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonShinyImage.style.display = 'block';
    stat.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonTypes.innerHTML = ''
    data.types.forEach(t => {
      let newType = document.createElement('span');
      let color   = typeColors[t.type.name];
      newType.innerHTML = t.type.name;
      newType.classList.add('type');
      newType.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`; 
      pokemonTypes.appendChild(newType);
    });

      data.stats.forEach((s, i) => {
      statNumber[i].innerHTML = s.base_stat.toString().padStart(3, '0');
      barInner[i].style.width = `${s.base_stat*100/150}%`});

    input.value = '';
    if(data.id<650){
      pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
      pokemonShinyImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
    }
    else{
      pokemonImage.src = data['sprites']['front_default'];
      pokemonShinyImage.src = data['sprites']['front_shiny'];
    }
    searchPokemon = data.id;


  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Nada encontrado';
    pokemonNumber.innerHTML = '';
    pokemonTypes.innerHTML = '';
    pokemonShinyImage.style.display = 'none';
    stat.style.display = 'none';
    input.value = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);