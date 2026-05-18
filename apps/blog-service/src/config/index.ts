import { readFileSync } from 'fs'
import * as yaml from 'js-yaml'
import { join } from 'path'

function replaceEnvVars(content: string): string {
  return content.replace(/\$\{(\w+)\}/g, (_, key) => {
    return process.env[key] || ''
  })
}

export default () => {
  const fileContent = readFileSync(join(__dirname, `./${process.env.NODE_ENV}.yml`), 'utf8')
  const replacedContent = replaceEnvVars(fileContent)
  return yaml.load(replacedContent) as Record<string, any>
}
