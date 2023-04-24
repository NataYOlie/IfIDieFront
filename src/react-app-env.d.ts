/// <reference types="react-scripts" />
declare module 'crypto' {
    export function createHash(algorithm: string): any;
    export function createHmac(algorithm: string, key: string | Buffer): any;
    export function createCipheriv(algorithm: string, key: Buffer, iv: Buffer): any;
    export function createDecipheriv(algorithm: string, key: Buffer, iv: Buffer): any;
}