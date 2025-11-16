import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserDetails {
  name: string;
  company: string;
  email: string;
  mobile: string;
  description: string;
  pdfName: string;
  pdfPath: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() {}

  sendDownloadRequest(userDetails: UserDetails): Observable<any> {
    // Generate email content similar to contact form approach
    const subject = `Download Request for ${userDetails.pdfName}`;
    const bodyMessage = this.generateEmailMessage(userDetails);
    const mailLink = `mailto:office@melizzalifescience.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyMessage)}`;
    
    // Open email client with pre-filled content
    window.open(mailLink, '_blank');
    
    // Return observable for consistency with the component
    return new Observable(observer => {
      setTimeout(() => {
        console.log('Email client opened with data:', {
          subject,
          body: bodyMessage,
          userDetails
        });
        observer.next({ success: true, message: 'Email client opened successfully' });
        observer.complete();
      }, 500);
    });
  }

  private generateEmailMessage(userDetails: UserDetails): string {
    return `New brochure download request received:

Name: ${userDetails.name}
Company: ${userDetails.company}
Email: ${userDetails.email}
Mobile: ${userDetails.mobile}
Requested PDF: ${userDetails.pdfName}
Description: ${userDetails.description || 'No description provided'}

Please send the PDF file to the user.

---
This request was generated from the Melizza Life Science website.`;
  }
}
