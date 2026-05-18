import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET

export async function POST(request: NextRequest) {
  try {
    const { secret, type, slug } = await request.json()

    // if (REVALIDATE_SECRET && secret !== REVALIDATE_SECRET) {
    //   return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    // }

    switch (type) {
      case 'category':
        revalidatePath('/categories')
        if (slug) {
          revalidatePath(`/docs/${slug}`)
        }
        break
      case 'doc':
        if (slug) {
          revalidatePath(`/docs/${slug}`)
        }
        revalidatePath('/categories')
        break
      case 'home':
        revalidatePath('/')
        break
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    return NextResponse.json({
      revalidated: true,
      type,
      slug,
      timestamp: Date.now(),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error', message: (error as Error).message },
      { status: 500 },
    )
  }
}
