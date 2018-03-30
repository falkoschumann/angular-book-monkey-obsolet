import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanNavigateToAdminGuard implements CanActivate {

  accessGranted = false;

  canActivate(): boolean {
    if (!this.accessGranted) {
      this.accessGranted = window.confirm('Mit großer Macht kommt groß Verantwortung. Möchten Sie den Admin-Bereich betreten?');
    }

    return this.accessGranted;
  }

}
