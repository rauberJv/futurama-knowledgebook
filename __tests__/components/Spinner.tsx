import Spinner from "@/components/Spinner";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Spinner", () => {
    it("renders", () => {
        render(<Spinner />);
        expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });
});