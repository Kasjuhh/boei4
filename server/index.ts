import { PrismaClient } from '@prisma/client';

let prismaClient = new PrismaClient();

export default async function server(): Promise<PrismaClient> {
    return prismaClient;
}