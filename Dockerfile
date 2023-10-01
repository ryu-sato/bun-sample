#
# bun がインストールされたコンテナのベース
#
FROM node:18-slim as bun-base
SHELL ["/bin/bash", "-oeux", "pipefail", "-c"]

ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=${USER_UID}
ARG BUN_INSTALL=/bun

RUN apt-get update -y \
    && apt-get install -y build-essential unzip curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p ${BUN_INSTALL} \
    && curl -fsSL https://bun.sh/install | bash \
    && chown -R ${USERNAME} /bun


#
# bun がインストールされたコンテナ
#
FROM bun-base as bun

WORKDIR /app
ARG BUN_INSTALL=/bun
COPY --from=bun-base ${BUN_INSTALL} ${BUN_INSTALL}
ENV PATH=${BUN_INSTALL}/bin:${PATH}


#
# 依存関係を解消するコンテナ
#
FROM bun as resolver

WORKDIR /app
ENV NODE_ENV=development
COPY package.json bun.lockb .
RUN bun install


#
# ビルダ
#
FROM resolver as builder

ENV NODE_ENV=production
COPY . .
RUN bun prisma generate \
    && bun run build


#
# 本番環境コンテナ
#
FROM bun as production

COPY --from=builder /app/build build
COPY --from=builder /app/public public
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules node_modules

ENTRYPOINT ["bun"]
CMD ["remix-serve", "./build/index.js"]
