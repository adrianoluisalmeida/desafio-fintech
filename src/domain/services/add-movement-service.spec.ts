import { UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AddMovementService } from './add-movement.service';

describe('AddMovementService', () => {
  let service: AddMovementService;

  const mockAccountRepository = {
    getById: jest.fn(),
  };

  const mockMovementRepository = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddMovementService,
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

    service = module.get<AddMovementService>(AddMovementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('Error: should return a exception when does not to find account by id', async () => {
      const accountExists = false;
      const movementMock = {
        value: 1000,
        accountId: '61ef67747fed4d42907238ae',
        createdAt: '2022-01-25T02:59:00.527Z',
      };

      mockMovementRepository.create.mockReturnValue(movementMock);
      mockAccountRepository.getById.mockReturnValue(accountExists);

      const balanceByAccountId = service.execute({
        accountId: 'account-id-uuid',
        value: movementMock.value,
      });

      expect(balanceByAccountId).rejects.toBeInstanceOf(
        UnprocessableEntityException,
      );
    });

    it('Error: should return a exception when does not sending the param accountId and value', async () => {
      const accountExists = false;
      const movementMock = {};

      mockMovementRepository.create.mockReturnValue(movementMock);
      mockAccountRepository.getById.mockReturnValue(accountExists);

      const balanceByAccountId = service.execute({
        accountId: null,
        value: null,
      });

      expect(balanceByAccountId).rejects.toBeInstanceOf(
        UnprocessableEntityException,
      );
    });

    it('Success: should add movement', async () => {
      const accountExists = true;
      const movementMock = {
        value: 1000,
        accountId: '61ef67747fed4d42907238ae',
        createdAt: '2022-01-25T02:59:00.527Z',
      };
      mockMovementRepository.create.mockReturnValue(movementMock);
      mockAccountRepository.getById.mockReturnValue(accountExists);

      const addMovementServiceResponse = await service.execute({
        accountId: movementMock.accountId,
        value: movementMock.value,
      });

      expect(addMovementServiceResponse.accountId).toEqual(
        movementMock.accountId,
      );
      expect(mockMovementRepository.create).toHaveBeenCalledTimes(1);
    });
  });
});
