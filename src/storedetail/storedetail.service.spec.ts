import { Test, TestingModule } from '@nestjs/testing';
import { StoredetailService } from './storedetail.service';

describe('StoredetailService', () => {
  let service: StoredetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoredetailService],
    }).compile();

    service = module.get<StoredetailService>(StoredetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
