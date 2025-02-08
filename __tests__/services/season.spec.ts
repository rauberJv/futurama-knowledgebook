import { getAllSeasons, getSeasonById } from "@/services/season";
import { SeasonDTO, SeasonsResponseDTO } from "@/services/season/dto";

// Mock global fetch
global.fetch = jest.fn();

describe("Season Service", () => {
    const mockSeasonsResponse: SeasonsResponseDTO = {
        items: [
            { 
                id: 1, 
                episodes: [
                    {
                        id: "1",
                        name: "Space Pilot 3000",
                        number: 1,
                        productionCode: "1ACV01"
                    }
                ] 
            },
            { 
                id: 2, 
                episodes: [
                    {
                        id: "2",
                        name: "The Series Has Landed",
                        number: 1,
                        productionCode: "1ACV02"
                    }
                ] 
            }
        ],
        page: 1,
        pages: 1,
        size: 2,
        total: 2
    };

    const mockSeasonResponse: SeasonDTO = {
        id: 1,
        episodes: [
            {
                id: "1",
                name: "Space Pilot 3000",
                number: 1,
                productionCode: "1ACV01"
            }
        ]
    };

    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear();
    });

    describe("getAllSeasons", () => {
        it("fetches seasons with default parameters", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                json: async () => mockSeasonsResponse
            });

            const result = await getAllSeasons();

            expect(global.fetch).toHaveBeenCalledWith(
                "https://futuramaapi.com/api/seasons?page=1&size=50"
            );
            expect(result).toEqual(mockSeasonsResponse);
        });

        it("fetches seasons with custom parameters", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                json: async () => mockSeasonsResponse
            });

            const result = await getAllSeasons(2, 10);

            expect(global.fetch).toHaveBeenCalledWith(
                "https://futuramaapi.com/api/seasons?page=2&size=10"
            );
            expect(result).toEqual(mockSeasonsResponse);
        });

        it("handles fetch error", async () => {
            (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

            await expect(getAllSeasons()).rejects.toThrow("Network error");
        });
    });

    describe("getSeasonById", () => {
        it("fetches a season by id", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                json: async () => mockSeasonResponse
            });

            const result = await getSeasonById(1);

            expect(global.fetch).toHaveBeenCalledWith(
                "https://futuramaapi.com/api/seasons/1"
            );
            expect(result).toEqual(mockSeasonResponse);
        });

        it("handles fetch error", async () => {
            (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

            await expect(getSeasonById(1)).rejects.toThrow("Network error");
        });
    });
}); 