export class Coroutines {
    constructor() {
        this.__coroutines = [];
    }

    clear() {
        this.__coroutines = [];
    }

    runCoroutine(coroutine) {
        this.__coroutines.push(this.coroutine(coroutine));
    }

    updateForever() {
        setInterval(() => {
            this.update();
        }, 10);
    }

    update() {
        for (let i = 0; i < this.__coroutines.length;) {
            let routine = this.__coroutines[i];
            if (routine.next().done) {
                this.__coroutines.splice(i, 1);
                continue;
            }
            ++i;
        }
    }
    
    *coroutine(coroutineFunc) {
        const GeneratorFunction = function*(){}.constructor;
        const co = coroutineFunc();
        let yielded;
        let nextResult;
        do {
            yielded = co.next(nextResult);
            nextResult = null;
            if (yielded.value instanceof GeneratorFunction) {
                const subCo = coroutine(yielded.value);
                let subYielded;
                do {
                    subYielded = subCo.next();
                    yield;
                } while (!subYielded.done);
                nextResult = subYielded.value;
            } else if (Promise.resolve(yielded.value) === yielded.value) {
                let completed = false;
                yielded.value.then((result) => {
                    completed = true;
                    nextResult = result;
                })
                while (!completed) {
                    yield;
                }
            } else if (yielded.value instanceof Array) {
                nextResult = [];
                for (let item of yielded.value) {
                    if (Promise.resolve(item) === item) {
                        let completed = false;
                        item.then((result) => {
                            completed = true;
                            nextResult.push(result);
                        });
                        while (!completed) {
                            yield;
                        }
                    }
                } 
            } else {
                nextResult = yielded.value;
                yield;
            }
        } while (!yielded.done);
        return yielded.value;
    }
}

export const wait = (duration) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, duration * 1000);
    });
}