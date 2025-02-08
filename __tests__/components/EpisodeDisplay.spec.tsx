import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EpisodeDisplay from "@/components/EpisodeDisplay";
import { SeasonEpisodeDTO } from "@/services/season/dto";

// Mock the Card component since we've already tested it separately
jest.mock("@/components/Card", () => {
    return function MockCard({ title, link, htmlTitle }: { title: string, link: string, htmlTitle: string }) {
        return <div data-testid="mock-card" data-title={title} data-link={link} data-html-title={htmlTitle}>{title}</div>;
    };
});

describe("EpisodeDisplay", () => {
    const mockEpisodes: SeasonEpisodeDTO[] = [
        {
            id: "1",
            name: "Space Pilot 3000",
            number: 1,
            productionCode: "1ACV01"
        },
        {
            id: "2",
            name: "The Series Has Landed",
            number: 2,
            productionCode: "1ACV02"
        }
    ];

    it("renders episode cards correctly", () => {
        render(<EpisodeDisplay episodeList={mockEpisodes} />);
        
        const cards = screen.getAllByTestId("mock-card");
        expect(cards).toHaveLength(2);
        
        // Check first episode card
        expect(cards[0]).toHaveAttribute("data-title", "Episode 1 ");
        expect(cards[0]).toHaveAttribute("data-link", "/episode/1");
        expect(cards[0]).toHaveAttribute("data-html-title", "Episode 1 - Space Pilot 3000");
        
        // Check second episode card
        expect(cards[1]).toHaveAttribute("data-title", "Episode 2 ");
        expect(cards[1]).toHaveAttribute("data-link", "/episode/2");
        expect(cards[1]).toHaveAttribute("data-html-title", "Episode 2 - The Series Has Landed");
    });

    it("renders with grid layout classes", () => {
        render(<EpisodeDisplay episodeList={mockEpisodes} />);
        
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

    it("renders empty grid when no episodes provided", () => {
        render(<EpisodeDisplay episodeList={[]} />);
        
        const cards = screen.queryAllByTestId("mock-card");
        expect(cards).toHaveLength(0);
    });
}); 