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
            attribute.options.map((option) => {
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
}
