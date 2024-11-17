export const dynamic = 'force-dynamic';
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
    title: 'Server Actions',
    description: 'SEO Title',
};

export default async function ServerTodosPage() {

    const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });

    return (
        <>
            <span className="text-3xl">Server Actions</span>
            <div className="w-full px-3 mx-5 mb-5 mt-3">
                <NewTodo />
            </div>
            <TodosGrid todos={todos} />
        </>
    );
}