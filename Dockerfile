# Контейнер для stdio-клиентов и для сборки на Glama.
#
# Сам сервер Magic Master НЕ живёт в этом образе: он размещён у нас и доступен
# по https://magicmaster.pro/mcp. Внутри — только мост, который превращает
# stdio-протокол клиента в HTTP-вызовы к нему. Тот же мост ставится из npm
# (`npx -y magicmaster-mcp`); образ нужен клиентам без Node и сборке Glama,
# которая по контейнеру гоняет проверки безопасности и оценку инструментов.
FROM node:22-alpine

WORKDIR /app

# Собираем из исходников репозитория, а не из опубликованного пакета: сборщик
# Glama выкачивает именно репозиторий, и образ обязан получаться тем же путём,
# каким его собирает он. `npm ci` берёт точные версии из package-lock.json.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY bin ./bin
COPY README.md LICENSE ./

# Адрес по умолчанию — анонимная точка: бесплатные инструменты (анализ, снятие
# следа ИИ, прайс, лимиты) работают без ключа, и автоматическая проверка сборки
# проходит рукопожатие сама. Точка с OAuth требует живого человека в браузере:
# -e MAGICMASTER_MCP_URL=https://magicmaster.pro/mcp/oauth
ENV MAGICMASTER_MCP_URL=https://magicmaster.pro/mcp

# Непривилегированный пользователь: образ ходит только наружу по HTTPS,
# и никаких прав ему для этого не нужно.
USER node

ENTRYPOINT ["node", "bin/magicmaster-mcp.js"]
