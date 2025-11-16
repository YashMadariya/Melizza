import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  openPDF(pdfUrl: string) {
    const encoded = encodeURI(pdfUrl);
    window.open(encoded, '_blank');
  }
}
