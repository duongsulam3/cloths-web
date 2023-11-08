import { Key } from "readline";

interface Banner {
    id: number,
    img: string,
    caption: String,
}

interface Cloth {
    idCloth: string
    name: string
    img: Array[string]
    price: number
    oldPrice: number
    sale: string
    sold: number
    description: string
    currency: string
    category: string
}

interface SizesCloth {
    idSize: number
    isSelected: boolean
    size: string
}
