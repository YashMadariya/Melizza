import { Component, AfterViewInit, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    // Set up intersection observer for animations
    // We'll use it in ngAfterViewInit
  }

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
    this.setupCounters();
  }

  private setupScrollAnimations(): void {
    const elements = document.querySelectorAll(
      '.highlight-card, .category-card, .why-card, .stat-card, .gallery-item'
    );
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // If it's a stat card, trigger counter
          if (entry.target.classList.contains('stat-card')) {
            this.animateCounter(entry.target);
          }
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(el => this.observer?.observe(el));
  }

  private setupCounters(): void {
    // Counters will be animated when stat-card becomes visible (handled above)
    // We'll animate them using the animateCounter method
  }

  private animateCounter(card: Element): void {
    const numberEl = card.querySelector('.stat-number');
    if (!numberEl) return;
    const target = parseInt(numberEl.getAttribute('data-count') || '0', 10);
    const duration = 2000;
    const start = performance.now();

    const update = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const current = Math.floor(progress * target);
      numberEl.textContent = current.toString();
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        numberEl.textContent = target.toString();
      }
    };
    requestAnimationFrame(update);
  }
}