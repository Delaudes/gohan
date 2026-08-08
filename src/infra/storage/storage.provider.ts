import { InjectionToken } from '@angular/core';
import { LocalStorageAdapter } from './local-storage.adapter';
import { StoragePort } from './storage.port';

export const STORAGE_TOKEN = new InjectionToken<StoragePort>('STORAGE_TOKEN', {
  providedIn: 'root',
  factory: () => new LocalStorageAdapter(),
});
