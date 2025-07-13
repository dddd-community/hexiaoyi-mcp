import {getOnlyTimestamp} from "./time_util";
import {randomFloat} from "./random_util";

export function getRandomString(length: number): string {
    let randomStrings = '0123456789abcdefghijklmnopqrstuvwxyz';
    let strings = '';
    for (let i = 0; i < length; i++) {
        strings = strings + randomStrings.charAt(Math.floor(randomFloat() * randomStrings.length));
    }
    return strings;
}

export function getRandomUpperCharString(length: number): string {
    let randomStrings = 'abcdefghijklmnopqrstuvwxyz';
    let strings = '';
    for (let i = 0; i < length; i++) {
        strings = strings + randomStrings.charAt(Math.floor(randomFloat() * randomStrings.length));
    }
    return strings.toUpperCase();
}

export function generateUnique8CharString(): string {
    const timestamp: number = getOnlyTimestamp();
    const randomNumber: number = Math.floor(randomFloat() * 80000000000000) + 20000000000000;
    const combinedNumber: number = timestamp + randomNumber;
    let base36String: string = combinedNumber.toString(36).toUpperCase();
    if (base36String.length < 8) {
        base36String = base36String.padStart(8, '0');
    } else if (base36String.length > 8) {
        base36String = base36String.substring(0, 8);
    }
    return base36String;
}

export function isEthAddress(address: string): boolean {
    const ethAddressPattern: RegExp = /^(0[xX])?[0-9a-fA-F]{40}$/;
    return ethAddressPattern.test(address);
}

export function getLastChars(str: string, n: number): string {
    if (n <= 0) return "";
    if (str.length <= n) {
        return str;
    }
    return str.slice(-n);
}