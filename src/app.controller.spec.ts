import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { DataService } from './data/data.service';
import { CreateDataDto } from './data/dto/create-data.dto';
import { Data } from './data/entities/data.entity';

describe('AppController', () => {
  let appController: AppController;
  let dataService: jest.Mocked<DataService>;

  beforeEach(async () => {
    const mockDataService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: DataService,
          useValue: mockDataService,
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    dataService = module.get(DataService);
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

      dataService.create.mockResolvedValue(expectedResult);

      const result = await appController.create(createDto);
      expect(result).toEqual(expectedResult);
      expect(dataService.create).toHaveBeenCalledWith(createDto);
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

      dataService.findAll.mockResolvedValue(expectedResult);

      const result = await appController.findAll();
      expect(result).toEqual(expectedResult);
      expect(dataService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single data entry', async () => {
      const id = 1;
      const expectedResult: Data = {
        id,
        firstName: 'Jozo',
        lastName: 'Mrkvicka',
        email: 'jozo@email.com',
        password: 'password123',
      };

      dataService.findOne.mockResolvedValue(expectedResult);

      const result = await appController.findOne(id.toString());
      expect(result).toEqual(expectedResult);
      expect(dataService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update and return the data entry', async () => {
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
        password: 'newpassword123',
      };
      const expectedResult: Data = { id, ...updateDto };

      dataService.update.mockResolvedValue(expectedResult);

      const result = await appController.update(id.toString(), updateDto);
      expect(result).toEqual(expectedResult);
      expect(dataService.update).toHaveBeenCalledWith(id, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove the data entry', async () => {
      const id = 1;
      const expectedResult = { raw: [], affected: 1 };

      dataService.remove.mockResolvedValue(expectedResult);

      const result = await appController.remove(id.toString());
      expect(result).toEqual(expectedResult);
      expect(dataService.remove).toHaveBeenCalledWith(id);
    });
  });
});
