const API_BASE = 'https://rickandmortyapi.com/api/character';
const cardsContainer = document.getElementById('cardsContainer');
const messageBox = document.getElementById('message');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const btnLoad = document.getElementById('btnLoad');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

let currentPage = 1;
let lastPage = null;
let currentQuery = '';

function setMessage(msg){
  messageBox.textContent = msg || '';
}

function createCard(character){
  const card = document.createElement('article');
  card.className = 'card';
  card.style.position = 'relative';

  const img = document.createElement('img');
  img.className = 'thumb';
  img.alt = character.name;
  img.src = character.image || 'assets/placeholder.png';
  img.loading = 'lazy';

  const body = document.createElement('div');
  body.className = 'card-body';

  const title = document.createElement('h3');
  title.textContent = character.name;

  const meta = document.createElement('div');
  meta.className = 'meta';

  const statusWrap = document.createElement('div');
  statusWrap.className = 'status-bullet';
  const bullet = document.createElement('span');
  bullet.className = 'bullet ' + (character.status === 'Alive' ? 'alive' : (character.status === 'Dead' ? 'dead' : 'unknown'));
  const statusText = document.createElement('span');
  statusText.textContent = character.status + ' • ' + character.species;
  statusWrap.appendChild(bullet);
  statusWrap.appendChild(statusText);

  const origin = document.createElement('div');
  origin.textContent = 'Origem: ' + (character.origin?.name || '—');

  meta.appendChild(statusWrap);
  meta.appendChild(origin);

  const extra = document.createElement('div');
  extra.className = 'extra';
  extra.textContent = 'Última localização: ' + (character.location?.name || '—');

  body.appendChild(title);
  body.appendChild(meta);
  body.appendChild(extra);

  const favoriteBtn = document.createElement('span');
  favoriteBtn.className = 'favorite-btn';

  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  const isFavorito = favoritos.some((fav) => fav.id === character.id);

  favoriteBtn.innerHTML = isFavorito ? '❤️' : '🤍';

  favoriteBtn.addEventListener('click', () => {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    if (favoriteBtn.innerHTML === '🤍') {
      favoriteBtn.innerHTML = '❤️';
      favoritos.push(character);
    } else {
      favoriteBtn.innerHTML = '🤍';
      favoritos = favoritos.filter((fav) => fav.id !== character.id);
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  });

  card.appendChild(favoriteBtn);
  card.appendChild(img);
  card.appendChild(body);

  return card;
}

function updatePagination(){
  pageInfo.textContent = `Página ${currentPage}` + (lastPage ? ` de ${lastPage}` : '');
  prevBtn.disabled = currentPage <= 1;
  nextBtn.disabled = lastPage && currentPage >= lastPage;
}

async function fetchCharacters(page = 1, name = '', status = ''){
  setMessage('Carregando...');
  cardsContainer.innerHTML = '';
  try {
    if (status === 'favoritos') {
      const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

      if (favoritos.length === 0) {
        setMessage('Nenhum personagem favorito encontrado.');
        return;
      }

      favoritos.forEach(character => {
        const card = createCard(character);
        cardsContainer.appendChild(card);
      });

      setMessage('');
      updatePagination();
      return;
    }

    let url = `${API_BASE}/?page=${page}`;
    if (name) url += `&name=${encodeURIComponent(name)}`;
    if (status) url += `&status=${encodeURIComponent(status)}`;

    const res = await fetch(url);
    if(!res.ok){
      if(res.status === 404){
        setMessage('Nenhum personagem encontrado para os filtros informados.');
        lastPage = 1;
        updatePagination();
        return;
      }
      throw new Error('Não foi possível carregar os dados. Status: ' + res.status);
    }

    const data = await res.json();
    lastPage = data.info?.pages || null;
    updatePagination();

    data.results.forEach(character => {
      const card = createCard(character);
      cardsContainer.appendChild(card);
    });

    setMessage('');
  } catch(err){
    console.error(err);
    setMessage('Erro ao carregar dados. Veja o console para detalhes.');
  }
}

btnLoad.addEventListener('click', () => {
  currentPage = 1;
  currentQuery = searchInput.value.trim();
  fetchCharacters(currentPage, currentQuery, statusFilter.value);
});

searchInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') btnLoad.click();
});

prevBtn.addEventListener('click', () => {
  if(currentPage > 1){
    currentPage--;
    fetchCharacters(currentPage, currentQuery, statusFilter.value);
  }
});
nextBtn.addEventListener('click', () => {
  if(!lastPage || currentPage < lastPage){
    currentPage++;
    fetchCharacters(currentPage, currentQuery, statusFilter.value);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  fetchCharacters(currentPage, '', '');
});
