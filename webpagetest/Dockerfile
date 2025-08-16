FROM webpagetest/agent:latest

# 安装 Python 3 和必要的依赖
RUN apt-get update && \
    apt-get install -y python3 python3-pip && apt-get install -y firefox

# 设置默认 Python 版本为 Python 3
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 1
RUN update-alternatives --install /usr/bin/pip pip /usr/bin/pip3 1
