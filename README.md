# 🐳 Docker Swarm Orchestration - Mini Projet

## 📌 Description

Ce mini projet consiste à **dockeriser** une application multi-services et à **l'orchestrer** avec **Docker Swarm** avec un déploiement **CI/CD via GitHub Actions** (déclenchement manuel).

### Services concernés :
- **Backend** : Spring Boot 3.3.5 (Java 17)
- **Frontend** : Angular 17
- **Base de données** : MongoDB 6
- **Interface DB** : Mongo-Express

---

## 🏗️ Objectifs

- ✅ Conteneurisation des 3 services avec Docker
- ✅ Orchestration avec Docker Swarm (mode cluster)
- ✅ Scalabilité horizontale (réplicas)
- ✅ Rolling updates
- ✅ Load balancing intégré
- ✅ CI/CD avec GitHub Actions (déclenchement manuel)

---

## 📋 Prérequis

- Docker Desktop (Swarm activé)
- Docker Compose
- Git
- Compte GitHub

---

## 🚀 Étapes de déploiement

### 1️⃣ Cloner le projet

git clone https://github.com/rihem135/docker-swarm-orchestration.git
cd docker-swarm-orchestration

2️⃣ Initialiser Docker Swarm
docker swarm init --advertise-addr 127.0.0.1

3️⃣ Construire les images Docker
# Backend
cd skill-tracker-backend
docker build -t rihem135/skill-tracker-backend:latest .

# Frontend
cd ../skill-tracker-frontend
docker build -t rihem135/skill-tracker-frontend:latest .

# Revenir à la racine
cd ..

4️⃣ Déployer la stack sur Swarm
docker stack deploy -c docker-compose.yml skill-tracker


5️⃣ Vérifier le déploiement
# Lister les services
docker service ls

# Voir les tâches
docker service ps skill-tracker_backend
docker service ps skill-tracker_frontend

# Voir les logs
docker service logs skill-tracker_backend
docker service logs skill-tracker_frontend


🔧 Commandes Swarm utiles
# Voir les services
docker service ls

# Voir les détails d'un service
docker service inspect --pretty skill-tracker_backend

# Monter en charge (scaling)
docker service scale skill-tracker_backend=4

# Rolling update
docker service update --image rihem135/skill-tracker-backend:new --update-parallelism 1 --update-delay 30s skill-tracker_backend

# Annuler une mise à jour
docker service rollback skill-tracker_backend

# Voir les logs d'un service
docker service logs skill-tracker_backend --tail 50

# Supprimer la stack
docker stack rm skill-tracker

# Quitter Swarm
docker swarm leave --force



