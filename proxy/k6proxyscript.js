import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

export let options = {
  duration: '30s',
  vus: 100
};

export let getErrorRate = new Rate('Errors');

export default function() {
  let res = http.get(`http://localhost:4000/display/song/${Math.round(Math.random() * (10000000 - 1) + 1)}`);
  check(res, {
    '200': res => res.status === 200
  }) || getErrorRate.add(1);
}