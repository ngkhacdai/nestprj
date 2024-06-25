import { UsersService } from './../users/users.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address, AddressDocument } from 'src/schema/address.schema';
import { Information } from 'src/schema/information.schema';

@Injectable()
export class AddressService {
    constructor(
        @InjectModel(Address.name) private addressModel: Model<AddressDocument>,

    ) { }

    async getAddressById(id: string, user) {

        if (user.address === null) {
            return null
        } else {

            const addressExists = user.information.address.map((address) => address.toString() === id);
            if (!addressExists) {
                return null;
            }

            const address = await this.addressModel.findById(id);

            return address;
        }

    }
}
