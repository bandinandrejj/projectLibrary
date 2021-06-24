import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudGuard implements CanActivate {

  constructor(private _route: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (localStorage.getItem('authUser') === null) {
      this._route.navigate(['page-not-found'])
      return false
    }


    const authUser = JSON.parse(localStorage.getItem('authUser') as string);
    return (authUser[0].key !== '' && authUser[0].userFlag['value'] === 'student');
  }


}


