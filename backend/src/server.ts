import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import envConfig from './config/env';


const PORT = envConfig.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});