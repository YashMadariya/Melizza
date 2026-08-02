import { Component, afterNextRender } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  constructor() {
    afterNextRender(() => {
      this.setupScrollAnimations();
    });
  }

  private setupScrollAnimations(): void {
    const elements = document.querySelectorAll(
      '.about-image-wrapper, .about-content .section-tag, .about-content .about-title, ' +
      '.about-content .about-description, .about-mission-vision, .about-strengths, .about-content .btn'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }
}
