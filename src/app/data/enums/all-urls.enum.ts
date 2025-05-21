export enum AllUrls {
    // localIp = '192.168.0.103',
    localIp = 'localhost',
    // localIp = '10.60.1.164',

    BaseDataBase = `http://${localIp}:3006/api`,
    ProductCards = `${BaseDataBase}/products`,
    getProduct = `${BaseDataBase}/product`,
    ProductSizes = `${BaseDataBase}/product-sizes`,
    CategoriesProducts = `${BaseDataBase}/categories`,
    ProductCardsCategory = `${BaseDataBase}/category`,

    AuthBase = `http://${localIp}:3006/api`,
    Login = `${AuthBase}/login`,
    RefreshToken = `${AuthBase}/refresh`,
    Register = `${AuthBase}/register`,
    Account = `${AuthBase}/account/me`,
    EmailToSubscribe = `${AuthBase}/email/subscribe`,
    Country = `${AuthBase}/countries`,
    

    CartBase = `http://${localIp}:3006/api`,
    GetCart = `${CartBase}/cart`,
    SyncCart = `${CartBase}/cart/sync`,
    UpdateItem = `${CartBase}/cart/item`,
    GetCartPrices = `${CartBase}/cart/prices`,

    ImageProduct = '/assets/images/product-card-image/',
}