import { Box, Select, useMantineTheme } from "@mantine/core";
import { useTypedDispatch, useTypedSelector } from "../../hooks/useRedux";
import LocationIcon from "../../assets/location.svg"
import { setCityFilter } from "../../reducers/JobsSlice";
import { CITIES } from "../../constants/constantsMain";

export const CityFilter = () => {
    const dispatch = useTypedDispatch();
    const theme = useMantineTheme();
    const { cityFilter } = useTypedSelector((state) => state.jobs);

    return (
        <Box
            data-testid="city-filter"
            w={317}
            h={84}
            p={24}
            bg={theme.other.colors.white}
            style={{
                boxSizing: "border-box",
                borderRadius: "12px",
            }}
        >
            <Select
                data-testid="city-select"
                w={269}
                placeholder="Все города"
                data={CITIES}
                value={cityFilter}
                onChange={(value) => dispatch(setCityFilter(value || "all"))}
                leftSection={
                    <img
                        src={LocationIcon}
                        width={18}
                        height={18}
                        alt="Город"
                    />
                }
                styles={{
                wrapper: {
                    "&[dataExpanded='true']": {
                        borderColor: theme.colors.indigo[6],
                    },
                },
                input: {
                    fontWeight: 400,
                    fontSize: "14px",
                    color: theme.other.colors.lightGray,
                    background: theme.other.colors.white,
                },
                dropdown: {
                    border: `1px solid ${theme.other.colors.white}`,
                    backgroundColor: theme.other.colors.white,
                    borderRadius: "8px",
                    boxShadow: `
                    0px 7px 7px -5px rgba(0, 0, 0, 0.04),
                    0px 10px 15px -5px rgba(0, 0, 0, 0.05),
                    0px 1px 3px 0px rgba(0, 0, 0, 0.05)
                    `,
                },
                option: {
                    fontSize: "14px",
                    fontWeight: 400,
                    color: theme.other.colors.black1,
                },
                }}
            />
        </Box>
    );
};

