import axios from 'axios';

export interface PokemonDetailData {
    name: string;
    sprites: { front_default: string };
    height: number;
    weight: number;
    types: Array<{ type: { name: string } }>;
}

export const fetchPokemonList = async (): Promise<{ name: string; url: string }[]> => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
    if (!response.ok) {
      console.error('Error fetching Pokémon list:', response.status, response.statusText);
      throw new Error('Failed to fetch Pokémon list');
    }
    const data = await response.json();
    console.log('Fetched Pokémon list:', data);
    return data.results;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const fetchPokemonDetail = async (name: string) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
};