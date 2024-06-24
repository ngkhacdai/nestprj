import { ProductService } from './../product/product.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from 'src/schema/cart.schema';
import { AddProductDto } from './dto/add-product.dto';
import { DeleteProductCart } from './dto/delete-product.dto';
import { UpdateCart } from './dto/update-product.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
        private productService: ProductService
    ) { }

    async addProductToCart(product: AddProductDto, userId) {
        const findProduct = await this.productService.findOneProduct(product.productId);
        let checkProduct = false
        findProduct.product_attributes.map((item) => {
            if (item.color === product.color) {
                item.options.map((item) => {
                    item.size === product.size
                    return checkProduct = true
                })
            }
        })
        if (!checkProduct) {
            throw new ForbiddenException('Product not found')
        }
        if (!findProduct) {
            throw new ForbiddenException('Product not found');
        }

        let findCart = await this.findCartByUserId(userId);
        if (!findCart) {
            findCart = await this.createCart(userId)
        }
        findCart.cart_products.map((item) => {
            if (item.productId.toString() === product.productId && item.color === product.color && item.size === product.size) {
                throw new ForbiddenException('Product already in cart');
            }
        });

        const cart = await this.cartModel.findOneAndUpdate(
            { _id: findCart._id },
            {
                $push: {
                    cart_products: {
                        productId: findProduct._id,
                        quantity: product.quantity,
                        color: product.color,
                        size: product.size,
                    }
                }
            },
            { new: true }
        );

        return cart;
    }

    async findCartByUserId(userId: string) {
        const findCart = await this.cartModel.findOne({ cart_userId: userId });
        return findCart;
    }

    async createCart(userId: string) {
        const newCart = new this.cartModel({ cart_userId: userId });
        return await newCart.save();
    }

    async updateQuantityProduct(userId: string, product: UpdateCart) {
        const findCart = await this.findCartByUserId(userId);
        if (!findCart) {
            throw new ForbiddenException('Cart not found');
        }
        if (product.quantity <= 0) {
            throw new ForbiddenException('Quantity must be greater than 0')
        }
        let cart =
            new Promise((resolve, reject) => {
                findCart.cart_products.map(async (item) => {
                    try {
                        if (item.productId.toString() === product.productId && item.color === product.color && item.size === product.size) {
                            resolve(await this.cartModel.findOneAndUpdate({ cart_userId: userId }, {
                                $set: {
                                    cart_products: {
                                        productId: item.productId,
                                        quantity: product.quantity,
                                        color: product.color,
                                        size: product.size,
                                    }
                                }
                            }, { new: true }))
                        }
                    } catch (error) {
                        reject(error);
                    }
                })
            })

        if (!cart) {
            throw new ForbiddenException('Product not found');
        }
        return cart
    }
    async deleteProduct(userId: string, product: DeleteProductCart) {
        const findCart = await this.findCartByUserId(userId);
        if (!findCart) {
            throw new ForbiddenException('Cart not found');
        }
        let cart = new Promise((resolve, reject) => {
            findCart.cart_products.map(async (item) => {
                if (item.productId.toString() === product.productId && item.color === product.color && item.size === product.size) {
                    resolve(await this.cartModel.findOneAndUpdate({ cart_userId: userId }, {
                        $pull: {
                            cart_products: {
                                productId: item.productId,
                                quantity: product.quantity,
                                color: product.color,
                                size: product.size,
                            }
                        }
                    }, { new: true }))
                }
            })
        })

        if (!cart) {
            throw new ForbiddenException('Product not found');
        }
        return cart
    }
}
