# 使用官方Node.js镜像作为基础
FROM node:20-alpine

WORKDIR /app

# 配置时区为上海
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone

# 复制构建的产物
COPY apps/blog-service/dist ./dist
COPY apps/blog-service/package*.json ./

# --prod 只安装生产环境依赖
RUN npm install -g pnpm && pnpm install --prod

EXPOSE 3333
CMD ["npm", "run", "start", "--", "--port", "3333"]
