export enum AllUrls {
    // localIp = 'localhost',
    localIp = '192.168.0.101',
    // localIp = '10.60.11.75',

    BaseDataBaseApiUrl = `http://${localIp}:3005/api`,
    ProductCardsApiUrl = `${BaseDataBaseApiUrl}/products`,
    getProductApiUrl = `${BaseDataBaseApiUrl}/product`,
    ProductSizesApiUrl = `${BaseDataBaseApiUrl}/product-sizes`,
    CategoriesProducts = `${BaseDataBaseApiUrl}/categories`,
    ProductCardsCategoryApiUrl = `${BaseDataBaseApiUrl}/category`,

    AuthBaseApiUrl = `http://${localIp}:3006/api`,
    LoginApiUrl = `${AuthBaseApiUrl}/login`,
    RefreshTokenApiUrl = `${AuthBaseApiUrl}/refresh`,
    RegisterApiUrl = `${AuthBaseApiUrl}/register`,
    AccountApiUrl = `${AuthBaseApiUrl}/account/me`,
    EmailToSubscribeApiUrl = `${AuthBaseApiUrl}/email/subscribe`,
    

    CartBaseApiUrl = `http://${localIp}:3007/api`,
    GetCartApiUrl = `${CartBaseApiUrl}/cart`,
    SyncCartApiUrl = `${CartBaseApiUrl}/cart/sync`,
    UpdateItemApiUrl = `${CartBaseApiUrl}/cart/item`,
    PatchCartApiUrl = `${CartBaseApiUrl}/cart/items`,
    GetCartPricesApiUrl = `${CartBaseApiUrl}/cart/prices`,


    

    ImageProduct = '/assets/images/product-card-image/',
}