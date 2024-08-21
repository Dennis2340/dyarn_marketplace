import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductList from '@/components/seller/ProductList'
import React from 'react'

interface Props {}

const Page = () => {
  return (
    <>
    <MaxWidthWrapper>
        <ProductList/>
    </MaxWidthWrapper>
    </>
  )
}

export default Page