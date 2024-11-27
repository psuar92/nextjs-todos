import { getUserSessionServer } from '@/auth/actions/auth-actions';
import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const take = Number(searchParams.get('take') ?? '10');
    const skip = Number(searchParams.get('skip') ?? '0');

    if (isNaN(take)) {
        return NextResponse.json({ message: 'Take value has to be a number' }, { status: 400 });
    }

    if (isNaN(skip)) {
        return NextResponse.json({ message: 'Skip value has to be a number' }, { status: 400 });
    }

    const todos = await prisma.todo.findMany({
        take: take,
        skip: skip,
    });

    if(todos.length === 0) {
        return NextResponse.json({ message: 'There are no TODOS in the database'}, { status: 404 })
    }

    return NextResponse.json(todos);
}

const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {

    const user = await getUserSessionServer();

    if(!user) {
        return NextResponse.json('Not authorized', { status: 401 })
    }

    try {
        const { complete, description } = await postSchema.validate(await request.json());
        
        const todo = await prisma.todo.create({ data: { complete, description, userId: user.user!.id } });

        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json(error, {status: 400});
    };

}

export async function DELETE(request: NextRequest) {

    const user = await getUserSessionServer();

    if(!user) {
        return NextResponse.json('Not authorized', { status: 401 })
    }

    try {
        const result = await prisma.todo.deleteMany({
            where: {
                complete: true, userId: user.user?.id
            }
        });
        return NextResponse.json({ message: 'All completed todos deleted successfully', result });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}