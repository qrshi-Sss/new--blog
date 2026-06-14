FROM nginx:1.24.0

# 设置容器内工作目录为/app
WORKDIR /app

# 配置时区为上海
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone

COPY apps/blog-admin/nginx.conf /etc/nginx/conf.d/default.conf
COPY apps/blog-admin/dist /usr/share/nginx/html
EXPOSE 80