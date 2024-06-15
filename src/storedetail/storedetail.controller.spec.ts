import { Test, TestingModule } from '@nestjs/testing';
import { StoredetailController } from './storedetail.controller';

describe('StoredetailController', () => {
  let controller: StoredetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoredetailController],
    }).compile();

    controller = module.get<StoredetailController>(StoredetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
