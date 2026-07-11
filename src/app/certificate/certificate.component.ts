import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  description: string;
  image: string;          // thumbnail
  fullImage: string;      // full certificate image (for modal)
  status: string;
  expiry: string;
}

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent {
  modalOpen = false;
  selectedCert: Certificate | null = null;

  certificates: Certificate[] = [
    {
      id: 'fssai',
      name: 'FSSAI Certified',
      issuer: 'Food Safety and Standards Authority of India',
      description: 'Licensed to manufacture, store, and distribute food products in compliance with Indian food safety regulations.',
      image: 'assets/img/FSSAI certificate.png',
      fullImage: 'assets/img/FSSAI certificate.png',
      status: 'Active',
      //expiry: 'Valid until 2027'
      expiry: ''
    },
    {
      id: 'halal',
      name: 'HALAL Certified',
      issuer: 'Buoyant Cert UK Limited',
      description: 'Certified for manufacturing and exporting Nutraceutical, Pharmaceutical, Ayurvedic, Cosmetic, FMCG and Food products according to Islamic Procedure.',
      image: 'assets/img/Halal Certificate.png',
      fullImage: 'assets/img/Halal Certificate.png',
      status: 'Active',
      //expiry: 'Valid until 2028'
      expiry: ''
    },
    {
      id: 'iec',
      name: 'Import Export Code (IEC)',
      issuer: 'Directorate General of Foreign Trade, India',
      description: 'Registered IEC holder, authorised to export pharmaceutical and healthcare products to global markets.',
      image: 'assets/img/Import Export code.png',
      fullImage: 'assets/img/Import Export code.png',
      status: 'Active',
      //expiry: 'Permanent (valid until surrender)'
      expiry: ''
    },
    {
      id: 'qms',
      name: 'QMS Certified (ISO 9001:2015)',
      issuer: 'International Organization for Standardization',
      description: 'Quality Management System certification ensuring consistent quality, continuous improvement, and customer satisfaction.',
      image: 'assets/img/QMS certificate.png',
      fullImage: 'assets/img/QMS certificate.png',
      status: 'Active',
      //expiry: 'Valid until 2027'
      expiry: ''
    },
    {
      id: 'who-gmp',
      name: 'WHO-GMP Certified',
      issuer: 'World Health Organization',
      description: 'Good Manufacturing Practice certification for pharmaceutical production, ensuring international quality and safety standards.',
      image: 'assets/img/WHO GMP certificate.png',
      fullImage: 'assets/img/WHO GMP certificate.png',
      status: 'Active',
      //expiry: 'Valid until 2028'
      expiry: ''
    }
  ];

  openModal(certId: string): void {
    const cert = this.certificates.find(c => c.id === certId);
    if (cert) {
      this.selectedCert = cert;
      this.modalOpen = true;
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal(): void {
    this.modalOpen = false;
    this.selectedCert = null;
    document.body.style.overflow = '';
  }
}