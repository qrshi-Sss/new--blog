#!/bin/bash

APP_NAME=""
APP_VERSION=""
TAG_NAME=""
ACR_SERVER="crpi-k8j2sanblu4jpekl.cn-hangzhou.personal.cr.aliyuncs.com"
ACR_NAMESPACE="sqr-blog"

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# 切换到项目根目录
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"
PACKAGE_PATH="apps/blog-admin/package.json"

# 检查是否存在package.json文件
if [ ! -f "$PACKAGE_PATH" ]; then
    echo "错误: package.json 文件不存在"
    exit 1
else
    APP_NAME=$(grep -o '"name"[[:space:]]*:[[:space:]]*"[^"]*"' "$PACKAGE_PATH" | grep -o '"[^"]*"$' | tr -d '"')
    APP_VERSION=$(grep -o '"version"[[:space:]]*:[[:space:]]*"[^"]*"' "$PACKAGE_PATH" | grep -o '"[^"]*"$' | tr -d '"')
fi

echo "应用名称: $APP_NAME"
echo "应用版本: $APP_VERSION"

pnpm --filter blog-admin run build:prod

timestamp=$(date +%Y%m%d%H%M%S)
TAG_NAME="$ACR_SERVER/$ACR_NAMESPACE/$APP_NAME:$APP_VERSION-${timestamp}"
echo "TAG_NAME: $TAG_NAME"

# 构建Docker镜像（多阶段构建，构建过程在Docker内完成）
echo "当前目录: $(pwd)"
echo "开始构建Docker镜像: $TAG_NAME"

# --progress=plain 显示构建进度 --no-cache 不使用缓存
docker build -f apps/blog-admin/Dockerfile -t $TAG_NAME .
if [ $? -ne 0 ]; then
    echo "Docker镜像构建失败"
    exit 1
else
    echo "Docker镜像构建完成: $TAG_NAME"
fi

# 推送镜像到ACR
docker push $TAG_NAME

# 删除本地镜像
docker rmi $TAG_NAME

