export enum AllUrls {
    localIp = 'localhost',
    // localIp = '10.60.0.32',

    BaseDataBaseApiUrl = `http://${localIp}:3005/api`,
    ProductCardsApiUrl = `${BaseDataBaseApiUrl}/products`,
    ProductSizesApiUrl = `${BaseDataBaseApiUrl}/product-sizes`,
    CategoriesProducts = `${BaseDataBaseApiUrl}/categories`,
    ProductCardsCategoryApiUrl = `${BaseDataBaseApiUrl}/category`,

    AuthBaseApiUrl = `http://${localIp}:3006/api`,
    LoginApiUrl = `${AuthBaseApiUrl}/login`,
    RefreshTokenApiUrl = `${AuthBaseApiUrl}/refresh`,
    RegisterApiUrl = `${AuthBaseApiUrl}/register`,
    AccountApiUrl = `${AuthBaseApiUrl}/account/me`,

    CartBaseApiUrl = `${AuthBaseApiUrl}:3007/api`,
    GetCartApiUrl = `${CartBaseApiUrl}/cart`,
    SyncCartApiUrl = `${CartBaseApiUrl}/cart/sync`,
    UpdateCartApiUrl = `${CartBaseApiUrl}/cart/update`,
    UpdateItemApiUrl = `${CartBaseApiUrl}/cart/item`,
    

    ImageProduct = '/assets/images/product-card-image/',
}