import {TreeDataNode} from "antd";

export const treeData: TreeDataNode[] = [
    {
        title: '关键参数',
        key: '0-0',
        selectable: false,
        children: [
            {
                title: '温度',
                key: '0-0-0',
                selectable: false,
                children: [
                    {title: '进阀温度', key: '0-0-0-0'},
                    {title: '出阀温度', key: '0-0-0-1'},
                    {title: '阀厅温度', key: '0-0-0-2'},
                    {title: '外冷环境温度', key: '0-0-0-3'},
                    {title: 'P01主泵电机温度', key: '0-0-0-4'},
                    {title: 'P02主泵电机温度', key: '0-0-0-5'},
                    {title: '冷却器出水温度', key: '0-0-0-6'},
                ],
            },
            {
                title: '流量',
                key: '0-0-1',
                selectable: false,
                children: [{title: '冷却水流量', key: '0-0-1-0'}, {title: '去离子水流量', key: '0-0-1-1'}],
            },
            {
                title: '压力',
                key: '0-0-2',
                selectable: false,
                children: [
                    {title: '进阀压力', key: '0-0-2-0'},
                    {title: '膨胀罐压力', key: '0-0-2-1'},
                    {title: '出阀压力', key: '0-0-2-2'},
                    {title: '主泵出水压力', key: '0-0-2-3'},
                    {title: '回水压力', key: '0-0-2-4'},
                ],
            },
            {
                title: '液位',
                key: '0-0-3',
                selectable: false,
                children: [{title: '原水罐液位', key: '0-0-3-0'}, {title: '膨胀罐液位', key: '0-0-3-1'}],
            },
            {
                title: '电导率',
                key: '0-0-4',
                selectable: false,
                children: [{title: '去离子水电导率', key: '0-0-4-1'}, {title: '冷却水电导率', key: '0-0-4-2'}],
            },
            {
                title: '主泵',
                key: '0-0-5',
            },
        ],
    },
];