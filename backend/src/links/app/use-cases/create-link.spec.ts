import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLinkUseCase } from './create-link';

import { CreateLinkDto } from '../../dto/create-link.dto';
import { User } from '../../../users/domain/user.entity';
import { Link } from '../../domain/link.entity';

describe('CreateLinkUseCase', () => {
  let createLinkUseCase: CreateLinkUseCase;
  let linksRepository: Repository<Link>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateLinkUseCase,
        {
          provide: getRepositoryToken(Link),
          useClass: Repository,
        },
      ],
    }).compile();

    createLinkUseCase = module.get<CreateLinkUseCase>(CreateLinkUseCase);
    linksRepository = module.get<Repository<Link>>(getRepositoryToken(Link));
  });

  it('should be defined', () => {
    expect(createLinkUseCase).toBeDefined();
  });

  it('should create a new link', async () => {
    const createLinkDto: CreateLinkDto = {
      link: 'http://example.com',
      name: 'Example',
      icon: 'facebook',
    };
    const user: User = {
      id: '1',
      username: 'testuser',
      password: 'password',
      email: 'v@gmail.com',
      firstName: 'v',
      lastName: 'v',
      isActive: true,
    };

    const savedLink = {
      id: '1',
      ...createLinkDto,
      userId: user.id,
      isActive: true,
    };
    jest.spyOn(linksRepository, 'save').mockResolvedValue(savedLink);

    const result = await createLinkUseCase.execute(createLinkDto, user);

    expect(result).toEqual(savedLink);
    expect(linksRepository.save).toHaveBeenCalledWith({
      ...createLinkDto,
      userId: user.id,
    });
  });
});
