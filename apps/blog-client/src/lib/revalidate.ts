const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || ''
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

interface RevalidateOptions {
  type: 'category' | 'doc' | 'home'
  slug?: string
}

export async function triggerRevalidate({ type, slug }: RevalidateOptions) {
  try {
    const response = await fetch(`${SITE_URL}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: REVALIDATE_SECRET,
        type,
        slug,
      }),
    })

    if (!response.ok) {
      throw new Error(`Revalidate failed: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Revalidate error:', error)
    throw error
  }
}

export async function revalidateCategory(categoryId?: string) {
  return triggerRevalidate({ type: 'category', slug: categoryId })
}

export async function revalidateDoc(docId: string) {
  return triggerRevalidate({ type: 'doc', slug: docId })
}

export async function revalidateHome() {
  return triggerRevalidate({ type: 'home' })
}
