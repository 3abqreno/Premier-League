pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/3abqreno/Premier-League'
        BRANCH = 'test'
        APP_NAME = 'league'
        DOCKER_IMAGE = 'league:latest'
        DEPLOY_CONTAINER_NAME = 'league'
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    if (!fileExists('your-repo')) {
                        sh 'git clone $REPO_URL'
                    }
                    dir('your-repo') {
                        sh 'git checkout $BRANCH'
                        sh 'git pull origin $BRANCH'
                        sh 'cp /home/allam/Premier-League/backend/.env backend/.env'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('your-repo') {
                    sh 'podman-compose build'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'podman run --rm $DOCKER_IMAGE python -m pytest'
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                script {
                    sh 'podman-compose down'
                    sh 'podman-compose up -d'
                    }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Build or deployment failed!'
        }
    }
}
