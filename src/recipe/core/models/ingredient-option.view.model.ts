import { normalizeSearchText } from "../../../utils/normalize-search-text";

type IngredientOptionProps = {
    id: string;
    name: string;
}

export class IngredientOptionViewModel {
    readonly id: string;
    readonly name: string;

    constructor(props: IngredientOptionProps) {
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
