# 🧾 Sistema de Estoque - Django + React

Este projeto é um sistema de controle de estoque com:

- 🔙 **Back-end em Django (Python)**
- 🎨 **Front-end em React (JavaScript)**

---

## 📁 Estrutura de Pastas

```
Sistema-Estoque/
├── backend/         # Projeto Django
├── frontend/        # Projeto React
```

---

## 🚀 Como rodar o projeto em outro computador

### 🔧 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/Sistema-Estoque.git
cd Sistema-Estoque
```

---

## ⚙️ Back-end (Django)

### ▶️ Pré-requisitos

- Python 3.10 ou superior
- `pip`
- `venv` (ambiente virtual)

### 📦 Instalar dependências

```bash
cd backend
python -m venv venv
venv\Scripts\activate     # Windows
# ou
source venv/bin/activate  # Linux/macOS

pip install -r requirements.txt
```

> Se não existir o arquivo `requirements.txt`, gere com:

```bash
pip freeze > requirements.txt
```

### 🔄 Aplicar migrações

```bash
python manage.py migrate
```

### 🚀 Rodar o servidor Django

```bash
python manage.py runserver
```

---

## 🎨 Front-end (React)

### ▶️ Pré-requisitos

- Node.js (recomenda-se a versão LTS)
- npm (ou yarn)

### 📦 Instalar dependências

```bash
cd ../frontend
npm install
```

### 🚀 Rodar o servidor de desenvolvimento

```bash
npm start
```

> O front-end ficará disponível em `http://localhost:3000`

---

## 🔗 Comunicação entre Front e Back

Durante o desenvolvimento, o front-end se comunica com o Django (porta 8000). Certifique-se de configurar o `CORS` no Django se necessário.

Instale o pacote CORS:

```bash
pip install django-cors-headers
```

Adicione ao `settings.py`:

```python
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
```

---

## ✅ Pronto!

Agora seu sistema estará rodando com:

- Django em `http://localhost:8000`
- React em `http://localhost:3000`

Você pode começar a desenvolver e testar normalmente!
