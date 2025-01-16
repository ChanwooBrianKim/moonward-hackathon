'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList } from './api/pokemon';
import PokemonDetail from './pokemon-detail';

export default function HomePage() {
  const { data, isLoading, isError } = useQuery<{ name: string; url: string }[]>({
    queryKey: ['fetchPokemonList'],
    queryFn: fetchPokemonList,
  });

  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading Pokémon data.</p>;
  if (!data || data.length === 0) return <p>No Pokémon found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pokedex</h1>
      <ul className="pokemon-list">
        {data.map((pokemon) => (
          <li
            key={pokemon.name}
            onClick={() => setSelectedPokemon(pokemon.name)}
            className="pokemon-card cursor-pointer"
          >
            {pokemon.name}
          </li>
        ))}
      </ul>

      {selectedPokemon && (
        <PokemonDetail
          name={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
}
