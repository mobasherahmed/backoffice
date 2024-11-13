import { Component, inject, Renderer2, signal, WritableSignal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../../core/services/storage.service';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../core/design-system/button/button.component';
import { LangSwitcherComponent } from '../../shared/components/lang-switcher/lang-switcher.component';
import { ButtonVariant } from '../../core/design-system/button/variants.enum';
import { ButtonSizes } from '../../core/design-system/button/sizes.enum';

@Component({
  selector: 'backoffice-login',
  standalone: true,
  imports: [TranslateModule,ReactiveFormsModule,ButtonComponent,LangSwitcherComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected storage = inject(StorageService);
  protected router = inject(Router);
  showPassword : WritableSignal<boolean> = signal<boolean>(false);
  loginForm: FormGroup;
  ButtonVariant = ButtonVariant;
  ButtonSizes = ButtonSizes;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const payload = {
        ...this.loginForm.value,
        role : 10
      }
      this.authService.login(payload).subscribe(response => {
        // Handle response here
        console.log("response",response);
        this.storage.setToken(response.token);
        this.router.navigate(['/overview']);
      });
    }
  }
}
