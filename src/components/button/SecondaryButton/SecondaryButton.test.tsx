import SecondaryButton, { SecondaryButtonPropsType } from "./SecondaryButton";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

describe("Secondary Button Props Test", () => {
    test("If button rendered correctly", () => {
        const props: SecondaryButtonPropsType = {
            type: "button",
            label: "Button",
            onClick: () => { },
            style: {}
        }

        const element = render(<SecondaryButton {...props} />);
        expect(element).toMatchSnapshot();
    });

    test("If label rendered correctly", () => {
        const props: SecondaryButtonPropsType = {
            type: "button",
            label: "Button",
            onClick: () => { }
        }

        render(<SecondaryButton {...props} />);
        const element = screen.getByTestId("secondary-button-test");
        expect(element).toHaveValue("Button");
    });

    test("If type rendered correctly", () => {
        const props: SecondaryButtonPropsType = {
            type: "button",
            label: "Button",
            onClick: () => { }
        }

        render(<SecondaryButton {...props} />);
        const element = screen.getByTestId("secondary-button-test");
        expect(element).toHaveAttribute("type", "button");
    });

    test("If onClick called", () => {
        const onClick = jest.fn();
        const props: SecondaryButtonPropsType = {
            type: "button",
            label: "Button",
            onClick
        }

        render(<SecondaryButton {...props} />);
        const element = screen.getByTestId("secondary-button-test");
        fireEvent.click(element);
        element.click();
        expect(onClick).toBeCalledTimes(2);
    });
});