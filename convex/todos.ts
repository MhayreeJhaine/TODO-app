import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all todos (ordered by "order" field)
export const getTodos = query({
  args: {},
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").order("desc").collect();
    return todos;
  },
});

// Add a new todo
export const add = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("todos", {
      text: args.text,
      completed: false,
    });
  },
});

// Toggle completed
export const toggle = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new Error("Todo not found");
    await ctx.db.patch(args.id, { completed: !todo.completed });
  },
});

// Delete a todo
export const remove = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Clear all completed todos
export const clearCompleted = mutation({
  args: {},
  handler: async (ctx) => {
    const completed = await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("completed"), true))
      .collect();
    await Promise.all(completed.map((todo) => ctx.db.delete(todo._id)));
  },
});

// Reorder todos
export const reorder = mutation({
  args: {
    todos: v.array(
      v.object({
        _id: v.id("todos"),
        order: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    for (const { _id, order } of args.todos) {
      await ctx.db.patch(_id, { order });
    }
  },
});
