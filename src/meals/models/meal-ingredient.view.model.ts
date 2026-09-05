type MealIngredientProps = {
    id: string;
    name: string;
    bought: boolean;
    isLoadingUpdatingBought: boolean;
    isErrorUpdatingBought: boolean;
}

export class MealIngredientViewModel {
    readonly id: string;
    readonly name: string;
    readonly bought: boolean;
    readonly isLoadingUpdatingBought: boolean;
    readonly isErrorUpdatingBought: boolean;

    constructor(props: MealIngredientProps) {
        this.id = props.id;
        this.name = props.name;
        this.bought = props.bought;
        this.isLoadingUpdatingBought = props.isLoadingUpdatingBought;
        this.isErrorUpdatingBought = props.isErrorUpdatingBought;
    }

    private with(partial: Partial<MealIngredientProps>): MealIngredientViewModel {
        return new MealIngredientViewModel({
            ...this,
            ...partial,
        });
    }

    isNot(id: string): boolean {
        return this.id !== id;
    }

    startLoadingUpdatingBoughtIngredient(id: string): MealIngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingUpdatingBought: true, isErrorUpdatingBought: false,
        });
    }

    stopLoadingUpdatingBoughtIngredient(id: string): MealIngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingUpdatingBought: false,
        });
    }

    presentErrorUpdatingBoughtIngredient(id: string): MealIngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isErrorUpdatingBought: true,
        });
    }

    presentIngredientUpdated(id: string, bought: boolean): MealIngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            bought,
        });
    }
}
