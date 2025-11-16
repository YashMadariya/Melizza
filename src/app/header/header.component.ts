import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // @Output() openDownloadModal = new EventEmitter<{name: string, path: string}>();

  // onOpenDownloadModal(pdfName: string, pdfPath: string) {
  //   this.openDownloadModal.emit({ name: pdfName, path: pdfPath });
  // }
}
