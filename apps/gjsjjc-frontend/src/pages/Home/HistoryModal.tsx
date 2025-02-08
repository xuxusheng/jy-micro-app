import {Modal} from "antd";
import {FC, useEffect, useRef} from "react";
import {api} from "../../api";
import dayjs from "dayjs";
import * as echarts from "echarts";

import styles from "./index.module.scss";
import {EChartsType} from "echarts";

interface Props {
    open: boolean;
    close: () => void;
    currentData: {
        deviceName: string;
        dataName: string;
        key: string;
    }
}

const HistoryModal: FC<Props> = ({open, close, currentData}) => {

    const chartRef = useRef<EChartsType>();

    const setChart = (data: { key: string, vals: { time: string, value: number }[] }) => {
        const chartDom = document.getElementById('chart');
        chartRef.current = echarts.init(chartDom);
        let option;

        const xAxisData = data.vals.map(v => dayjs(v.time).format('MM/DD HH:mm'));
        const seriesData = {
            data: data.vals,
            type: 'line',
            smooth: true,
            markPoint: {
                data: [
                    {type: 'max', name: 'Max', label: {color: 'rgb(255, 255, 255)'}},
                    {type: 'min', name: 'Min', label: {color: 'rgb(255, 255, 255)'}}
                ]
            },
        }

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
            series: [seriesData],
        };

        option && chartRef.current.setOption(option);
    }


    useEffect(() => {
        if (open && currentData.key) {
            const startTime = dayjs().subtract(1, 'day').toISOString();
            const endTime = dayjs().toISOString();
            api.getHistoryData({key: currentData.key, startTime, endTime}).then((res) => {


                setChart(res.data.data)
            }).catch((err) => {
                console.error(err)
            })
        }

    }, [open, currentData])

    useEffect(() => {
        return () => {
            chartRef.current?.dispose();
        }
    }, [])


    return <Modal title={currentData?.deviceName + ' ' + currentData?.dataName + " 趋势"} open={open} onCancel={close}
                  footer={null} width={'80vw'} wrapClassName={styles.modalWrap}>
        <div className={styles.historyModal} id={'chart'}/>
    </Modal>
}

export default HistoryModal;