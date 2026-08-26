type ShoppingIngredientProps = {
    id: string;
    name: string;
    bought: boolean;
    mealId?: string;
    mealName?: string;
    isLoadingUpdatingBought: boolean;
    isErrorUpdatingBought: boolean;
    isLoadingRemoving: boolean;
    isErrorRemoving: boolean;
}

export class ShoppingIngredientViewModel {
    readonly id: string;
    readonly name: string;
    readonly bought: boolean;
    readonly mealId?: string;
    readonly mealName?: string;
    readonly isLoadingUpdatingBought: boolean;
    readonly isErrorUpdatingBought: boolean;
    readonly isLoadingRemoving: boolean;
    readonly isErrorRemoving: boolean;

    constructor(props: ShoppingIngredientProps) {
        this.id = props.id;
        this.name = props.name;
        this.bought = props.bought;
        this.mealId = props.mealId;
        this.mealName = props.mealName;
        this.isLoadingUpdatingBought = props.isLoadingUpdatingBought;
        this.isErrorUpdatingBought = props.isErrorUpdatingBought;
        this.isLoadingRemoving = props.isLoadingRemoving;
        this.isErrorRemoving = props.isErrorRemoving;
    }

    private with(partial: Partial<ShoppingIngredientProps>): ShoppingIngredientViewModel {
        return new ShoppingIngredientViewModel({
            ...this,
            ...partial,
        });
    }

    isNot(id: string): boolean {
        return this.id !== id;
    }

    startLoadingUpdatingBoughtIngredient(id: string): ShoppingIngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingUpdatingBought: true, isErrorUpdatingBought: false,
        });
    }

    stopLoadingUpdatingBoughtIngredient(id: string): ShoppingIngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingUpdatingBought: false,
        });
    }

    presentErrorUpdatingBoughtIngredient(id: string): ShoppingIngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isErrorUpdatingBought: true,
        });
    }

    presentIngredientUpdated(id: string, bought: boolean): ShoppingIngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            bought,
        });
    }

    startLoadingRemovingIngredient(id: string): ShoppingIngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingRemoving: true, isErrorRemoving: false,
        });
    }

    stopLoadingRemovingIngredient(id: string): ShoppingIngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isLoadingRemoving: false,
        });
    }

    presentErrorRemovingIngredient(id: string): ShoppingIngredientViewModel {
        if (this.isNot(id)) return this;
        return this.with({
            isErrorRemoving: true,
        });
    }
}
