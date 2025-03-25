# Etapa 1: Construção
FROM node:18 AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do projeto
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos
COPY . .

# Compile o TypeScript
RUN npm run build

# Etapa 2: Execução
FROM node:18 AS production

WORKDIR /app

# Copie os arquivos necessários da etapa anterior
COPY --from=build /app /app

# Exponha a porta
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npm", "start"]

