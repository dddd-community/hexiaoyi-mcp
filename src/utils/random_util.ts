import {randomBytes} from "node:crypto";

export function getRandomNumber(min: number, max: number): number {
    return Math.floor(secureRandomFloat() * (max - min + 1)) + min;
}

export function randomFloat() {
    return Math.random();
}

export function secureRandomFloat(inclusive: boolean = false) {
    let buffer: Buffer = randomBytes(4);
    let value: number = buffer.readUInt32BE(0);
    if (inclusive) {
        return value / 0xFFFFFFFF;
    } else {
        return value / 0x100000000;
    }
}
