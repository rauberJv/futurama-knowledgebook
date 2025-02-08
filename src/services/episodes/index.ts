import { EpisodeDTO, EpisodesResponseDTO } from "./dto";

const getAllEpisodes = async (page: number = 1, size: number = 50): Promise<EpisodesResponseDTO> => {
    const response = await fetch(`https://futuramaapi.com/api/episodes?page=${page}&size=${size}`);
    const data = await response.json();
    return data;
}

const getEpisodeById = async (id: string): Promise<EpisodeDTO> => {
    const response = await fetch(`https://futuramaapi.com/api/episodes/${id}`);
    const data = await response.json();
    return data;
}

export { getAllEpisodes, getEpisodeById };