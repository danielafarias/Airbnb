import { Injectable } from '@nestjs/common';
import { Propertie } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreatePropertieDto } from './dto/create-propertie.dto';

@Injectable()
export class PropertiesService {
    constructor(private prismaService: PrismaService) {}

    async create(createPropertieDto: CreatePropertieDto, userId: string): Promise<Propertie> {
        const createdPropertie = await this.prismaService.propertie.create({ 
            data: {
                title: createPropertieDto.title,
                price: createPropertieDto.price,
                description: createPropertieDto.description,
                imageUrl: createPropertieDto.imageUrl,
                User: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });

        return createdPropertie;
    };

    async readAll(): Promise<Propertie[]> {
        const properties = await this.prismaService.propertie.findMany();
        return properties;
    }
};
