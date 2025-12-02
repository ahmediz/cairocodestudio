import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, tap } from 'rxjs/operators';
import { firstValueFrom, of } from 'rxjs';

@Component({
  selector: 'c-contact-form',
  imports: [InputTextModule, ReactiveFormsModule, TextareaModule, FloatLabelModule, ButtonModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactForm {
  http = inject(HttpClient);
  dialogRef = inject(DynamicDialogRef);
  messageService = inject(MessageService);

  contactForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    message: new FormControl('', [Validators.required]),
  });

  isSubmitting = signal(false);

  onSubmit(): void {
    if (this.contactForm.invalid || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    const formData = this.contactForm.value;

    firstValueFrom(this.http.post('/api/contact', formData).pipe(
      tap(() => {
        this.isSubmitting.set(false);
        this.dialogRef.close();
        this.messageService.add({ severity: 'success', summary: 'Received', detail: 'Thanks for contacting us! We will get back to you soon.' });
      }),
      catchError(() => {
        this.isSubmitting.set(false);
        return of(null);
      })
    ));
  }
}
