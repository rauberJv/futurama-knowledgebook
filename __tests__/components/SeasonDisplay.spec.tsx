import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SeasonDisplay from "@/components/SeasonDisplay";
import * as SeasonContextModule from "@/contexts/SeasonContext";
import { SeasonsResponseDTO } from "@/services/season/dto";

// Mock the Card component since we've already tested it separately
jest.mock("@/components/Card", () => {
    return function MockCard({ title, link }: { title: string, link: string }) {
        return <div data-testid="mock-card" data-title={title} data-link={link}>{title}</div>;
    };
});

// Mock the useSeason hook
jest.mock("@/contexts/SeasonContext", () => ({
    useSeason: jest.fn()
}));

describe("SeasonDisplay", () => {
    const mockFetchSeasons = jest.fn();
    
    const mockSeasons: SeasonsResponseDTO = {
        items: [
            { id: 1, episodes: [] },
            { id: 2, episodes: [] },
            { id: 3, episodes: [] }
        ],
        page: 1,
        pages: 1,
        size: 3,
        total: 3
    };

    beforeEach(() => {
        mockFetchSeasons.mockClear();
    });

    it("calls fetchSeasons on mount", () => {
        (SeasonContextModule.useSeason as jest.Mock).mockReturnValue({
            isLoading: false,
            error: null,
            seasons: null,
            fetchSeasons: mockFetchSeasons
        });

        render(<SeasonDisplay />);
        expect(mockFetchSeasons).toHaveBeenCalledWith(1, 50, false);
    });

    it("shows loading state", () => {
        (SeasonContextModule.useSeason as jest.Mock).mockReturnValue({
            isLoading: true,
            error: null,
            seasons: null,
            fetchSeasons: mockFetchSeasons
        });

        render(<SeasonDisplay />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("shows error state", () => {
        (SeasonContextModule.useSeason as jest.Mock).mockReturnValue({
            isLoading: false,
            error: "Error message",
            seasons: null,
            fetchSeasons: mockFetchSeasons
        });

        render(<SeasonDisplay />);
        expect(screen.getByText("Sorry, we couldn't find any seasons.")).toBeInTheDocument();
    });

    it("renders season cards correctly", () => {
        (SeasonContextModule.useSeason as jest.Mock).mockReturnValue({
            isLoading: false,
            error: null,
            seasons: mockSeasons,
            fetchSeasons: mockFetchSeasons
        });

        render(<SeasonDisplay />);

        const cards = screen.getAllByTestId("mock-card");
        expect(cards).toHaveLength(3);

        cards.forEach((card, index) => {
            const seasonNumber = index + 1;
            expect(card).toHaveAttribute("data-title", `Season ${seasonNumber}`);
            expect(card).toHaveAttribute("data-link", `/season/${seasonNumber}`);
        });
    });

    it("renders with grid layout classes", () => {
        (SeasonContextModule.useSeason as jest.Mock).mockReturnValue({
            isLoading: false,
            error: null,
            seasons: mockSeasons,
            fetchSeasons: mockFetchSeasons
        });

        render(<SeasonDisplay />);

        const container = screen.getAllByTestId("mock-card")[0].parentElement;
        expect(container).toHaveClass(
            "grid",
            "grid-cols-1",
            "sm:grid-cols-2",
            "md:grid-cols-3",
            "lg:grid-cols-4",
            "gap-4",
            "w-full"
        );
    });
}); 