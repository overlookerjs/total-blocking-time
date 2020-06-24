const BLOCKING_TIME_THRESHOLD = 50;

const calcTBT = (tti, longTasks = [], fcp) => {
    if (tti <= fcp) 
        return 0;
    
    return longTasks.reduce((memo, curr) => {
        // a long task started before FCP and ended after FCP
        if (curr.startTime < fcp && curr.startTime + curr.duration >= fcp) {
            const afterFCPDuration = curr.duration - (fcp - curr.startTime);

            if (afterFCPDuration >= BLOCKING_TIME_THRESHOLD) {
                memo += afterFCPDuration - BLOCKING_TIME_THRESHOLD;
            }

            return memo;
        }

        // a long task started before TTI and ended after TTI
        if (curr.startTime < tti && curr.startTime + curr.duration > tti && tti - curr.startTime >= BLOCKING_TIME_THRESHOLD) {
            memo += tti - curr.startTime - BLOCKING_TIME_THRESHOLD;
            return memo;
        }

        if (curr.startTime < fcp || curr.startTime > tti || curr.duration <= BLOCKING_TIME_THRESHOLD) {
            return memo;
        }

        memo += curr.duration - BLOCKING_TIME_THRESHOLD;

        return memo;
    }, 0);
};

module.exports = {
    calcTBT
}