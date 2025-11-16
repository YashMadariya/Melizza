import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-download-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './download-modal.component.html',
  styleUrl: './download-modal.component.css'
})
export class DownloadModalComponent {
  @Input() isVisible = false;
  @Input() pdfName = '';
  @Input() pdfPath = '';
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<any>();

  userDetails = {
    name: '',
    company: '',
    email: '',
    mobile: '',
    description: ''
  };

  isSubmitting = false;

  onClose() {
    this.closeModal.emit();
    this.resetForm();
  }

  onSubmit() {
    debugger
    if (this.validateForm()) {
      this.isSubmitting = true;
      this.submitForm.emit({...this.userDetails, pdfName: this.pdfName, pdfPath: this.pdfPath });
      this.onClose();
    }
  }

  validateForm(): boolean {
    return !!(this.userDetails.name && 
              this.userDetails.company && 
              this.userDetails.email && 
              this.userDetails.mobile);
  }

  resetForm() {
    this.userDetails = {
      name: '',
      company: '',
      email: '',
      mobile: '',
      description: ''
    };
    this.isSubmitting = false;
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}

