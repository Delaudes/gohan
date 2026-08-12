import { InjectionToken } from '@angular/core';
import { AngularRouteAdapter } from './angular-route.adapter';
import { RoutePort } from './route.port';

export const ROUTE_TOKEN = new InjectionToken<RoutePort>('ROUTE_TOKEN', {
    providedIn: 'root',
    factory: () => new AngularRouteAdapter(),
});
