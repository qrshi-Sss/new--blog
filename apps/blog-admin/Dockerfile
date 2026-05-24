FROM nginx:1.24.0

# 配置时区为上海
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone

# 复制项目文件到容器内./dist目录(/usr/share/nginx/html)
COPY ./dist /usr/share/nginx/html
EXPOSE 80