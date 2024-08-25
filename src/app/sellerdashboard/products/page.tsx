import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductCreationDialog from '@/components/seller/ProductCreationDialog'
import ProductList from '@/components/seller/ProductList'
import React from 'react'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from 'next/navigation'
import { db } from '@/db'

interface Props {}

const Page = async() => {

    const { getUser } = getKindeServerSession()

    const user = await getUser()
    if(!user || !user.id) redirect("/auth-callback?origin=sellerdashboard")

    const dbUser = await db.user.findFirst({
      where: {id : user.id}
    })

  return (
    <>
    <MaxWidthWrapper>
        <ProductList/>
    </MaxWidthWrapper>
    </>
  )
}

export default Page