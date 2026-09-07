import {screen} from "@testing-library/react";
import {describe, it, expect} from "vitest";
import Header from "./Header";
import {renderWithProviders} from "@/test/utils";


describe("Header", () => {
    it("shows empty cart", () => {
        renderWithProviders(<Header/>);
        expect(screen.getByText(/Cart/)).toBeInTheDocument();
    });
});