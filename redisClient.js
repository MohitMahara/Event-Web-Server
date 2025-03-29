import { createClient } from 'redis';

export const client = createClient({
    username: 'default',
    password: 'YVm1hfxRnPkcyE4aAttSuHMOKHIsZtYk',
    socket: {
        host: 'redis-19901.crce182.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 19901
    }
});

client.on("connect", () => console.log("Connected to Redis cloud"));
client.on('error', err => console.log('Redis Client Error', err));

await client.connect();