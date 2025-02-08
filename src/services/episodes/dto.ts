interface EpisodeDTO {
    id: number;
    name: string;
    number: number;
    productionCode: string;
    airDate: string;
    duration: number;
    createdAt: string;
    season: {
        id: number;
    };
    broadcastCode: string;
}

interface EpisodesResponseDTO {
    items: EpisodeDTO[];
    page: number;
    pages: number;
    size: number;
    total: number;
}

export type { EpisodeDTO, EpisodesResponseDTO };
