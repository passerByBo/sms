const codeMap = {
    '有效': '#53E488',
    '修订': '#FCB496',
    '制定': '#4592E9',
    '作废': '#D13737',
    '院标降级使用': '#5D70AA'
}
export default function getColor(code) {
    const color = codeMap[code] || '#53E488';
    return color;
}