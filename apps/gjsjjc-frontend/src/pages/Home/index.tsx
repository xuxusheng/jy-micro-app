import React, { FC, useEffect, useState } from 'react'

import { Header } from 'shared-ui/components/Header'
import 'shared-ui/dist/css/index.css'
import { PolygonTab } from 'shared-ui/components/PolygonTab'

import { TabItem } from '../../interface/tabItem'
import styles from './index.module.scss'
import { Button, Input, Select, Table } from 'antd'
import { api } from '../../api'
import HistoryModal from './HistoryModal' // function formatDate(date: Date, format: string) {

// function formatDate(date: Date, format: string) {
//     const map: any = {
//         "M": date.getMonth() + 1, // 月份
//         "d": date.getDate(), // 日
//         "h": date.getHours(), // 小时
//         "m": date.getMinutes(), // 分
//         "s": date.getSeconds(), // 秒
//         "q": Math.floor((date.getMonth() + 3) / 3), // 季度
//         "S": date.getMilliseconds() // 毫秒
//     };
//     format = format.replace(/([yMdhmsqS])+/g, (all, t: any) => {
//         let v = map[t];
//         if (v !== undefined) {
//             if (all.length > 1) {
//                 v = "0" + v;
//                 v = v.slice(0, v.length - 2);
//             }
//             return v;
//         } else if (t === "y") {
//             return (date.getFullYear() + "").substr(4 - all.length);
//         }
//         return all;
//     });
//     return format;
// }

