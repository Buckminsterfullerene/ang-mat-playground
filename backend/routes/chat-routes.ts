import type { FastifyInstance, RouteShorthandOptions } from 'fastify';

// Function to handle route registration
// We don't need 'fastify-plugin' if we don't care about the encapsulation context
export default async function chatRoutes(server: FastifyInstance) {
  const opts: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            message: {
              type: 'string'
            }
          }
        }
      }
    }
  };

  server.get('/api/chat', opts, async (request, reply) => {
    return { message: 'Welcome to the Chat API' };
  });

  server.post('/api/chat/send', async (request, reply) => {
    // Handle sending a chat message
    return { status: 'Message sent' };
  });
}
