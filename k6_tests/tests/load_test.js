import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

const responseTime = new Trend('custom_http_req_duration');

export const options = {
    vus: 500,
    duration: '3m',
    thresholds: {
        custom_http_req_duration: ['p(95)<200'], 
    },
};

export default function () {
    let res = http.get('http://nextjs:3000');

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    responseTime.add(res.timings.duration);

    sleep(Math.random() * 3);
}
