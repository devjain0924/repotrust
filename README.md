# 🧠 RepoTrust

**RepoTrust** is a trust and moderation dashboard for AI models. It tracks trust metrics, user interaction data, flag histories, and reviews across various models like GPT-4o, Claude 3.5, Gemini Ultra, and more.

Each model card includes a **"Launch Chat"** button that links to a separately hosted chatbot interface (e.g., Django apps).

---

## 📦 Features

- Trust score & capability visualization
- Active flags and moderation history
- Ratings breakdown (accuracy, fairness, etc.)
- Usage statistics per model
- Recent activities dashboard
- One-click access to separate chatbot UIs

---

## 🧪 Tech Stack

- **Frontend**: React (Vite) + TypeScript + Tailwind CSS
- **UI Components**: ShadCN, Lucide Icons
- **Routing**: React Router
- **Mock Data**: `data.ts` (easily pluggable with API)
- **Backend (Chatbots)**: Django (Run separately)

---

## 🚀 Getting Started

### 🧁 Frontend (RepoTrust Dashboard)

#### 1. Clone the Repo

git clone https://github.com/devjain0924/repotrust.git

##### 2.Download the requirements.txt file :

pip install -r requirements.txt

###### 3.Then run the following code to run all the servers:

cd mp
python manage.py runserver 8000
cd mp2
python manage.py runserver 8002
cd mp3
python manage.py runserver 8003
cd mp4
python manage.py runserver 8001
cd mp5
python manage.py runserver 8004

npm install
npm run dev

####### 4.
Frontend runs at(along with all the individual backends):
http://localhost:8080


