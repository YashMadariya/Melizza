import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {
  inquiryForm: FormGroup;
  isSubmit = false;
  constructor(private formBuilder: FormBuilder) {
    this.inquiryForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      phone: ['', [Validators.required]],
      message: [""]
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    this.isSubmit = true;
    if (this.inquiryForm.invalid) {
      return;
    }
    const fieldValues = this.inquiryForm.getRawValue();
    var bodymsg = "Name: "+fieldValues.name+"\nContact Number: "+fieldValues.phone+"\nEmail: "+fieldValues.email+"\nMessage: "+fieldValues.message+"";
    var mailLink = "mailto:office@melizzalifescience.com?subject="+fieldValues.subject+"&body="+bodymsg;
    window.open(encodeURI(mailLink),"_blank");
  }
}
