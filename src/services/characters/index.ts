import { CharacterDTO, CharacterResponseDTO, getAllCharactersParams, Status } from './dto';

const getAllCharacters = async (
  params: getAllCharactersParams = {
    page: 1,
    size: 12,
    status: Status.ALIVE,
    orderBy: 'id',
    orderByDirection: 'asc'
  }
): Promise<CharacterResponseDTO> => {
  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append('page', params.page.toString());
  if (params.size) queryParams.append('size', params.size.toString());
  if (params.gender) queryParams.append('gender', params.gender);
  if (params.status) queryParams.append('status', params.status);
  if (params.species) queryParams.append('species', params.species);
  if (params.orderBy) queryParams.append('orderBy', params.orderBy);
  if (params.orderByDirection) queryParams.append('orderByDirection', params.orderByDirection);
  if (params.query) queryParams.append('query', params.query);

  const response = await fetch(`https://futuramaapi.com/api/characters?${queryParams.toString()}`);
  const data = await response.json();
  return data;
};

const getCharacterById = async (id: string): Promise<CharacterDTO> => {
  const response = await fetch(`https://futuramaapi.com/api/characters/${id}`);
  const data = await response.json();
  return data;
};

export { getAllCharacters, getCharacterById };
