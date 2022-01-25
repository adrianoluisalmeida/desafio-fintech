import { UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RemoveMovementService } from './remove-movement.service';

describe('RemoveMovementService', () => {
  let service: RemoveMovementService;

  const mockAccountRepository = {
    getById: jest.fn(),
  };
  const mockMovementRepository = {
    create: jest.fn(),
  };
  const mockBalanceMovementService = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveMovementService,
        {
          provide: 'AccountRepositoryInterface',
          useValue: mockAccountRepository,
        },
        {
          provide: 'MovementRepositoryInterface',
          useValue: mockMovementRepository,
        },
        {
          provide: 'BalanceMovementServiceInterface',
          useValue: mockBalanceMovementService,
        },
      ],
    }).compile();

    service = module.get<RemoveMovementService>(RemoveMovementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('Error: should return a exception when does not to find account by id', async () => {
      const accountExists = false;
      const removeMovementMock = {
        value: 100,
        accountId: 'uuid-mock-account-id',
      };

      mockAccountRepository.getById.mockReturnValue(accountExists);

      const removeMovementResponse = service.execute(removeMovementMock);

      expect(removeMovementResponse).rejects.toBeInstanceOf(
        UnprocessableEntityException,
      );
    });

    it('Error: should return a exception when does not sending the param accountId and value', async () => {
      const removeMovementResponse = service.execute({
        accountId: null,
        value: null,
      });

      expect(removeMovementResponse).rejects.toBeInstanceOf(
        UnprocessableEntityException,
      );
    });

    it('Error: should return a exception when insufficient founds', async () => {
      const accountExists = true;
      const removeMovementMock = {
        value: 100,
        accountId: 'uuid-mock',
      };
      mockAccountRepository.getById.mockReturnValue(accountExists);
      mockBalanceMovementService.execute.mockReturnValue(1);
      const removeMovementResponse = service.execute(removeMovementMock);
      expect(removeMovementResponse).rejects.toBeInstanceOf(
        UnprocessableEntityException,
      );
    });
    it('Success: should add movement', async () => {
      const accountExists = true;
      const removeMovementMock = {
        value: 100,
        accountId: '61eff7e1c6455d376e602551',
      };
      mockAccountRepository.getById.mockReturnValue(accountExists);
      mockMovementRepository.create.mockReturnValue(true);
      mockBalanceMovementService.execute.mockReturnValue(
        removeMovementMock.value,
      );
      await service.execute(removeMovementMock);
      expect(mockMovementRepository.create).toHaveBeenCalledTimes(1);
    });
  });
});
