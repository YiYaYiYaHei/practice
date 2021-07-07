const cabinetList = {
    "status": 200,
    "description": "成功",
    "data": [
        {cabinetId: '通用机柜', cabinetType: 'ordinary', cabinetLabel: '通用机柜', cabinetWidth: 1, cabinetDeep: 1, cabinetDisX1: 0.2, cabinetDisY1: 2, cabinetDisX2: 0.2, cabinetDisY2: 2, cabinetHeight: 400, cabinetOrientation: 'X', state: 1},
        {cabinetId: '1-1-01', cabinetType: 'ordinary', cabinetLabel: '1-1-01', cabinetWidth: 1, cabinetDeep: 1, cabinetDisX1: 0.2, cabinetDisY1: 2, cabinetDisX2: 0.2, cabinetDisY2: 2, cabinetHeight: 80, cabinetOrientation: 'X', state: 2},
        {cabinetId: '1-1-02', cabinetType: 'ordinary', cabinetLabel: '1-1-02', cabinetWidth: 3, cabinetDeep: 4, cabinetDisX1: 4, cabinetDisY1: 2, cabinetDisX2: 2, cabinetDisY2: 2, cabinetHeight: 80, cabinetOrientation: 'X', state: 2},
        {cabinetId: '1-1-03', cabinetType: 'ordinary', cabinetLabel: '1-1-03', cabinetWidth: 4, cabinetDeep: 5, cabinetDisX1: 5, cabinetDisY1: 2, cabinetDisX2: 2, cabinetDisY2: 2, cabinetHeight: 80, cabinetOrientation: 'X', state: 2},
        {cabinetId: '1-1-04', cabinetType: 'ordinary', cabinetLabel: '1-1-04', cabinetWidth: 5, cabinetDeep: 6, cabinetDisX1: 6, cabinetDisY1: 2, cabinetDisX2: 2, cabinetDisY2: 2, cabinetHeight: 80, cabinetOrientation: 'X', state: 3},
        {cabinetId: '1-1-05', cabinetType: 'ordinary', cabinetLabel: '1-1-05', cabinetWidth: 6, cabinetDeep: 7, cabinetDisX1: 7, cabinetDisY1: 2, cabinetDisX2: 2, cabinetDisY2: 2, cabinetHeight: 80, cabinetOrientation: 'X', state: 4},
        {cabinetId: 'Y通用机柜', cabinetType: 'ordinary', cabinetLabel: 'Y通用机柜', cabinetWidth: 1.8, cabinetDeep: 0.8, cabinetDisX1: 2, cabinetDisY1: 0.2, cabinetDisX2: 2, cabinetDisY2: 0.2, cabinetHeight: 400, cabinetOrientation: 'Y', state: 5},
        {cabinetId: 'Y1-1-06', cabinetType: 'ordinary', cabinetLabel: 'Y1-1-06', cabinetWidth: 0.8, cabinetDeep: 0.8, cabinetDisX1: 2, cabinetDisY1: 0.2, cabinetDisX2: 2, cabinetDisY2: 0.2, cabinetHeight: 0.8, cabinetOrientation: 'Y', state: 3},
        {cabinetId: 'Y1-1-07', cabinetType: 'ordinary', cabinetLabel: 'Y1-1-07', cabinetWidth: 8, cabinetDeep: 9, cabinetDisX1: 4, cabinetDisY1: 2, cabinetDisX2: 2, cabinetDisY2: 2, cabinetHeight: 80, cabinetOrientation: 'Y', state: 6},
        {cabinetId: 'Y1-1-08', cabinetType: 'ordinary', cabinetLabel: 'Y1-1-08', cabinetWidth: 9, cabinetDeep: 10, cabinetDisX1: 2, cabinetDisY1: 2, cabinetDisX2: 2, cabinetDisY2: 2, cabinetHeight: 80, cabinetOrientation: 'Y', state: 6},
        {cabinetId: 'Y1-1-09', cabinetType: 'ordinary', cabinetLabel: 'Y1-1-09', cabinetWidth: 10, cabinetDeep: 11, cabinetDisX1: 2, cabinetDisY1: 2, cabinetDisX2: 2, cabinetDisY2: 2, cabinetHeight: 80, cabinetOrientation: 'Y', state: 2},
        {cabinetId: 'Y1-1-010',cabinetType: 'ordinary',  cabinetLabel: 'Y1-1-010', cabinetWidth: 11, cabinetDeep: 12, cabinetDisX1: 2, cabinetDisY1: 2, cabinetDisX2: 2, cabinetDisY2: 2, cabinetHeight: 80, cabinetOrientation: 'Y', state: 2},
        {cabinetId: 'Y1-1-011', cabinetType: 'ordinary', cabinetLabel: 'Y1-1-011', cabinetWidth: 12, cabinetDeep: 13, cabinetDisX1: 2, cabinetDisY1: 2, cabinetDisX2: 2, cabinetDisY2: 2, cabinetHeight: 80, cabinetOrientation: 'Y', state: 2},

    ]
};

const cabinetNetList = {
    "status": 200,
    "description": "成功",
    "data": {
        height: 3, // 该机柜里U位的高:比如机柜高100米，每个U位3米，则该机柜可放置100/3（33）个U位
        row: [
            {cabinetSlotLabel: 'switch 5', cabinetSlotId: '01', cabineHeight: 5}, // cabineHeight: U位高(此处为占多少个U位，5表示：id为01的U位，高3*5即15米)
            {cabinetSlotLabel: 'switch 1', cabinetSlotId: '02', cabineHeight: 1},
            {cabinetSlotLabel: 'switch 2', cabinetSlotId: '03', cabineHeight: 2},
            {cabinetSlotLabel: 'switch 11', cabinetSlotId: '04', cabineHeight: 1},
            {cabinetSlotLabel: 'switch 111', cabinetSlotId: '05', cabineHeight: 1},
            {cabinetSlotLabel: 'switch 1111switch 1111switch 1111switch 1111switch 1111switch 1111', cabinetSlotId: '06', cabineHeight: 1},
        ]
    }
}

module.exports = {
    cabinetList,
    cabinetNetList
};
