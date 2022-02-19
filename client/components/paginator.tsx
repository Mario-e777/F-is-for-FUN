import React from 'react'
import Link from "next/link"

export default function Paginator({ pageSetState, pageState }) {
  return (
    <nav onClick={e => pageSetState({ ...pageState, currentPage: Object.values(e.target)[1].children })} >
      <span onClick={e => { pageSetState({ ...pageState, currentPage: parseInt(pageState.currentPage) - 1 }); e.stopPropagation(); }} >{'Prev'}</span>
      <Link href='/?page=1'><a className={pageState.currentPage == 1 && 'selected'} >1</a></Link>
      <span>|</span>
      <Link href='/?page=2'><a className={pageState.currentPage == 2 && 'selected'} >2</a></Link>
      <span>|</span>
      <Link href='/?page=3'><a className={pageState.currentPage == 3 && 'selected'} >3</a></Link>
      <span>|</span>
      <Link href='/?page=4'><a className={pageState.currentPage == 4 && 'selected'} >4</a></Link>
      <span onClick={e => { pageSetState({ ...pageState, currentPage: parseInt(pageState.currentPage) + 1 }); e.stopPropagation(); }} >{'Next'}</span>
    </nav>
  )
}
