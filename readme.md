# disk usage

This module is design to list all disks with a driver letter, and return an array of total/free disk space info.

Notice this module is for windows only now. Furthering support for MacOS/Linux is on going.

## install

`npm install @test3206/disk_usage`

## usage

### ts

```typescript
import { disk_usage } from '@test3206/disk_usage';

(async () => {
    console.log(await disk_usage());
})();

/*
[
  { driver: 'D', total: 2001111162552.32, free: 2001111162552.32 },        
  { driver: 'C', total: 509984416727.04, free: 297125837537.28 }
]
*/
```

### js

```javascript
const { disk_usage } = require('@test3206/disk_usage');

(async () => {
    console.log(await disk_usage());
})();
```
