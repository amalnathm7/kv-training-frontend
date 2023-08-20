import Card, { CardPropsType } from "./Card";
import { render} from "@testing-library/react";
import '@testing-library/jest-dom';

describe("Card Props Test", () => {
    test("If card rendered correctly", () => {
        const props: CardPropsType = {
            items: [{
                label: "card-item",
                value: "card-value-1",
                isStatus: true,
            }, {
                label: "card-item",
                value: "card-value-2",
                isStatus: false,
            }]
        }

        const element = render(<Card {...props} />);
        expect(element).toMatchSnapshot();
    });
});