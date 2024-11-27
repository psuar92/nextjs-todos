export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
    title: 'Server Actions',
    description: 'SEO Title',
};

export default async function ServerTodosPage() {

    const session = await getUserSessionServer();

    if(!session) redirect('/api/auth/signin');

    const todos = await prisma.todo.findMany({ 
        where: { userId: session.user?.id },
        orderBy: { description: 'asc' },
    });

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