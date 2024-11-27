'use server';

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async(seconds: number = 0) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, seconds * 1000);
    });
};

export const toggleTodo = async(id: string, complete: boolean): Promise<Todo> => {

    // await sleep(3);

    const todo = await prisma.todo.findFirst({ where: { id }});

    if(!todo) {
        throw `Todo with id ${id} not found`;
    }

    const updatedTodo = await prisma.todo.update({ 
        where: { id }, 
        data: { complete },
    });

    revalidatePath('/dashboard/server-todos');

    return updatedTodo;

}

export const addTodo = async(description: string, userId: string) => {
    try {        
        const todo = await prisma.todo.create({ data: { description, userId } });

        revalidatePath('/dashboard/server-todos');

        return todo;
    } catch (error) {
        return {
            message: 'Error adding todo'
        }
    };
}

export const deleteCompleted = async(): Promise<void> => {
    try {
        const result = await prisma.todo.deleteMany({
            where: {
                complete: true
            }
        });

        revalidatePath('/dashboard/server-todos');

        return console.log({ message: 'All completed todos deleted successfully', result });
    } catch (error) {
        return console.log({ message: 'Internal server error' }, { status: 500 });
    }
}