import { UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountService } from './create-account.service';

describe('CreateAccountService', () => {
  let service: CreateAccountService;

  const mockAccountRepository = {
    getByCPF: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAccountService,
        {
          provide: 'AccountRepositoryInterface',
          useValue: mockAccountRepository,
        },
      ],
    }).compile();

    service = module.get<CreateAccountService>(CreateAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('Error: should return a exception when does not to find account by id', async () => {
      const accountExists = true;
      const accountMock = {
        name: 'Jon Snow',
        cpf: '000.000.000-00',
      };

      mockAccountRepository.getByCPF.mockReturnValue(accountExists);

      const createAccountResponse = service.execute(accountMock);

      expect(createAccountResponse).rejects.toBeInstanceOf(
        UnprocessableEntityException,
      );
    });

    it('Error: should return a exception when does not sending the param accountId and value', async () => {
      const createAccountResponse = service.execute({
        name: null,
        cpf: null,
      });

      expect(createAccountResponse).rejects.toBeInstanceOf(
        UnprocessableEntityException,
      );
    });

    it('Success: should add movement', async () => {
      const accountExists = null;
      const accountMock = {
        name: 'Jon Snow',
        cpf: '00000000000',
      };
      mockAccountRepository.create.mockReturnValue({
        ...accountMock,
        _id: '61eff7e1c6455d376e602551',
        createdAt: '2022-01-25T13:15:13.414Z',
      });
      mockAccountRepository.getByCPF.mockReturnValue(accountExists);

      const addMovementServiceResponse = await service.execute(accountMock);

      expect(addMovementServiceResponse.name).toEqual(accountMock.name);
      expect(mockAccountRepository.create).toHaveBeenCalledTimes(1);
    });
  });
});
