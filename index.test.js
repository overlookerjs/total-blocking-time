const { calcTBT } = require('./index.js');

const longTasks = [
    {
        startTime: 648.4050000202842,
        duration: 372
    },
    {
        startTime: 7407.430000021122,
        duration: 57
    },
    {
        startTime: 7862.395000003744,
        duration: 66
    }
];

describe('test TBT', () => {
    it('long tasks before FCP are present, long tasks after tti are not present', () => {
        expect(calcTBT(8000, longTasks, 1300)).toBe(23);
    });
    it('long tasks before FCP are not present, long tasks after tti are not present', () => {
        expect(calcTBT(8000, longTasks, 600)).toBe(345);
    });
    it('long tasks before FCP are present, long tasks after tti are present', () => {
        expect(calcTBT(7500, longTasks, 1300)).toBe(7);
    });
    it('long tasks before FCP are not present, long tasks after tti are present', () => {
        expect(calcTBT(7500, longTasks, 600)).toBe(329);
    });
    it('no long tasks', () => {
        expect(calcTBT(3000, [], 1200)).toBe(0);
    });
    it('a long task started before FCP and ended after FCP', () => {
        expect(calcTBT(3000, [{
            startTime: 1100,
            duration: 300
        }], 1200)).toBe(150);
    });
    it('TTI is in the middle of a long task', () => {
        expect(calcTBT(2000, [{
            startTime: 1949,
            duration: 151
        }], 1000)).toBe(1);

        expect(calcTBT(2000, [{
            startTime: 1900,
            duration: 300
        }], 1000)).toBe(50);

        expect(calcTBT(2000, [{
            startTime: 1950,
            duration: 150
        }], 1000)).toBe(0);
    });
    it('no tbt if TTI less than FCP', () => {
        expect(calcTBT(3000, [{
            startTime: 1949,
            duration: 151
        }], 4000)).toBe(0);
    })
});
