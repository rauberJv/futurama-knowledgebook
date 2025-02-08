import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomMessage from "@/components/CustomMessage";

describe("CustomMessage", () => {
    it("renders children content", () => {
        render(
            <CustomMessage>
                <div data-testid="test-content">Test Content</div>
            </CustomMessage>
        );
        
        expect(screen.getByTestId("test-content")).toBeInTheDocument();
        expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("renders with proper styling classes", () => {
        render(
            <CustomMessage>
                <div>Test Content</div>
            </CustomMessage>
        );
        
        const container = screen.getByText("Test Content").parentElement;
        expect(container).toHaveClass("flex", "justify-center", "items-center", "min-h-screen");
    });
}); 