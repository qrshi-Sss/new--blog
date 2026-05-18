# FROM node:20-alpine
FROM node:20-alpine

# 设置容器内工作目录为/app
WORKDIR /app

# 配置时区为上海
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone

# 复制.next目录到容器内./next目录(/app/next)
COPY .next ./.next
COPY public ./public
COPY package*.json  pnpm-lock.yaml ./

# 安装依赖(--prod 只安装生产环境依赖)
RUN npm install -g pnpm && pnpm install --prod --ignore-scripts

EXPOSE 3000
CMD ["npm", "run", "start"]
