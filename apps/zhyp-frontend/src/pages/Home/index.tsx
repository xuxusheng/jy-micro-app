import React, {FC, useEffect, useState} from 'react'
import * as echarts from 'echarts';


import {Header} from "shared-ui/components/Header";
import "shared-ui/dist/css/index.css"
import {PolygonTab} from "shared-ui/components/PolygonTab";
import {CornersTab} from "shared-ui/components/CornersTab";

import {TabItem} from "../../interface/tabItem";
import styles from "./index.module.scss";
import {api} from "../../api";
import {Button, DatePicker, Tree} from "antd";
import {treeData} from "./const";
import dayjs, {Dayjs} from "dayjs";

const {RangePicker} = DatePicker;


const getDefaultKey = (data: any) => {
    while (data.children) {
        data = data.children[0]
    }

    return data.key
}

const getAllParentKeys = (data: any): any => {
    let keys = [];
    for (let i = 0; i < data.length; i++) {
        keys.push(data[i].key)
        if (data[i].children) {
            keys = keys.concat(getAllParentKeys(data[i].children))
        }
    }

    return keys
}

export const HomePage: FC = () => {
    const [compareTab, setCompareTab] = useState<string>('compareT');

    const [areaData, setAreaData] = useState<string[]>([])
    const [currentTab, setCurrentTab] = useState<string>(
        areaData?.[0]
    )


    const [selectedKeys, setSelectedKeys] = useState<string[]>([getDefaultKey(treeData[0])])

    const [selectedDates, setSelectedDates] = useState<any>([dayjs().subtract(1, 'day'), dayjs()])


    const changeTab = (v: TabItem) => {
        setCurrentTab(v.key)
    }

    const setChart = (data: { key: string, vals: { time: string, value: number }[] }[]) => {
        const chartDom = document.getElementById('chart');
        const myChart = echarts.init(chartDom);
        let option;

        const xAxisData = data[0].vals.map(v => dayjs(v.time).format('MM/DD HH:mm'));
        const seriesData = data.map(v => ({
            data: v.vals,
            type: 'line',
            smooth: true,
            markPoint: {
                data: [
                    {type: 'max', name: 'Max', label: {color: 'rgb(255, 255, 255)'}},
                    {type: 'min', name: 'Min', label: {color: 'rgb(255, 255, 255)'}}
                ]
            },
        }))

        option = {
            xAxis: {
                type: 'category',
                data: xAxisData,
                axisPointer: {
                    show: true,
                    lineStyle: {
                        color: '#868686',
                        type: 'dashed',
                        opacity: 0.5,
                    }
                },
                axisLabel: {
                    color: 'rgb(255, 255, 255,0.7)',
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        color: '#868686',
                        type: 'dashed',
                        opacity: 0.4,
                        dashOffset: 2
                    }
                },
                axisLabel: {
                    color: 'rgb(255, 255, 255,0.7)',
                }
            },
            series: seriesData,
        };

        option && myChart.setOption(option);
    }

    const getChartData = ({key, startTime, endTime}: { key: string, startTime: string, endTime: string }) => {
        api.getChartData({
            key,
            startTime,
            endTime
        }).then((res) => {
            console.log(res.data)
            if (res.data.data) {
                console.log(res.data.data)
                setChart([res.data.data])
            }
        }).catch(err => {
            console.error(err)
        })
    }

    useEffect(() => {
        api.getAreaOptions().then((res) => {
            setAreaData(res?.data?.data)
            setCurrentTab(res?.data?.data?.[0])
        }).catch(err => {
            console.error(err)
        })

        getChartData({
            key: selectedKeys[0] || '',
            startTime: selectedDates[0].format('YYYY-MM-DD HH:mm:ss.SSS'),
            endTime: selectedDates[1].format('YYYY-MM-DD HH:mm:ss.SSS')
        })
    }, [])


    const onSelect = (selectedKeys: React.Key[], info: any) => {
        setSelectedKeys(selectedKeys as string[])
    };

    const search = () => {
        getChartData({
            key: selectedKeys[0] || '',
            startTime: selectedDates[0].format('YYYY-MM-DD HH:mm:ss.SSS'),
            endTime: selectedDates[1].format('YYYY-MM-DD HH:mm:ss.SSS')
        })
    }

    const reset = () => {
        setSelectedDates([])
    }

    return <div className={styles.container}>
        <Header title={'综合研判'}>
            <div className={styles.tab1Wrap}>
                <CornersTab currentTab={compareTab} item={{key: 'compareT', name: '时序对比分析'}}
                            onClick={(v: TabItem) => setCompareTab(v.key)}></CornersTab>
                <CornersTab currentTab={compareTab} item={{key: 'compareH', name: '横向对比分析'}}
                            onClick={(v: TabItem) => setCompareTab(v.key)}></CornersTab>
            </div>

            <div className={styles.tabWrap}>
                {areaData.map((v, i) => (
                    <PolygonTab currentTab={currentTab}
                                item={{key: v, name: v}}
                                key={i}
                                onClick={changeTab}/>
                ))}
            </div>
        </Header>
        <div className={styles.contentWrap}>
            <div className={styles.contentLeftWrap}>
                <Tree
                    showLine={false}
                    showIcon={false}
                    defaultExpandedKeys={getAllParentKeys(treeData)}
                    onSelect={onSelect}
                    treeData={treeData}
                    multiple
                    selectedKeys={selectedKeys}
                />
            </div>

            <div className={styles.contentRightWrap}>
                <div className={styles.timerWrap}>
                    <RangePicker
                        showTime={true}
                        format="YYYY-MM-DD HH:mm:ss"
                        onChange={(value) => {
                            setSelectedDates(value)
                        }}
                        value={selectedDates}
                    />
                    <Button type={'primary'} onClick={search}>确认</Button>
                    <Button type={'default'} onClick={reset}>重置</Button>
                </div>

                <div className={styles.chartWrap}>
                    <div className={styles.chartTitle}>进阀温度</div>

                    <div className={styles.chartContent} id={'chart'}></div>
                </div>

            </div>

        </div>


    </div>
}
