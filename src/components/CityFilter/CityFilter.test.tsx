import { describe, it, expect, beforeAll, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { customRender } from "../../test/utils";
import { CityFilter } from "./CityFilter";

beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: (query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
        }),
    });
});

describe("CityFilter Компонент", () => {
    it("должен рендерить компонент", async () => {
        customRender(<CityFilter />);
        const select = await screen.findByText(/Все города/i);
        expect(select).toBeInTheDocument();
    });

    it("должен по дефолту иметь 'Все города' и позволять выбрать другой город в фильтре CityFilter", async () => {
        window.HTMLElement.prototype.scrollIntoView = vi.fn();
        customRender(<CityFilter />);

        const select = screen.getByTestId("city-select");
        expect(select).toHaveValue("Все города");

        await userEvent.click(select);

        const option = await screen.findByText("Москва");
        await userEvent.click(option);
        expect(select).toHaveValue("Москва");
    });
});
