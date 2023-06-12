FROM mcr.microsoft.com/playwright:v1.32.3-jammy
RUN apt-get update; \
    apt-get install -y \
    curl \
    unzip \
    xvfb \
    libxi6 \
    libgconf-2-4 \
    wget \
    libu2f-udev;
RUN npx playwright install && \
    npm set audit false
WORKDIR /app
COPY . ./
RUN npm install
RUN HOME=/root npm run test