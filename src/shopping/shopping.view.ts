import { signal } from "@angular/core";
import { ShoppingViewModel } from "./models/shopping.view.model";

export class ShoppingView {
    private readonly state = signal<ShoppingViewModel>(ShoppingViewModel.initial());
    readonly shoppingViewModel = this.state.asReadonly();

    update(fn: (vm: ShoppingViewModel) => ShoppingViewModel): void {
        this.state.update(fn);
    }
}
