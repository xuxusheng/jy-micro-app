import {FC, ReactElement} from "react";

interface Props {
    title: string;
    children?: ReactElement
}

export const Header: FC<Props> = ({title, children}) => {
    return (
        <div className='jy-header'>
            <div className='jy-header-title-wrap'>
                <div className='jy-header-title'>{title}</div>
            </div>

            <div className='jy-header-arrow-wrap'>
                <div className='jy-header-arrow-left'></div>
                <div className='jy-header-arrow-right'></div>
            </div>
            <div className={children ? 'jy-header-right-box-prune' : 'jy-header-right-box'}>
                {new Array(4).fill('').map((_, i) => (
                    <div className={'jy-header-right-box' + (i + 1)}></div>
                ))}
                {children}
            </div>
        </div>
    )
}

