import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

export let options = {
  duration: '60s',
  vus: 300
};

export let getErrorRate = new Rate('Errors');

export default function() {
  let res = http.post(`http://localhost:5001/display/comment/${Math.round(Math.random() * (10000000 - 1) + 1)}`);
  check(res, {
    '200': res => res.status === 200
  }) || getErrorRate.add(1);
}