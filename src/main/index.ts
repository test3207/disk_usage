import { execFile } from 'child_process';
import { platform } from 'os';

const currentPlatform = platform();

if (currentPlatform !== 'win32') {
    throw new Error(`Current platform ${currentPlatform} is not support yet.`);
}

export type UsageInfo = {
    driver: string;
    total: number;
    free: number;
};

export const disk_usage = async () => {
    return await new Promise<UsageInfo[]>((resolve, reject) => {
        execFile('powershell', ['Get-Volume'], async (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            const trim = (s: string) => {
                const arr = Array.from(s);
                let current = 1;
                for (let i = 1; i < arr.length; i++) {
                    if (arr[i - 1] === ' ') {
                        while (arr[i] === ' ' && i < arr.length) {
                            i++;
                        }
                    }
                    if (i < arr.length) {
                        arr[current] = arr[i];
                        current++;
                    }
                }
                arr.length = current;
                return arr.join('');
            };
            const formatSize = (s: string) => {
                if (s.endsWith('PB')) {
                    return parseFloat(s) * 1024 * 1024 * 1024 * 1024 * 1024;
                }
                if (s.endsWith('TB')) {
                    return parseFloat(s) * 1024 * 1024 * 1024 * 1024;
                }
                if (s.endsWith('GB')) {
                    return parseFloat(s) * 1024 * 1024 * 1024;
                }
                if (s.endsWith('MB')) {
                    return parseFloat(s) * 1024 * 1024;
                }
                if (s.endsWith('KB')) {
                    return parseFloat(s) * 1024;
                }
                return parseFloat(s);
            };
            const rows = stdout
                .split(`\r\n`)
                .filter((row) => {
                    return row !== '' && row[0] !== ' ';
                })
                .map(trim);
            rows.shift();
            rows.shift();
            resolve(
                rows.map((row) => {
                    const arr = row.split(' ');
                    return {
                        driver: arr[0],
                        total: formatSize(arr[arr.length - 2] + arr[arr.length - 1]),
                        free: formatSize(arr[arr.length - 4] + arr[arr.length - 3]),
                    };
                }),
            );
        });
    });
};
