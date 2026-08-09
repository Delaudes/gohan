import { Dialog } from "../../../presentation/dialog/dialog.port";
import { Field } from "../../../presentation/field/field.port";
import { IngredientsPort } from "../ingredients.port";
import { IngredientsView } from "../ingredients.view";
import { IngredientDomainModel } from "../models/ingredients.domain.model";

export class CreateIngredientUseCase {
    constructor(
        private readonly ingredientsView: IngredientsView,
        private readonly ingredientsPort: IngredientsPort,
    ) { }

    async execute(dialog: Dialog, field: Field): Promise<void> {
        this.startLoading();
        try {
            const ingredient = await this.ingredientsPort.createIngredient(field.value.trim());
            this.presentIngredientCreated(ingredient);
            field.value = '';
            dialog.close();
        } catch {
            this.presentError();
        } finally {
            this.stopLoading();
        }
    }

    private startLoading(): void {
        this.ingredientsView.update({ isLoadingCreatingIngredient: true, });
    }

    private stopLoading(): void {
        this.ingredientsView.update({ isLoadingCreatingIngredient: false });
    }

    private presentError(): void {
        this.ingredientsView.update({ isErrorCreatingIngredient: true });
    }

    private presentIngredientCreated(ingredient: IngredientDomainModel): void {
        const ingredients = [
            ...this.ingredientsView.ingredientsViewModel.get().ingredients,
            { id: ingredient.id, name: ingredient.name, isLoadingDeleting: false, isErrorDeleting: false },
        ];
        this.ingredientsView.update({ ingredients, hasIngredients: true, isErrorCreatingIngredient: false });
    }
}
