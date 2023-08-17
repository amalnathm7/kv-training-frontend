
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import Sidebar from "./Sidebar";

describe("Sidebar Props Test", () => {
    test("If Sidebar rendered correctly", () => {
        const element = render(<Sidebar />);
        expect(element).toMatchSnapshot();
    });
});