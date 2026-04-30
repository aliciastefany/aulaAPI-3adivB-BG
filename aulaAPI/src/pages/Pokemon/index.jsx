import { useState } from "react"
import "./style.css"

const pokemonList =[
    {id:1, nome:'Bulbassauro'},
    {id:4, nome:'Charmander'},
    {id:6, nome:'Charizard'},
    {id:7, nome:'Squirtle'},
    {id:152, nome:'Chikorita'}
]

function Pokemon(){
    const [pokemonGlobal, setPokemonGlobal] = useState(null)

    const getPokemonData = (idPokemon)=>{
        const uri = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
        
        fetch(uri)
            .then(res=>res.json())
                .then(json=>{
                    const pokemonFetch = {
                        nome: json.name,
                        peso: json.weight,
                        vida: json.stats[0].base_stat,
                        imagem: json.sprites.other['official-artwork'].front_default
                    }
                    setPokemonGlobal(pokemonFetch)
                    console.log(pokemonFetch)
                })
                .catch(()=>alert("Não foi possível acessar os dados do Pokémon"))
    }


    return(
        <div className="container">
            <div className="header">
                <h1>Lista de pokémon</h1>
                <p>Faça a sua escolha!</p>
            </div>

            {pokemonGlobal &&(
                <div className="pokemon-info">
                    <h2>Nome: {pokemonGlobal.nome}</h2>
                    <p>Peso: {pokemonGlobal.peso}</p>
                    <p>Vida: {pokemonGlobal.vida}</p>
                    <img
                        src={pokemonGlobal.imagem}
                        alt={pokemonGlobal.nome}
                    />
                </div>
            )}

            {pokemonList.map((item)=>(
                <div className="card" key={item.id}>
                    <p>{item.nome}</p>
                    <button onClick={()=>getPokemonData(item.id)}>Saiba mais</button>
                </div>
            ))}

        </div>
    )
}

export default Pokemon