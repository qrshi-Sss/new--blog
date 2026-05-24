# 使用官方Node.js镜像作为基础
FROM node:20-alpine

WORKDIR /app

# 配置时区为上海
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone

# 直接复制已构建的产物
COPY dist ./dist
COPY package*.json ./

# --prod 只安装生产环境依赖
RUN npm install -g pnpm && pnpm install --prod

EXPOSE 8888
CMD ["npm", "run", "start"]





