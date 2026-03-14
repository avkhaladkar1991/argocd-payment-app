pipeline {

    agent any

    environment {

        IMAGE_NAME = "avkhaladkar1991/user-service"
        IMAGE_TAG  = "${BUILD_NUMBER}"
        DOCKER_IMAGE = "${IMAGE_NAME}:${IMAGE_TAG}"

        APP_REPO = "https://github.com/avkhaladkar1991/argocd-payment-app.git"

    }

    options {
        timestamps()
    }

    stages {

        stage('Checkout Application Code') {

            steps {
                git branch: 'main', url: 'https://github.com/avkhaladkar1991/argocd-payment-app.git'
            }

        }

        stage('Build Docker Image') {

            steps {
                sh """
                docker build -t ${DOCKER_IMAGE} user-service
                """
            }

        }

        stage('Docker Login') {

            steps {

                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh """
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    """

                }

            }

        }

        stage('Push Docker Image') {

            steps {

                sh """
                docker push ${DOCKER_IMAGE}
                """

            }

        }

        stage('Cleanup Local Image') {

            steps {

                sh """
                docker rmi ${DOCKER_IMAGE} || true
                """

            }

        }

    }

    post {

        success {
            echo "✅ CI Pipeline Completed Successfully"
        }

        failure {
            echo "❌ CI Pipeline Failed"
        }

    }

}