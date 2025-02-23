import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { AccountService } from '../../../data/services/account.service';

@Component({
  selector: 'app-sub-to-news-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sub-to-news-form.component.html',
  styleUrl: './sub-to-news-form.component.scss'
})
export class SubToNewsFormComponent implements OnInit {
  authService =  inject(AuthService);
  accountService = inject(AccountService);
  subscribedToNews: boolean = false;
  
  subToNewsForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });
  
  
  ngOnInit(): void {
    this.subscribedToNews = localStorage.getItem('subscribedToNews') === 'true';
    if (!this.subscribedToNews) {
      this.authService.getAuthStatus().subscribe((status) => {
        this.subscribedToNews = !!status;
        if (this.subscribedToNews) {
          this.accountService.getAccount().subscribe((account) => {
            this.subscribedToNews = account.email_subscription_news;
          });
        }
      });
    }
  }

  onSubmit() {
    if (this.subToNewsForm.valid) {
      this.accountService.subscribeEmailToNews(this.subToNewsForm.value.email);
      localStorage.setItem('subscribedToNews', 'true');
    }
  }
}
