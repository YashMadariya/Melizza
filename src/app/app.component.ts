import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { DownloadModalComponent } from './download-modal/download-modal.component';
import { EmailService, UserDetails } from './services/email.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, PreloaderComponent, FooterComponent, DownloadModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MelizzaFrontEnd';
  
  showModal = false;
  selectedPdf = { name: '', path: '' };

  constructor(private emailService: EmailService) {}

  openDownloadModal(pdfName: string, pdfPath: string) {
    this.selectedPdf = { name: pdfName, path: pdfPath };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onFormSubmit(userDetails: UserDetails) {
    this.emailService.sendDownloadRequest(userDetails).subscribe({
      next: (response) => {
        console.log('Email client opened successfully:', response);
        // Trigger PDF download
        this.downloadPdf(userDetails.pdfPath);
        this.closeModal();
        //alert('Thank you! Your email client has opened with the details. Please send the email to complete your request. The PDF is now downloading.');
      },
      error: (error) => {
        console.error('Error opening email client:', error);
        // Still allow PDF download even if email fails
        this.downloadPdf(userDetails.pdfPath);
        this.closeModal();
        //alert('PDF is downloading. Please contact us at office@melizzalifescience.com for the brochure.');
      }
    });
  }

  private downloadPdf(pdfPath: string) {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
