import { disk_usage } from '../../main';
import assert from 'assert';
import { describe } from 'node:test';

describe('main', {}, async () => {
    try {
        const result = await disk_usage();
        console.log(result);
        assert(!!result.length, 'Should list all disks');
    } catch (e) {
        assert(!e, 'Should not throw error');
    }
});
