let oldTimestamp = 0;

export function asyncSleep(time: number) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(time);
        }, time);
    })
}

export function nextTick(callback: Function) {
    return setTimeout(() => {
        callback();
    }, 0);
}


export function getOnlyTimestamp(): number {
    let timestamp = new Date().getTime();
    if (timestamp == oldTimestamp) {
        while (true) {
            let theTimestamp = new Date().getTime();
            if (theTimestamp != oldTimestamp) {
                timestamp = theTimestamp;
                break;
            }
        }
    }
    oldTimestamp = timestamp;
    return timestamp;
}

export function isInToday(targetTimestamp: number): boolean {
    const todayDate = new Date();
    const targetDate = new Date(targetTimestamp);

    const isSameYear = todayDate.getFullYear() === targetDate.getFullYear();
    const isSameMonth = todayDate.getMonth() === targetDate.getMonth();
    const isSameDay = todayDate.getDate() === targetDate.getDate();

    return isSameYear && isSameMonth && isSameDay;
}
