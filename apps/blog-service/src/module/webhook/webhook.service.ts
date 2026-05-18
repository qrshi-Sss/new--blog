import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

interface RevalidatePayload {
  type: 'category' | 'doc' | 'home'
  slug?: string
}

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name)
  private readonly siteUrl: string
  private readonly revalidateSecret: string

  constructor(private readonly config: ConfigService) {
    this.siteUrl = this.config.get<string>('webhook.siteUrl') || ''
    this.revalidateSecret = this.config.get<string>('webhook.revalidateSecret') || ''
  }

  async revalidate(payload: RevalidatePayload) {
    if (!this.siteUrl) {
      this.logger.warn('webhook.siteUrl is not configured, skipping revalidation')
      return
    }

    try {
      const url = `${this.siteUrl}/api/revalidate`
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: this.revalidateSecret,
          ...payload
        })
      })

      const data = await response.json()
      this.logger.log(`Revalidated ${payload.type} ${payload.slug || ''}: ${JSON.stringify(data)}`)
      return data
    } catch (error) {
      this.logger.error(`Failed to revalidate ${payload.type}: ${error.message}`)
    }
  }

  async revalidateCategory(categoryId?: number | string) {
    return this.revalidate({
      type: 'category',
      slug: categoryId?.toString()
    })
  }

  async revalidateDoc(docId?: number | string) {
    return this.revalidate({
      type: 'doc',
      slug: docId?.toString()
    })
  }

  async revalidateHome() {
    return this.revalidate({ type: 'home' })
  }
}
