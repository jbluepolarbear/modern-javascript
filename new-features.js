const range = function*(start, end) {
    for (let i = start; i < end; ++i) {
        yield i;
    }
};

for (const index of range(1, 5)) {
    console.log(`index ${index}`);
}
console.log(`indexes ${[...range(1, 5)]}`);

import { Coroutines, wait } from './coroutines.js';
const coroutines = new Coroutines();
coroutines.runCoroutine(function*() {
    let i = 0;
    while (true) {
        yield wait(10);
        console.log(`Hello ${i++}`);
    }
});
coroutines.updateForever();