import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(): boolean {
    if (!this.storageService.isAuthenticated()) {
      this.storageService.logout();  // Clear token and session if needed
      this.router.navigate(['/login']); // Navigate to login page
      return false;
    }
    return true;
  }
}
