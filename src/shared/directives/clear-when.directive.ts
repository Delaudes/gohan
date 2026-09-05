import { Directive, effect, ElementRef, inject, input } from "@angular/core";

@Directive({
    selector: '[appClearWhen]',
})
export class ClearWhenDirective {
    private readonly elementRef = inject(ElementRef<HTMLInputElement>);
    readonly appClearWhen = input.required<boolean>();

    constructor() {
        effect(() => {
            if (this.appClearWhen()) {
                this.elementRef.nativeElement.value = '';
            }
        });
    }
}
