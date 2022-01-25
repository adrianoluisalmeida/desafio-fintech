import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TransferAccountService } from './transfer-account.service';

describe('TransferAccountService', () => {
  let service: TransferAccountService;

  const mockAccountRepository = {
    getById: jest.fn(),
  };
  const mockAddMovementService = {
    execute: jest.fn(),
  };
  const mockRemoveMovementService = {
    execute: jest.fn(),
  };
  const mockBalanceMovementService = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransferAccountService,
        {
          provide: 'AccountRepositoryInterface',
          useValue: mockAccountRepository,
        },
        {
          provide: 'AddMovementServiceInterface',
          useValue: mockAddMovementService,
        },
        {
          provide: 'BalanceMovementServiceInterface',
          useValue: mockBalanceMovementService,
        },
        {
          provide: 'RemoveMovementServiceInterface',
          useValue: mockRemoveMovementService,
        },
      ],
    }).compile();

    service = module.get<TransferAccountService>(TransferAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('Error: should return a exception when does not sending the param accountId and value', async () => {
      const transferAccountResponse = service.execute(null, {
        accountId: 'null',
        value: 1,
      });
      expect(transferAccountResponse).rejects.toBeInstanceOf(
        UnprocessableEntityException,
      );
    });

    it('Error: should return a exception when does not to find origin account by id', async () => {
      const accountExists = false;
      const mockOriginAccount = 'uuid-mock';
      const mockDestinationAccount = {
        accountId: 'null',
        value: 1,
      };

      mockAccountRepository.getById.mockReturnValue(accountExists);

      const removeMovementResponse = service.execute(
        mockOriginAccount,
        mockDestinationAccount,
      );

      expect(removeMovementResponse).rejects.toBeInstanceOf(
        UnprocessableEntityException,
      );
    });

    it('Error: should return a exception when insufficient founds', async () => {
      const accountExists = true;
      const mockOriginAccount = 'uuid-mock';
      const mockDestinationAccount = {
        accountId: 'null',
        value: 122,
      };
      mockAccountRepository.getById.mockReturnValue(accountExists);
      mockBalanceMovementService.execute.mockReturnValue(1);
      const removeMovementResponse = service.execute(
        mockOriginAccount,
        mockDestinationAccount,
      );
      expect(removeMovementResponse).rejects.toBeInstanceOf(
        UnprocessableEntityException,
      );
    });

    it('Error: should return a remove founds', async () => {
      const accountExists = true;
      const mockOriginAccount = 'uuid-mock';
      const mockDestinationAccount = {
        accountId: 'null',
        value: 122,
      };
      mockAccountRepository.getById.mockReturnValue(accountExists);
      mockRemoveMovementService.execute.mockImplementation(() => {
        throw new Error('error');
      });
      mockBalanceMovementService.execute.mockReturnValue(
        mockDestinationAccount.value,
      );
      const removeMovementResponse = service.execute(
        mockOriginAccount,
        mockDestinationAccount,
      );
      expect(removeMovementResponse).rejects.toBeInstanceOf(NotFoundException);
    });

    it('Sucess: should return a success transfer between accounts', async () => {
      const accountExists = true;
      const mockOriginAccount = 'uuid-mock';
      const mockDestinationAccount = {
        accountId: 'null',
        value: 122,
      };
      mockAccountRepository.getById.mockReturnValue(accountExists);
      mockRemoveMovementService.execute.mockReturnValue(true);
      mockAddMovementService.execute.mockReturnValue(true);
      mockBalanceMovementService.execute.mockReturnValue(
        mockDestinationAccount.value,
      );
      const transferResponse = await service.execute(
        mockOriginAccount,
        mockDestinationAccount,
      );
      expect(transferResponse).toEqual(true);
    });
  });
});
