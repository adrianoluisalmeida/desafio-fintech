import { UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BalanceMovementService } from './balance-movement.service';

describe('BalanceMovementService', () => {
  let service: BalanceMovementService;

  const mockAccountRepository = {
    getById: jest.fn(),
  };

  const mockMovementRepository = {
    balanceByAccountId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BalanceMovementService,
        {
          provide: 'AccountRepositoryInterface',
          useValue: mockAccountRepository,
        },
        {
          provide: 'MovementRepositoryInterface',
          useValue: mockMovementRepository,
        },
      ],
    }).compile();

    service = module.get<BalanceMovementService>(BalanceMovementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('Error: should return a exception when does not to find account by id', async () => {
      const accountExists = false;
      const balanceValueMock = 100;

      mockMovementRepository.balanceByAccountId.mockReturnValue(
        balanceValueMock,
      );
      mockAccountRepository.getById.mockReturnValue(accountExists);

      const balanceByAccountId = service.execute('account-id-uuid');

      expect(balanceByAccountId).rejects.toBeInstanceOf(
        UnprocessableEntityException,
      );
    });

    it('Error: should return a exception when does not sending the param accountId', async () => {
      const accountExists = false;
      const balanceValueMock = 100;

      mockMovementRepository.balanceByAccountId.mockReturnValue(
        balanceValueMock,
      );
      mockAccountRepository.getById.mockReturnValue(accountExists);

      const balanceByAccountId = service.execute(null);

      expect(balanceByAccountId).rejects.toBeInstanceOf(
        UnprocessableEntityException,
      );
    });

    it('Success: should be get balance movement', async () => {
      const balanceValueMock = 100;
      const accountExists = true;

      mockMovementRepository.balanceByAccountId.mockReturnValue(
        balanceValueMock,
      );
      mockAccountRepository.getById.mockReturnValue(accountExists);

      const balanceByAccountId = await service.execute('account-id-uuid');

      expect(balanceByAccountId).toEqual(balanceValueMock);
      expect(mockMovementRepository.balanceByAccountId).toHaveBeenCalledTimes(
        1,
      );
    });
  });
});
