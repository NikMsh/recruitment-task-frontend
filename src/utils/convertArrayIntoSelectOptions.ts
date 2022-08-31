import { SelectOptionType} from "../types/SelectOptionType";

export const convertValuesIntoSelectOptions = (values: string[]): SelectOptionType[]  => {
    const uniqueSelectValues = Array.from(new Set(values));
    return uniqueSelectValues.map(selectValue => ({id: `${selectValue}_id`, value: selectValue}));
}