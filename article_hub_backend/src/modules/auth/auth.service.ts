import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { User } from './interface/user';

@Injectable()
export class AuthService {

  constructor(private readonly authRepository: AuthRepository, private readonly jwtService: JwtService) { }

  async signup(createUserDto: CreateUserDto): Promise<User> {

    const existingUser = await this.authRepository.findByEmail(createUserDto.emailAddress);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    createUserDto.password = hashedPassword;

    const user = await this.authRepository.create(createUserDto);

    const payload = { emailAddress: user.emailAddress, sub: user.id };

    return { ...user, accessToken: this.jwtService.sign(payload), };
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {

    const existingUser = await this.authRepository.findByEmail(loginUserDto.emailAddress);

    if (bcrypt.compareSync(loginUserDto.password, existingUser.password)) {

      const payload = { emailAddress: existingUser.emailAddress, sub: existingUser.id };

      return { ...existingUser, accessToken: this.jwtService.sign(payload), };
    }

    throw new BadRequestException('Invalid credentials');
  }
}
