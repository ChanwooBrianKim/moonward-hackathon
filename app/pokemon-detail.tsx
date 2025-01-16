'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetail, PokemonDetailData } from './api/pokemon';

interface PokemonDetailProps {
  name: string;
  onClose: () => void;
}

export default function PokemonDetail({ name, onClose }: PokemonDetailProps) {
  const { data, isLoading } = useQuery<PokemonDetailData>({
    queryKey: ['pokemonDetail', name],
    queryFn: () => fetchPokemonDetail(name),
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Unable to load Pokémon details.</p>;

  const getGradient = (types: Array<{ type: { name: string } }> | undefined) => {
    if (!types || types.length === 0) return '#F0F0F0';

    const typeColors: Record<string, { start: string; end: string }> = {
      normal: { start: '#A8A878', end: '#C9CBAA' },
      fire: { start: '#FF4500', end: '#F06E36' },
      water: { start: '#86ACFF', end: '#5374EB' },
      electric: { start: '#FFEC83', end: '#F2C20C' },
      grass: { start: '#9FD88F', end: '#66B948' },
      ice: { start: '#B8F3F0', end: '#7FCACA' },
      fighting: { start: '#DF9B93', end: '#AD2C24' },
      poison: { start: '#D19ED2', end: '#933C93' },
      ground: { start: '#F1D9A7', end: '#DFA548' },
      flying: { start: '#E0CCFF', end: '#9461F5' },
      psychic: { start: '#FFB6CC', end: '#F343D7' },
      bug: { start: '#C4D76D', end: '#85A915' },
      rock: { start: '#D3C97A', end: '#A58531' },
      ghost: { start: '#ABADD1', end: '#5E5B77' },
      dragon: { start: '#C9A5FF', end: '#4E81B4' },
      dark: { start: '#BA3DA9', end: '#573F3A' },
      steel: { start: '#E1E1E5', end: '#B8B8E9' },
      fairy: { start: '#FAC3DC', end: '#9D567D' },
    };

    const colors = types.map((type) => typeColors[type.type.name]).filter(Boolean);

    return `linear-gradient(45deg, ${colors.map((color) => `${color.start}, ${color.end}`).join(', ')})`;
  };

  return (
    <div
      style={{
        border: '1px solid black',
        padding: '20px',
        background: getGradient(data.types),
        color: 'white',
        borderRadius: '8px',
      }}
    >
      <button onClick={onClose} style={{ marginBottom: '10px' }}>
        Close
      </button>
      <h2>{data.name}</h2>
      <img src={data.sprites.front_default} alt={data.name} />
      <p>Height: {data.height}</p>
      <p>Weight: {data.weight}</p>
    </div>
  );
}
