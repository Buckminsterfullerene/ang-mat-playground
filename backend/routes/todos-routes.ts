import type { FastifyInstance, RouteShorthandOptions } from 'fastify';

// Define the shape of a single todo item
interface TodoItem {
  id: number;
  content: string;
}

// Define the response schema for the API
const opts: RouteShorthandOptions = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        start: { type: 'number', default: 1 },
        limit: { type: 'number', default: 10 }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                content: { type: 'string' }
              }
            }
          },
          hasMore: { type: 'boolean' }
        }
      }
    }
  }
};

// Function to generate a batch of dummy todo items
function generateTodos(startId: number, limit: number): TodoItem[] {
  const todos: TodoItem[] = [];
  for (let i = 0; i < limit; i++) {
    const id = startId + i;
    todos.push({
      id: id,
      content: `todo ${id}`
    });
  }
  return todos;
}

export default async function todoRoutes(server: FastifyInstance) {
  // GET endpoint to fetch a paginated list of todos
  server.get('/api/todos', opts, async (request, reply) => {
    // Cast the request query to our expected type
    const { start, limit } = request.query as { start: number, limit: number };

    const items = generateTodos(start, limit);

    // Simulate a total number of items (e.g., 1000 total items exist)
    const totalSimulatedItems = 1000;
    // Check if there are more items available to load
    const hasMore = (start + limit - 1) < totalSimulatedItems;

    return {
      items,
      hasMore
    };
  });
}
