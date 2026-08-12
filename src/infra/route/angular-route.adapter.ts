import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppParam } from './app-param';
import { RoutePort } from './route.port';

export class AngularRouteAdapter implements RoutePort {
    private readonly activatedRoute = inject(ActivatedRoute);

    getParam(param: AppParam): string {
        return this.activatedRoute.firstChild?.snapshot.paramMap.get(param) ?? '';
    }
}
