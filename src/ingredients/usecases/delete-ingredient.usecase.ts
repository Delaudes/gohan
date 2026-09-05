import { IngredientsPort } from "../ingredients.port";
import { IngredientsView } from "../ingredients.view";
import { IngredientDeletionErrorMessage } from "../models/ingredient.view.model";
import { IngredientDeletionError } from "../models/ingredients.domain.model";

export class DeleteIngredientUseCase {
    constructor(
        private readonly ingredientsView: IngredientsView,
        private readonly ingredientsPort: IngredientsPort,
    ) { }

    async execute(id: string): Promise<void> {
        this.ingredientsView.update(vm => vm.startLoadingDeletingIngredient(id));
        const result = await this.ingredientsPort.deleteIngredient(id);
        if (result.success) {
            this.ingredientsView.update(vm => vm.presentIngredientDeleted(id));
        } else {
            const errorMessage = this.findErrorMessage(result.error);
            this.ingredientsView.update(vm => vm.presentErrorDeletingIngredient(id, errorMessage));
        }
        this.ingredientsView.update(vm => vm.stopLoadingDeletingIngredient(id));
    }

    private findErrorMessage(error: IngredientDeletionError): IngredientDeletionErrorMessage {
        const errorMessages: Record<IngredientDeletionError, IngredientDeletionErrorMessage> = {
            'IngredientInUseError': 'Ingrédient non supprimable : il est dans une recette ou dans la liste de courses',
            'UnknownError': 'Une erreur est survenue, réessayez.',
        };
        return errorMessages[error];
    }
}
