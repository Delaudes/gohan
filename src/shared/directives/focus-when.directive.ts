import { Directive, effect, ElementRef, inject, input } from "@angular/core";

@Directive({
    selector: '[appFocusWhen]',
})
export class FocusWhenDirective {
    private readonly elementRef = inject(ElementRef<HTMLInputElement>);
    readonly appFocusWhen = input.required<boolean>();

    constructor() {
        effect(() => {
            if (this.appFocusWhen()) {
                this.elementRef.nativeElement.focus();
            }
        });
    }
}
