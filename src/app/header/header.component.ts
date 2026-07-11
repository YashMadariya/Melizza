import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],  // ← essential for routerLinkActive and routerLinkActiveOptions
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'       // keep as .css if you prefer
})
export class HeaderComponent implements OnInit {
  isSticky = false;
  mobileMenuOpen = false;
  submenuOpen: { [key: string]: boolean } = {};

  constructor(private router: Router) {}

  ngOnInit() {
    // Close mobile menu on route change
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeMobileMenu();
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSticky = window.scrollY > 20;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.toggleBodyScroll(this.mobileMenuOpen);
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    this.toggleBodyScroll(false);
  }

  toggleSubmenu(key: string) {
    this.submenuOpen[key] = !this.submenuOpen[key];
  }

  private toggleBodyScroll(disable: boolean) {
    if (disable) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}