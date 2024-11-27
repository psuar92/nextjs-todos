import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {

    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
        data: {
            email: 'test1@mail.com',
            password: bcrypt.hashSync('123456'),
            roles: ['admin', 'user', 'super-user'],
            todos: {
                create: [
                    { description: 'Soul stone', complete: true },
                    { description: 'Power stone' },
                    { description: 'Time stone' },
                    { description: 'Space stone' },
                    { description: 'Reality stone' },
                ],
            },
        },
    });

    return NextResponse.json({ message: 'Seed executed.' });
};