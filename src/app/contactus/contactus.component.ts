import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
  inquiryForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  constructor(private fb: FormBuilder) {
    this.inquiryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[+\d\s\-()]{7,20}$/)]],
      subject: [''],
      message: ['']
    });
  }

  onSubmit(): void {
    if (this.inquiryForm.invalid) {
      // Mark all fields as touched to trigger error display
      Object.keys(this.inquiryForm.controls).forEach(key => {
        this.inquiryForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    const formData = this.inquiryForm.getRawValue();

    // Simulate an API call
    console.log('Submitting:', formData);

    setTimeout(() => {
      // Simulated success
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.inquiryForm.reset();

      // Optionally: send an actual email via a backend API
      // You can replace this with a POST to your API endpoint
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        this.submitSuccess = false;
      }, 5000);
    }, 1500);

    // Alternative: Use mailto: but keep the UI feedback
    // This is a hybrid approach – if you want to keep mailto:
    /*
    const fieldValues = this.inquiryForm.getRawValue();
    const bodyMsg = `Name: ${fieldValues.name}\nContact Number: ${fieldValues.phone}\nEmail: ${fieldValues.email}\nMessage: ${fieldValues.message}`;
    const mailLink = `mailto:office@melizzalifescience.com?subject=${encodeURIComponent(fieldValues.subject || 'Inquiry from Website')}&body=${encodeURIComponent(bodyMsg)}`;
    window.open(mailLink, '_blank');
    */
  }
}