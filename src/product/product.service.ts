import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Product, ProductDocument } from 'src/schema/product.schema';

@Injectable()
export class ProductService {
    constructor(private cloudinaryService: CloudinaryService, @InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    async createProduct(files, body, userId) {
        const result = []
        for (const file of files) {
            const upload = await this.cloudinaryService.uploadImage(file);
            result.push(upload.url);
        }
        if (!result) {
            throw new ForbiddenException('File upload failed')
        }
        const product_attributes = []
        let quantity = 0;
        const jsonObject = JSON.parse(body.product_attributes);
        jsonObject.map(attribute => {
            const att = {
                color: attribute.color,
                quantity: 0,
                options: []
            }
            let attr = attribute;
            if (typeof attribute !== 'object') {
                attr = JSON.parse(JSON.stringify(JSON.parse(attribute)))
            }
            attr.options.map((option) => {
                att.options.push({
                    size: option.size,
                    options_quantity: option.options_quantity,
                })
                att.quantity += option.options_quantity
                quantity += option.options_quantity;
            })
            product_attributes.push(att)
        })
        const newProduct = await this.productModel.create({
            product_name: body.product_name,
            product_thumb: result,
            product_description: body.product_description,
            product_slug: body.product_name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
            product_price: body.product_price,
            product_quantity: quantity,
            product_shop: userId,
            category: body.category,
            product_attributes: product_attributes,
        })
        return newProduct
    }

    async findOneProduct(productId) {
        const findProduct = await this.productModel.findOne({ _id: productId })
        return findProduct
    }

    async decrementQuantity(quantity: number, productId: string, color: string, size: string) {
        try {
            // Find the product by productId
            const product = await this.productModel.findById(productId);

            if (!product) {
                throw new Error('Product not found');
            }

            // Find the correct product_attribute object based on color
            const productAttribute = product.product_attributes.find(attr => attr.color === color);

            if (!productAttribute) {
                throw new Error('Product attribute not found');
            }

            // Find the correct options object based on size within productAttribute.options
            const option = productAttribute.options.find(opt => opt.size === size);

            if (!option) {
                throw new Error('Size option not found');
            }

            // Calculate new options_quantity
            const newQuantity = option.options_quantity - quantity;

            if (newQuantity < 0) {
                throw new Error('Quantity to decrement exceeds available quantity');
            }
            productAttribute.quantity = productAttribute.quantity - quantity;
            // Update the options_quantity for the found option
            option.options_quantity = newQuantity;
            product.product_quantity = product.product_quantity - quantity
            // Save the updated product document
            await product.save();

            return product; // Return the updated product document
        } catch (error) {
            // Handle errors appropriately
            console.error('Error updating quantity:', error);
            throw error;
        }
    }

}
