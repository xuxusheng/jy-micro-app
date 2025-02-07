FROM node:22-slim AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm i -g pnpm
WORKDIR /project

RUN apt update \
    && apt install -y openssl

RUN npm i -g @vercel/ncc

COPY .. .
RUN pnpm install && pnpm run build

# 打包
RUN ncc build apps/backend/dist/main.js -o app

FROM node:22-slim
EXPOSE 3000

# 设置时区
ENV TZ=Asia/Shanghai \
    DEBIAN_FRONTEND=noninteractive

RUN apt update \
    && apt install -y dumb-init openssl tzdata \
    && ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo ${TZ} > /etc/timezone \
    && dpkg-reconfigure --frontend noninteractive tzdata \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# 安装 prisma，用于数据库迁移
# RUN npm i -g prisma

WORKDIR /app

# 准备容器启动脚本
COPY --from=builder /project/app/ ./backend
#COPY --from=builder /project/apps/backend/prisma ./backend

# 复制前端静态资源
COPY --from=builder /project/apps/workflow-frontend/build/ ./frontend/shaoshan/whjyczlcqd
COPY --from=builder /project/apps/gjsjjc-frontend/build/ ./frontend/shaoshan/whjygjsjjcqd/
COPY --from=builder /project/apps/zhyp-frontend/build/ ./frontend/shaoshan/whjyzhypqd/
# 没有这一行的话，nestjs 中的 ServeStatic 会因为找不到 index.html 文件而报错退出
COPY --from=builder /project/apps/workflow-frontend/build/index.html ./frontend

COPY ./ci/entrypoint.sh /

ENTRYPOINT ["sh", "/entrypoint.sh"]
CMD ["dumb-init", "node", "backend/index.js"]
