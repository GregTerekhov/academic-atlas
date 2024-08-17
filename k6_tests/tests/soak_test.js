import http from 'k6/http';
import { check, sleep, Trend } from 'k6';

const responseTime = new Trend('response_time');

export const options = {
    stages: [
        { duration: '10s', target: 100 },  
        { duration: '30s', target: 100 },   
        { duration: '10s', target: 0 },    
    ],
};

export default function () {
    const res = http.get('http://localhost:3000');

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    responseTime.add(res.timings.duration);

    sleep(1);
}
