import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";

export const metadata = {
 title: 'TODO List',
 description: 'SEO Title',
};

export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' }});

  return (
    <div>
      {/* TODO: form to add todos */}
      <TodosGrid todos={todos}/>
    </div>
  );
}