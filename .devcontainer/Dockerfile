FROM node:18-slim
SHELL ["/bin/bash", "-oeux", "pipefail", "-c"]

ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=${USER_UID}

RUN apt-get update -y \
    && apt-get install -y build-essential unzip curl

ENV BUN_INSTALL=/bun
RUN mkdir -p ${BUN_INSTALL} \
    && curl -fsSL https://bun.sh/install | bash \
    && chown -R ${USERNAME} /bun

ENV PATH=${BUN_INSTALL}/bin:${PATH}
