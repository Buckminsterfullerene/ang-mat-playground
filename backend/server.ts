import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import cors from '@fastify/cors'; // Import CORS plugin
import chatRoutes from './routes/chat-routes.js';
import todoRoutes from './routes/todos-routes.js';

const server: FastifyInstance = Fastify({
  logger: true
});

// Register CORS: Allow requests from your Angular UI origin (default is usually 4200)
await server.register(cors, {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// Register the chat routes plugin
// Fastify automatically handles the scope and encapsulation
server.register(chatRoutes);
server.register(todoRoutes);

// Optional: Register other route files
// import dashboardRoutes from './routes/dashboard-routes';
// server.register(dashboardRoutes, { prefix: '/dashboard' }); // Can add prefixes here

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log('Server listening on http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
