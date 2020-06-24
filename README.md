# total-blocking-time
Measure total blocking time


## Usage

```
const {calcTBT} = require('total-blocking-time')

calcTBT(tti, longTasks, fcp)

```

Argument | Meaning 
--------- | -------
tti | time to interactive (in ms)
londTasks | array of long tasks (in ms)
fcp | first contentful paint (in ms)
