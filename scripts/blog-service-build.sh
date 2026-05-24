#!/bin/bash

$APP_NAME
$APP_VERSION
$TAG_NAME

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# 切换到项目根目录
cd "$(cd "$SCRIPT_DIR/.." && pwd)"
cd apps/blog-service
PACKAGE_PATH="package.json"

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

# 打包应用
pnpm --filter blog-service run build

timestamp=`date +%Y%m%d%H%M%S`
TAG_NAME="$APP_NAME:$APP_VERSION-${timestamp}"
echo "TAG_NAME: $TAG_NAME"

# 构建Docker镜像
echo "当前目录: $(pwd)"
echo "开始构建Docker镜像: $TAG_NAME"

# --progress=plain 显示构建进度 --no-cache 不使用缓存
docker build --progress=plain --no-cache -f Dockerfile -t $TAG_NAME .
if [ $? -ne 0 ]; then
    echo "Docker镜像构建失败"
    exit 1
else
    echo "Docker镜像构建完成: $TAG_NAME"
fi