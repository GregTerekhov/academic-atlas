import http from "k6/http";
import { check, sleep } from "k6";
import { Trend, Counter, Rate } from "k6/metrics";

// Метріки
const responseTime = new Trend("http_req_duration", true);
const successRate = new Rate("success_rate");
const errorCount = new Counter("errors");

export const options = {
  scenarios: {
    shared_iter_scenario: {
      executor: "shared-iterations",
      vus: 10,
      iterations: 100,
      startTime: "0s",
      thresholds: {
        http_req_duration: ["p(95)<200"],
      },
    },
    per_vu_scenario: {
      executor: "per-vu-iterations",
      vus: 10,
      iterations: 10,
      startTime: "10s",
      thresholds: {
        http_req_duration: ["p(95)<250"],
      },
    },
  },
  thresholds: {
    http_req_duration: ["avg<200"],
    success_rate: ["rate>0.95"], 
  },
};

export default function () {
  let res = http.get("http://localhost:3000");

  const success = check(res, {
    "status is 200": (r) => r.status === 200,
  });

  successRate.add(success);
  if (!success) {
    errorCount.add(1);
  }

  responseTime.add(res.timings.duration, { scenario: __ENV.K6_SCENARIO });

  sleep(Math.random() * 2);
}
