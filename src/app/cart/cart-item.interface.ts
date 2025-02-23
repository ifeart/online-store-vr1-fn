export interface CartItem {
    id: number;
    id_from_product: number;
    id_product: string;
    image: string;
    name: string;
    size: string;
    article: string;
    quantity: number;
    price?: number;
}
