import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StoragePort } from '../storage/storage.port';
import { STORAGE_TOKEN } from '../storage/storage.provider';

const DEVICE_ID_KEY = 'Gohan-Device-Id';
const DEVICE_ID_HEADER = 'X-Device-Id';

export const deviceIdInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(STORAGE_TOKEN);
  const deviceId = storage.get<string>(DEVICE_ID_KEY) ?? generateDeviceId(storage);

  return next(req.clone({ setHeaders: { [DEVICE_ID_HEADER]: deviceId } }));
};

function generateDeviceId(storage: StoragePort): string {
  const id = crypto.randomUUID();
  storage.set(DEVICE_ID_KEY, id);
  return id;
}
