interface SeasonEpisodeDTO {
    id: string;
    name: string;
    number: number;
    productionCode: string;
}

interface SeasonDTO {
    id: string;
    episodes: SeasonEpisodeDTO[];
}

interface SeasonsResponseDTO {
    items: SeasonDTO[];
    page: number;
    pages: number;
    size: number;
    total: number;
}

export type { SeasonEpisodeDTO, SeasonDTO, SeasonsResponseDTO };
