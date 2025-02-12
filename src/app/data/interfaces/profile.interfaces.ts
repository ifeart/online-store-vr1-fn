export interface Profile {
    id: number;
    email: string;
    phone_number: string;
    last_name: string;
    first_name: string;
    patronymic: string;
    country: string;
    full_address: string
    // email_Verified: boolean;
    // phone_Verified: boolean;
    email_subscription_news: boolean;
}