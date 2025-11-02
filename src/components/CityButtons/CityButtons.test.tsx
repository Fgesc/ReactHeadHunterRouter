import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { customRender } from "../../test/utils";
import { CityButtons } from "./CityButtons";
import * as redux from "../../hooks/useRedux";
import { setCityFilter } from "../../reducers/JobsSlice";
import { CITIES_FOR_BUTTONS } from "../../constants/constantsMain";

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

describe("CityButtons Компонент", () => {
    const mockDispatch = vi.fn();

    beforeEach(() => {
        mockDispatch.mockClear();
        vi.spyOn(redux, "useTypedDispatch").mockReturnValue(mockDispatch);
        vi.spyOn(redux, "useTypedSelector").mockReturnValue({ cityFilter: "1" });
    });

    it("должен рендерить кнопки, кнопки должны быть кликабельны", async () => {
        customRender(<CityButtons />);

        for (const city of CITIES_FOR_BUTTONS) {
            const btn = screen.getByTestId(`city-btn-${city.value}`);
            expect(btn).toBeInTheDocument();
            expect(btn).toHaveTextContent(city.label);

            await userEvent.click(btn);
            expect(mockDispatch).toHaveBeenCalledWith(setCityFilter(city.value));
        }
    });

    it("не должно рендерить кнопки, если cityFilter === 'all' ", () => {
        vi.spyOn(redux, "useTypedSelector").mockReturnValue({ cityFilter: "all" });
        customRender(<CityButtons />);
        for (const city of CITIES_FOR_BUTTONS) {
            expect(screen.queryByTestId(`city-btn-${city.value}`)).toBeNull();
        }
    });
});
