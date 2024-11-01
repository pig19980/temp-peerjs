import { Test, TestingModule } from '@nestjs/testing';
import { MyPeerService } from './my-peer.service';

describe('MyPeerService', () => {
  let service: MyPeerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyPeerService],
    }).compile();

    service = module.get<MyPeerService>(MyPeerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
