import { normalizeSearchText } from "../../../utils/normalize-search-text";

type MealOptionProps = {
    id: string;
    name: string;
}

export class MealOptionViewModel {
    readonly id: string;
    readonly name: string;

    constructor(props: MealOptionProps) {
        this.id = props.id;
        this.name = props.name;
    }

    isNot(id: string): boolean {
        return this.id !== id;
    }

    matches(normalizedQuery: string): boolean {
        return normalizeSearchText(this.name).includes(normalizedQuery);
    }
}
