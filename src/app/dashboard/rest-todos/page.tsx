export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
 title: 'TODO List',
 description: 'SEO Title',
};

export default async function RestTodosPage() {

  const session = await getUserSessionServer();

    if(!session) redirect('/api/auth/signin');

    const { user } = session;

    const todos = await prisma.todo.findMany({ 
        where: { userId: user?.id },
        orderBy: { description: 'asc' },
    });

  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos}/>
    </div>
  );
}