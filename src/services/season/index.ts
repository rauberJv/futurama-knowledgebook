import { SeasonDTO, SeasonsResponseDTO } from "./dto";

const getAllSeasons = async (page: number = 1, size: number = 50): Promise<SeasonsResponseDTO> => {
    const response = await fetch(`https://futuramaapi.com/api/seasons?page=${page}&size=${size}`);
    const data = await response.json();
    return data;
}

const getSeasonById = async (id: string): Promise<SeasonDTO> => {
    const response = await fetch(`https://futuramaapi.com/api/seasons/${id}`);
    const data = await response.json();
    return data;
}

export { getAllSeasons, getSeasonById };