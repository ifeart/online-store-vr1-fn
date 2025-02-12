import { Component, inject, OnInit, signal } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interfaces';
import { AccountService } from '../../data/services/account.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.scss'
})
export class AccountPageComponent implements OnInit{  
  accountService = inject(AccountService);
  authService = inject(AuthService);
  profile: Profile | null = null;
  isEmailNewsSubscription = signal<boolean>(false);

  profileForm: FormGroup = new FormGroup({
    email: new FormControl(null, []),
    phone_number: new FormControl(this.profile?.phone_number, [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]{7,15}$/)]),
    first_name: new FormControl(this.profile?.first_name, [Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ\s\-']{1,100}$/)]),
    last_name: new FormControl(this.profile?.last_name, [Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ\s\-']{1,100}$/)]),
    patronymic: new FormControl(this.profile?.patronymic, [Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ\s\-']{1,100}$/)]),
    country: new FormControl(this.profile?.country, [Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ\s\-']{1,100}$/)]), // СДЕЛАТЬ ВАЛИДАЦИЮ СТРАНЫ
    full_address: new FormControl(null, []), // СДЕЛАТЬ ВАЛИДАЦИЮ АДРЕСА 
    email_subscription_news: new FormControl(this.isEmailNewsSubscription, []),
  })

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
      this.accountService.getAccount().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.isEmailNewsSubscription.set(profile.email_subscription_news);

        this.profileForm.patchValue({
          email: profile.email,
          phone_number: profile.phone_number,
          first_name: profile.first_name,
          last_name: profile.last_name,
          patronymic: profile.patronymic,
          country: profile.country,
          full_address: profile.full_address,
          email_subscription_news: profile.email_subscription_news,
        });
      },
      error: (err) => {
        // console.error('Error fetching product cards:', err);
      },
      complete: () => {
        // console.log('account service completed'); 
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log("Form valid");
      this.accountService.updateAccount(this.profileForm.value).subscribe(
        response => {
          console.log(`Profile upd: ${response}`);
        },
        error => {
          console.log(`Profile upd error: ${error}`);
        }
      );
    } else {
      console.log(this.profileForm.valid);
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
