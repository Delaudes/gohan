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
        return this.name.toLowerCase().includes(normalizedQuery);
    }
}
