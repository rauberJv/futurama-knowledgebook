import { getAllEpisodes, getEpisodeById } from "@/services/episodes";
import { EpisodeDTO, EpisodesResponseDTO } from "@/services/episodes/dto";

// Mock global fetch
global.fetch = jest.fn();

describe("Episodes Service", () => {
    const mockEpisodesResponse: EpisodesResponseDTO = {
        items: [
            {
                id: "1",
                name: "Space Pilot 3000",
                number: 1,
                productionCode: "1ACV01",
                airDate: "1999-03-28",
                writer: "David X. Cohen & Matt Groening",
                description: "Pizza delivery boy Philip J. Fry accidentally freezes himself on December 31, 1999 and wakes up 1000 years later."
            },
            {
                id: "2",
                name: "The Series Has Landed",
                number: 2,
                productionCode: "1ACV02",
                airDate: "1999-04-04",
                writer: "Ken Keeler",
                description: "The Planet Express crew visits an amusement park on the Moon."
            }
        ],
        page: 1,
        pages: 1,
        size: 2,
        total: 2
    };

    const mockEpisodeResponse: EpisodeDTO = {
        id: "1",
        name: "Space Pilot 3000",
        number: 1,
        productionCode: "1ACV01",
        airDate: "1999-03-28",
        writer: "David X. Cohen & Matt Groening",
        description: "Pizza delivery boy Philip J. Fry accidentally freezes himself on December 31, 1999 and wakes up 1000 years later."
    };

    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear();
    });

    describe("getAllEpisodes", () => {
        it("fetches episodes with default parameters", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                json: async () => mockEpisodesResponse
            });

            const result = await getAllEpisodes();

            expect(global.fetch).toHaveBeenCalledWith(
                "https://futuramaapi.com/api/episodes?page=1&size=50"
            );
            expect(result).toEqual(mockEpisodesResponse);
        });

        it("fetches episodes with custom parameters", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                json: async () => mockEpisodesResponse
            });

            const result = await getAllEpisodes(2, 10);

            expect(global.fetch).toHaveBeenCalledWith(
                "https://futuramaapi.com/api/episodes?page=2&size=10"
            );
            expect(result).toEqual(mockEpisodesResponse);
        });

        it("handles fetch error", async () => {
            (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

            await expect(getAllEpisodes()).rejects.toThrow("Network error");
        });
    });

    describe("getEpisodeById", () => {
        it("fetches an episode by id", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                json: async () => mockEpisodeResponse
            });

            const result = await getEpisodeById("1");

            expect(global.fetch).toHaveBeenCalledWith(
                "https://futuramaapi.com/api/episodes/1"
            );
            expect(result).toEqual(mockEpisodeResponse);
        });

        it("handles fetch error", async () => {
            (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

            await expect(getEpisodeById("1")).rejects.toThrow("Network error");
        });
    });
}); 