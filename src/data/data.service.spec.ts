import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from './data.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Data } from './entities/data.entity';
import { Repository } from 'typeorm';
import { CreateDataDto } from './dto/create-data.dto';

describe('DataService', () => {
  let service: DataService;
  let repository: jest.Mocked<Repository<Data>>;

  beforeEach(async () => {
    const mockRepository = {
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataService,
        {
          provide: getRepositoryToken(Data),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DataService>(DataService);
    repository = module.get(getRepositoryToken(Data));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new data entry', async () => {
      const createDto: CreateDataDto = {
        firstName: 'Jozo',
        lastName: 'Mrkvicka',
        email: 'jozo@email.com',
        password: 'password123',
      };
      const expectedResult: Data = { id: 1, ...createDto };

      repository.save.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);
      expect(result).toEqual(expectedResult);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(createDto),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of data', async () => {
      const expectedResult: Data[] = [
        {
          id: 1,
          firstName: 'Jozo',
          lastName: 'Mrkvicka',
          email: 'jozo@email.com',
          password: 'password123',
        },
        {
          id: 2,
          firstName: 'Jozina',
          lastName: 'Mrkvickova',
          email: 'jozina@email.com',
          password: 'password456',
        },
      ];

      repository.find.mockResolvedValue(expectedResult);

      const result = await service.findAll();
      expect(result).toEqual(expectedResult);
      expect(repository.find).toHaveBeenCalledWith({
        select: ['id', 'firstName', 'lastName', 'email'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a data entry', async () => {
      const id = 1;
      const expectedResult: Data = {
        id,
        firstName: 'Jozo',
        lastName: 'Mrkvicka',
        email: 'jozo@email.com',
        password: 'password123',
      };

      repository.findOneBy.mockResolvedValue(expectedResult);

      const result = await service.findOne(id);
      expect(result).toEqual(expectedResult);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id });
    });
  });

  describe('update', () => {
    it('should update and return data', async () => {
      const id = 1;
      const updateDto: {
        firstName: string;
        lastName: string;
        password: string;
        email: string;
      } = {
        firstName: 'Jozina',
        lastName: 'Mrkvickova',
        email: 'jozina@email.com',
        password: 'password456',
      };
      const expectedResult: Data = { id, ...(updateDto as Data) };

      const existingData: Data = {
        id,
        firstName: 'OldFirstName',
        lastName: 'OldLastName',
        email: 'old@email.com',
        password: 'oldpassword123',
      };
      repository.findOneBy.mockResolvedValue(existingData);

      repository.save.mockResolvedValue(expectedResult);

      const result = await service.update(id, updateDto);
      expect(result).toEqual(expectedResult);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id });
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ id, ...updateDto }),
      );
    });
  });
});
