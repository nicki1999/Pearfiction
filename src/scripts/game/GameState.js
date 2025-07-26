export const GameState = {
    reelPositions: [0,0,0,0,0],
    updatedMatrix: Array.from({ length: 3 }, () => Array(5).fill("")),
    score: {
        winNumber: 0,
        winDetail: [],
    },
};
