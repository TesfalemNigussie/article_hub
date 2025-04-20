import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: any) {
        return this.prisma.user.create({ data });
    }

    async findByEmail(emailAddress: string) {
        return this.prisma.user.findUnique({ where: { emailAddress: emailAddress } });
    }
}
