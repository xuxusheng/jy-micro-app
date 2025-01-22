export interface TabItem {
    children?: TabItem[]
    key: string
    name: string
}

export const PolygonTab = ({
                               currentTab,
                               item,
                               onClick
                           }: {
    currentTab: string
    item: TabItem
    onClick: (v: TabItem) => void
}) => {
    return (
        <div
            className={
                'jy-polygon_tab_border_box_wrap' +
                ' ' +
                (currentTab === item.key ? 'active' : '')
            }
            onClick={() => onClick(item)}
        >
            <div className={'jy-polygon_tab_border_box'}>{item.name}</div>
            {new Array(8).fill(0).map((_, i) => (
                <div className={'jy-polygon_tab_border_box' + (i + 1)}></div>
            ))}
        </div>
    )
}

