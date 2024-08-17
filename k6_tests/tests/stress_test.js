import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';

// Метріки
const responseTime = new Trend('http_req_duration', true);
const successRate = new Rate('success_rate');
const errorCount = new Counter('errors');

export const options = {
    stages: [
        { duration: '2m', target: 100 }, 
        { duration: '5m', target: 200 }, 
        { duration: '5m', target: 300 },  
        { duration: '5m', target: 400 },  
        { duration: '5m', target: 500 },  
        { duration: '10m', target: 500 }, 
        { duration: '5m', target: 100 },  
        { duration: '2m', target: 0 },   
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], 
        success_rate: ['rate>0.95'], 
    },
};

export default function () {
    let res = http.get('http://localhost:3000');

    const success = check(res, {
        'status is 200': (r) => r.status === 200,
    });

    successRate.add(success);
    if (!success) {
        errorCount.add(1);
    }

    responseTime.add(res.timings.duration, { stage: __ENV.K6_STAGE });

    sleep(1);
}
