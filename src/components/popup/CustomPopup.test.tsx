
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import CustomPopup, { CustomPopupPropsType } from "./CustomPopup";

describe("CustomPopup Props Test", () => {
    test("If CustomPopup rendered correctly", () => {
        const props: CustomPopupPropsType = {
            onConfirm: () => { },
            onCancel: () => { }
        }

        const element = render(<CustomPopup {...props} />);
        expect(element).toMatchSnapshot();
    });

    test("If CustomPopup overlay click works", () => {
        const props: CustomPopupPropsType = {
            onConfirm: () => { },
            onCancel: () => { }
        }

        render(<CustomPopup {...props} />);
        const element = screen.getByTestId("primary-button-test");
        const onClick = jest.fn();
        element.onclick = onClick
        element.click();
        expect(onClick).toHaveBeenCalled();
    });
});