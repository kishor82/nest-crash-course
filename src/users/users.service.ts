import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(name?: string): Promise<User[]> {
    return this.usersRepository.find({
      where: {
        name,
      },
    });
  }

  findOne(filter: Partial<User>): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        ...filter,
      },
    });
  }

  findById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);

    return this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: number) {
    const user = await this.findById(id);

    return this.usersRepository.remove(user);
  }
}
