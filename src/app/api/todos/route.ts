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

    try {
        const { complete, description } = await postSchema.validate(await request.json());
        
        const todo = await prisma.todo.create({ data: { complete, description } });

        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json(error, {status: 400});
    };

}

export async function deleteAllTodos() {
    try {
        const result = await prisma.todo.deleteMany({});
        return result;
    } catch (error) {
        console.error('Error deleting todos:', error);
        throw error;
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const result = await deleteAllTodos();
        return NextResponse.json({ message: 'All todos deleted successfully', result });
    } catch (error) {
        console.error('Error in DELETE endpoint:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
