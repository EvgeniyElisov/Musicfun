import s from './Pagination.module.css'
import { PaginationNav } from './PaginationNav/PaginationNav'

type Props = {
    currentPage: number
    pagesCount: number
    onPageNumberChange: (page: number) => void
    isFetching: boolean
}

export const Pagination = ({ currentPage, pagesCount, onPageNumberChange, isFetching }: Props) => {
    return (
        <div className={s.container}>
            <PaginationNav
                current={currentPage}
                pagesCount={pagesCount}
                onChange={onPageNumberChange}
            />
            {isFetching && '⌛️'}
        </div>
    )
}