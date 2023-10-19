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

  private excludeFields(excludeFields: (keyof User)[]) {
    // Get the list of all column names in the User entity
    const allColumnNames = this.usersRepository.metadata.columns.map(
      (column) => column.propertyName,
    ) as (keyof User)[];

    // Generate a list of fields to include by excluding the specified fields
    return allColumnNames.filter(
      (columnName: keyof User) => !excludeFields.includes(columnName),
    );
  }

  findAll(name?: string): Promise<User[]> {
    return this.usersRepository.find({
      where: {
        name,
      },
      select: this.excludeFields(['password']),
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
