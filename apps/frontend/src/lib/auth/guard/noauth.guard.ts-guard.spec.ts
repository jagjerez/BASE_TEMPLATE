import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { noauthGuardTsGuard } from './noauth.guard.ts-guard';

describe('noauthGuardTsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => noauthGuardTsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
