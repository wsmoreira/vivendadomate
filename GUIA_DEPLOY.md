# 🚀 Guia de Deploy - Vivenda do Mate

Este guia explica como fazer o deploy do site Vivenda do Mate usando hospedagem gratuita.

## 📋 Pré-requisitos

1. Conta no GitHub (gratuita)
2. Conta no Vercel OU Netlify (gratuitas)
3. Git instalado no seu computador

---

## 🎯 Opção 1: Deploy com Vercel (Recomendado)

### Passo 1: Criar repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique no botão **"New"** (verde) para criar novo repositório
3. Preencha:
   - **Repository name**: `vivenda-do-mate`
   - **Description**: Site institucional e e-commerce da Vivenda do Mate
   - Marque como **Public** (ou Private se preferir)
   - **NÃO** marque "Add a README file"
4. Clique em **"Create repository"**

### Passo 2: Subir o código para o GitHub

Abra o terminal na pasta do projeto e execute:

```bash
# Inicializar Git no projeto
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Initial commit - Site Vivenda do Mate"

# Conectar com o repositório do GitHub (substitua SEU_USUARIO pelo seu usuário)
git remote add origin https://github.com/SEU_USUARIO/vivenda-do-mate.git

# Enviar o código
git branch -M main
git push -u origin main
```

**Importante**: Quando solicitado, digite seu usuário e senha do GitHub (ou token de acesso pessoal).

### Passo 3: Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"Sign Up"** e escolha **"Continue with GitHub"**
3. Autorize o Vercel a acessar seus repositórios
4. No dashboard, clique em **"Add New..."** → **"Project"**
5. Encontre o repositório `vivenda-do-mate` e clique em **"Import"**
6. Configurações:
   - **Framework Preset**: Other (ou None)
   - **Root Directory**: `./` (deixe como está)
   - **Build Command**: (deixe vazio)
   - **Output Directory**: (deixe vazio)
7. Clique em **"Deploy"**

🎉 **Pronto!** Em 1-2 minutos seu site estará no ar!

O Vercel fornecerá um link como: `https://vivenda-do-mate.vercel.app`

### Passo 4: Configurar Domínio Personalizado (Opcional)

Se você já tem um domínio (ex: vivendadomate.com.br):

1. No dashboard do Vercel, clique no seu projeto
2. Vá em **"Settings"** → **"Domains"**
3. Digite seu domínio e siga as instruções

---

## 🎯 Opção 2: Deploy com Netlify

### Passo 1 e 2: Iguais ao Vercel

Siga os mesmos passos de criar repositório no GitHub e subir o código.

### Passo 3: Deploy no Netlify

1. Acesse [netlify.com](https://netlify.com)
2. Clique em **"Sign up"** e escolha **"GitHub"**
3. Autorize o Netlify
4. Clique em **"Add new site"** → **"Import an existing project"**
5. Escolha **"Deploy with GitHub"**
6. Selecione o repositório `vivenda-do-mate`
7. Configurações:
   - **Branch to deploy**: main
   - **Build command**: (deixe vazio)
   - **Publish directory**: (deixe vazio ou `.`)
8. Clique em **"Deploy site"**

🎉 **Pronto!** Em 1-2 minutos seu site estará no ar!

O Netlify fornecerá um link como: `https://vivenda-do-mate.netlify.app`

### Mudar o Nome do Site (Opcional)

1. No dashboard do Netlify, clique em **"Site settings"**
2. Vá em **"Site details"** → **"Change site name"**
3. Digite um nome personalizado (ex: `vivendadomate`)
4. O link ficará: `https://vivendadomate.netlify.app`

---

## 🔄 Como Atualizar o Site

Sempre que você fizer alterações no site:

```bash
# Adicionar as mudanças
git add .

# Fazer commit com mensagem descritiva
git commit -m "Atualização: descrição do que foi mudado"

# Enviar para o GitHub
git push
```

O Vercel/Netlify detectará automaticamente as mudanças e fará o deploy em 1-2 minutos! ✨

---

## 📊 Próximas Integrações (Após Deploy)

### Google Analytics
1. Crie uma conta em [analytics.google.com](https://analytics.google.com)
2. Adicione o código de rastreamento no `<head>` de todas as páginas HTML

### Facebook Pixel
1. Crie um Pixel no [Facebook Business](https://business.facebook.com)
2. Adicione o código no `<head>` de todas as páginas HTML

---

## ❓ Problemas Comuns

### Erro ao fazer push para GitHub
**Erro**: `remote: Support for password authentication was removed`

**Solução**: Use um Personal Access Token:
1. Acesse GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Marque a permissão `repo`
4. Copie o token e use como senha

### Imagens não aparecem no site
**Causa**: Caminhos incorretos das imagens

**Verificar**:
- No HTML, os caminhos devem ser relativos: `./images/foto.jpg` ou `images/foto.jpg`
- NÃO use caminhos absolutos: `C:\Users\...`

### Site não atualiza após push
**Solução**:
1. Aguarde 2-3 minutos
2. Limpe o cache do navegador (Ctrl + Shift + R)
3. Verifique o status do deploy no dashboard Vercel/Netlify

---

## 🎯 Vantagens de Cada Plataforma

### Vercel
- ✅ Deploy mais rápido
- ✅ Interface mais simples
- ✅ Melhor para desenvolvedores
- ✅ Analytics integrado

### Netlify
- ✅ Mais recursos no plano gratuito
- ✅ Formulários integrados
- ✅ Redirects mais flexíveis
- ✅ Melhor para não-desenvolvedores

---

## 📞 Suporte

- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **GitHub**: [docs.github.com](https://docs.github.com)

---

**Dica Final**: Recomendo usar **Vercel** pela simplicidade e velocidade. Mas ambas as opções são excelentes! 🚀
