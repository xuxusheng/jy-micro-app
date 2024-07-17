#!/bin/bash

# 执行数据库迁移命令
#prisma migrate deploy --schema=./backend/schema.prisma

# 执行 dockerfile 中 CMD 命令
exec "$@"