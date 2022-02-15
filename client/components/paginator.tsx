import React from 'react'
import Link from "next/link"

export default function Paginator() {
  return (
    <nav>
      <span>{'<'}</span>
      <Link href='/?page=1'><a className='selected'>1</a></Link>
      <span>|</span>
      <Link href='/?page=2'><a>2</a></Link>
      <span>|</span>
      <Link href='/?page=3'><a>3</a></Link>
      <span>|</span>
      <Link href='/?page=4'><a>4</a></Link>
      <span>{'>'}</span>
    </nav>
  )
}
