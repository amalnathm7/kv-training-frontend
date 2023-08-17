
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import SubHeader, { SubHeaderPropsType } from "./SubHeader";

describe("SubHeader Props Test", () => {
    test("If SubHeader rendered correctly", () => {
        const props: SubHeaderPropsType = {
            label: "SubHeader-label",
            actionLabel: "SubHeader-action-label",
            actionIcon: "SubHeader-action-icon.png",
            action: () => {}
        }

        const element = render(<SubHeader {...props} />);
        expect(element).toMatchSnapshot();
    });
});