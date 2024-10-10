const pkmList = document.getElementById('pkmList')
const loadMore = document.getElementById('loadMore')
const limit = 20
let offset = 0
const maxRecs = 1302

function loadPkmItens(offset, limit){          
    pokeApi.getPokemons(offset, limit).then((pokemons=[]) => {
        const newHtml = pokemons.map((pokemon)=>`
            <li class="pokemon ${pokemon.type}"> 
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) =>`<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.image}" 
                        alt="${pokemon.name}">
                </div>
            </li>
        `).join('')
        pkmList.innerHTML += newHtml
    })
}
loadPkmItens(offset, limit)

loadMore.addEventListener('click',()=>{
    offset += limit
    const qtdRec = offset+limit
    if (qtdRec >= maxRecs) {
        const newLimit = maxRecs-offset
        loadPkmItens(offset, newLimit)
        loadMore.parentElement.removeChild(loadMore)
    }else{
    loadPkmItens(offset, limit)
    }
})