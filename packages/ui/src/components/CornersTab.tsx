export interface TabItem {
    children?: TabItem[]
    key: string
    name: string
}

export const CornersTab = ({
                        currentTab,
                        item,
                        onClick
                    }: {
    currentTab: string
    item: TabItem
    onClick: (v: TabItem) => void
}) => {
    const childKey = item.children?.map((v) => v.key) || []

    return (
        <div
            className={
                'jy-corners_tab_border_box ' +
                ([item.key, ...childKey].includes(currentTab) ? 'active' : '')
            }
            onClick={() => onClick(item)}
        >
            {item.name}
            <div className={'jy-corners_tab_border_box_corner'} />
            <div className={'jy-corners_tab_border_box_corner'} />
            <div className={'jy-corners_tab_border_box_corner'} />
            <div className={'jy-corners_tab_border_box_corner'} />
        </div>
    )
}