export const HomePage: FC = () => {
  const [areaData, setAreaData] = useState<string[]>([])
  const [deviceData, setDeviceData] = useState<string[]>([])
  const [tableData, setTableData] = useState<any>()
  const [topData, setTopData] = useState<any>()

  const [device, setDevice] = useState<string>('设备名')
  const [searchKey, setSearchKey] = useState<string>('')
  const [pageInfo, setPageInfo] = useState({
    pn: 1,
    ps: 10
  })
  const [loading, setLoading] = useState<boolean>(true)

  const [currentTab, setCurrentTab] = useState<string>(areaData?.[0])

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [currentData, setCurrentData] = useState<{
    deviceName: string
    dataName: string
    key: string
  }>({ deviceName: '', dataName: '', key: '' })

  const changeTab = (v: TabItem) => {
    setCurrentTab(v.key)
    setDevice(deviceData?.[0])
    setSearchKey('')
    setPageInfo((v) => ({ ...v, pn: 1 }))
    getMiddleScreenPage(
      {
        area: v.key,
        pn: 1,
        ps: pageInfo.ps,
        deviceName: deviceData?.[0],
        dataName: ''
      },
      true
    )
  }

  const getMiddleScreenPage = (
    { area, pn, ps, deviceName, dataName }: any,
    getTop?: boolean
  ) => {
    setLoading(true)
    api
      .getMiddleScreenPage({ pn, ps, deviceName, isTop: false, dataName })
      .then((res) => {
        setTableData(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })

    if (getTop) {
      api
        .getMiddleScreenPage({
          area,
          pn: 1,
          ps: 1000,
          deviceName: '',
          isTop: true,
          dataName: ''
        })
        .then((res) => {
          setTopData(res.data.data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  const columns = [
    {
      title: '设备名',
      dataIndex: 'deviceName',
      key: 'deviceName'
    },
    {
      title: '数据名',
      dataIndex: 'dataName',
      key: 'dataName'
    },
    {
      title: '当前值',
      dataIndex: 'value',
      key: 'value',
      render: (text: number) => {
        return text.toFixed(2)
      }
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit'
    },
    {
      title: '日最大值',
      dataIndex: 'max',
      key: 'max'
    },
    {
      title: '日最小值',
      dataIndex: 'min',
      key: 'min'
    },
    {
      title: '上送时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text: string) => {
        return text
      }
    },
    {
      title: '正常范围',
      dataIndex: 'range',
      key: 'range'
    },
    {
      title: '趋势',
      dataIndex: 'trend',
      key: 'trend',
      render: (_: any, v: any) => {
        return (
          <a
            onClick={() => {
              setOpenModal(true)
              setCurrentData({
                key: v.key,
                dataName: v.dataName,
                deviceName: v.deviceName
              })
            }}
          >
            查看
          </a>
        )
      }
    }
  ]

  useEffect(() => {
    Promise.allSettled([api.getAreaOptions(), api.getDeviceNameOptions()]).then(
      (res: any) => {
        const areaRes = res[0].value
        const deviceRes = res[1].value
        setAreaData(areaRes?.data?.data)
        setCurrentTab(areaRes?.data?.data?.[0])

        setDeviceData(deviceRes?.data?.data)
        setDevice(deviceRes?.data?.data?.[0])

        getMiddleScreenPage(
          {
            area: areaRes?.data?.data?.[0],
            pn: pageInfo.pn,
            ps: pageInfo.ps,
            deviceName: deviceRes?.data?.data?.[0],
            dataName: searchKey
          },
          true
        )
      }
    )
  }, [])

  const search = () => {
    getMiddleScreenPage({
      area: currentTab,
      pn: 1,
      ps: pageInfo.ps,
      deviceName: device,
      dataName: searchKey
    })
  }

  const reset = () => {
    setSearchKey('')
    setDevice(deviceData?.[0])
    getMiddleScreenPage({
      area: currentTab,
      pn: 1,
      ps: pageInfo.ps,
      deviceName: device,
      dataName: ''
    })
  }

  const changePage = (page: number, pageSize: number) => {
    setPageInfo({
      pn: page,
      ps: pageSize
    })
    getMiddleScreenPage({
      area: currentTab,
      pn: page,
      ps: pageSize,
      deviceName: device,
      isTop: false,
      dataName: searchKey
    })
  }

  return (
    <div className={styles.container}>
      <Header title={'关键数据检测'}>
        <div className={styles.tabWrap}>
          {areaData?.map((v, i) => (
            <PolygonTab
              currentTab={currentTab}
              item={{ key: v, name: v }}
              key={i}
              onClick={changeTab}
            />
          ))}
        </div>
      </Header>

      <div className={styles.contentWrap}>
        <div className={styles.dataWrap}>
          {topData?.items?.map((v: any, i: number) => (
            <div className={styles.dataItem} key={i}>
              <div className={styles.dataTitle}>
                {v.deviceName}.{v.dataName}({v.unit})：
              </div>
              <div>{v.value?.toFixed(2)}</div>
            </div>
          ))}
          {/*<div className={styles.dataItem}>*/}
          {/*  <div className={styles.dataTitle}>数据4：</div>*/}
          {/*  <div className={styles.dataTagSuccess}>正常</div>*/}
          {/*</div>*/}
          {/*<div className={styles.dataItem}>*/}
          {/*  <div className={styles.dataTitle}>数据4：</div>*/}
          {/*  <div className={styles.dataTagError}>异常</div>*/}
          {/*</div>*/}
        </div>

        <div className={styles.searchWrap}>
          <Select
            placeholder={'设备检索 '}
            options={deviceData?.map((v) => ({ key: v, value: v }))}
            style={{ width: '20%' }}
            value={device}
            onChange={(v) => setDevice(v)}
            getPopupContainer={(e) => e.parentElement}
          ></Select>
          <Input
            type="text"
            placeholder={'关键字检索'}
            style={{ width: '30%' }}
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <Button type={'primary'} onClick={search}>
            确认
          </Button>
          <Button type={'default'} onClick={reset}>
            重置
          </Button>
        </div>

        <div className={styles.tableWrap}>
          <Table
            dataSource={tableData?.items || []}
            columns={columns}
            bordered
            pagination={{
              size: 'small',
              total: tableData?.total,
              showSizeChanger: false,
              pageSize: pageInfo.ps,
              current: pageInfo.pn,
              onChange: changePage
            }}
            loading={loading}
          />
        </div>
      </div>

      <HistoryModal
        open={openModal}
        close={() => {
          setOpenModal(false)
        }}
        currentData={currentData}
      />
    </div>
  )
}
