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

    matches(normalizedQuery: string): boolean {
        return this.name.toLowerCase().includes(normalizedQuery);
    }
}
