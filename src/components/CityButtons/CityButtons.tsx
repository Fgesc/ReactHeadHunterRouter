import { Group, Button } from "@mantine/core";
import { useTypedDispatch, useTypedSelector } from "../../hooks/useRedux";
import { setCityFilter } from "../../reducers/JobsSlice";
import { CITIES_FOR_BUTTONS } from "../../constants/constantsMain";

export const CityButtons = () => {
    const dispatch = useTypedDispatch();
    const { cityFilter } = useTypedSelector((state) => state.jobs);

    if (cityFilter === "all") return null;

    return (
        <Group gap={0} mt={24} style={{ display: "inline-flex" }}>
            {CITIES_FOR_BUTTONS.map((city) => (
                <Button
                    data-testid={`city-btn-${city.value}`}
                    key={city.value}
                    onClick={() => dispatch(setCityFilter(city.value))}
                    p={10}
                    pb={0}
                    pt={0}
                    styles={{
                        root: {
                        background: "rgba(246, 246, 247, 1)",
                        border: "none",
                        borderBottom:
                            cityFilter === city.value
                            ? "2px solid rgba(66, 99, 235, 1)"
                            : "2px solid transparent",
                        borderRadius: 0,
                        color: "black",
                        fontSize: "14px",
                        fontWeight: 400,
                        },
                    }}
                >
                {city.label}
                </Button>
            ))}
        </Group>
    );
};

