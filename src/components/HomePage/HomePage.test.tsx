import { describe, it, expect, beforeAll } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import { http, HttpResponse } from "msw";
// import { server } from "../../mocks/server";
// import { BASE_URL } from "../../constants/constantsApi";
import { customRender } from "../../test/utils";
import { HomePage } from "./HomePage";

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

describe("HomePage Компонент", () => {

    it("должен рендерить компонент ", async () => {
        customRender(<HomePage />);
        const title = await screen.findByText(/Список вакансий/i);
        expect(title).toBeInTheDocument();
    });

    it("должен показывать и скрывать лоадер при загрузке", async () => {
        customRender(<HomePage />);
        expect(screen.getByTestId("custom-loader")).toBeInTheDocument();

        const list = await screen.findByTestId("jobs-list");
        expect(list).toBeInTheDocument();

        expect(screen.queryByTestId("custom-loader")).not.toBeInTheDocument();
    });

    it("должен рендерить список вакансий", async () => {
        customRender(<HomePage/>);
        const list = await screen.findByTestId("jobs-list");
        screen.debug();
        expect(list).toBeInTheDocument();
    });

    it("должен рендерить поле поиска и кнопку и позволять вводить текст", async () => {
        customRender(<HomePage />);

        const input = screen.getByTestId("search-input");
        const button = screen.getByTestId("search-button");

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        await userEvent.type(input, "React");
        expect(input).toHaveValue("React");
    });

    it("должен рендерить контейнер компонента JobFilters который содержит фильтры городов и навыков", async () => {
        customRender(<HomePage />);

        const jobFiltersContainer = await screen.findByTestId("job-filters-container");
        expect(jobFiltersContainer).toBeInTheDocument();
    });

    it("должен позволять добавить навык и удалить его", async () => {
        customRender(<HomePage />);

        const input = await screen.findByTestId("skill-input");
        const addButton = screen.getByTestId("add-skill-button");

        await userEvent.type(input, "React");
        await userEvent.click(addButton);

        const addedPill = await screen.findByTestId("pill-React");
        expect(addedPill).toBeInTheDocument();

        const removeButton = addedPill.querySelector("button");
        expect(removeButton).toBeInTheDocument();

        await userEvent.click(removeButton!);

        await waitFor(() => {
            expect(screen.queryByTestId("pill-React")).not.toBeInTheDocument();
        });
    });

    // it("Должен отображать сообщение об ошибке, если загрузка списка карточек завершилась неудачей", async () => {
    //     server.use(
    //         http.get(`${BASE_URL}*`, () => {
    //             return HttpResponse.error();
    //         })
    //     );

    //     customRender(<HomePage />);
    //     const errorMessage = await screen.findByTestId("jobs-error");

    //     screen.debug();
    //     expect(errorMessage).toBeInTheDocument();
    //     expect(errorMessage).toHaveTextContent(/Ошибка:/);
    //     expect(screen.queryByTestId("custom-loader")).not.toBeInTheDocument();

    // });

});
