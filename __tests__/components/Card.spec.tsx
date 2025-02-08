import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
    useRouter: jest.fn()
}));

// Mock next/image since it's not available in the test environment
jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} />
    },
}));

describe("Card", () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        // Reset the mock router before each test
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush
        });
        mockPush.mockClear();
    });

    it("renders with required props only", () => {
        render(<Card title="Test Title" />);
        
        expect(screen.getByText("Test Title")).toBeInTheDocument();
        expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
        expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("renders with all props", () => {
        render(
            <Card
                title="Test Title"
                description="Test Description"
                image="/test-image.jpg"
                link="/test-link"
                htmlTitle="HTML Title"
            />
        );
        
        expect(screen.getByText("Test Title")).toBeInTheDocument();
        expect(screen.getByText("Test Description")).toBeInTheDocument();
        expect(screen.getByRole("img")).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute("src", "/test-image.jpg");
        expect(screen.getByRole("img")).toHaveAttribute("alt", "Test Title");
    });

    it("shows link icon when link prop is provided", () => {
        render(<Card title="Test Title" link="/test-link" />);
        
        // Check if SVG is rendered (link icon)
        const svg = document.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });

    it("doesn't show link icon when link prop is not provided", () => {
        render(<Card title="Test Title" />);
        
        // Check that SVG is not rendered
        expect(screen.queryByRole("img", { hidden: true })).not.toBeInTheDocument();
    });

    it("navigates when clicked and link is provided", () => {
        render(<Card title="Test Title" link="/test-link" />);
        
        fireEvent.click(screen.getByText("Test Title"));
        expect(mockPush).toHaveBeenCalledWith("/test-link");
    });

    it("doesn't navigate when clicked and link is not provided", () => {
        render(<Card title="Test Title" />);
        
        fireEvent.click(screen.getByText("Test Title"));
        expect(mockPush).not.toHaveBeenCalled();
    });

    it("renders with custom HTML title", () => {
        render(<Card title="Test Title" htmlTitle="Custom HTML Title" />);
        
        const cardElement = screen.getByText("Test Title").parentElement?.parentElement;
        expect(cardElement).toHaveAttribute("title", "Custom HTML Title");
    });

    it("uses title as HTML title when htmlTitle is not provided", () => {
        render(<Card title="Test Title" />);
        
        const cardElement = screen.getByText("Test Title").parentElement?.parentElement;
        expect(cardElement).toHaveAttribute("title", "Test Title");
    });
}); 