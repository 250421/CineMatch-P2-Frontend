pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'cinematch-frontend'
        DOCKER_TAG = "${BUILD_NUMBER}"
        BACKEND_URL = credentials('BACKEND_URL')
    }

    stages {
        stage('Test') {
            agent {
                docker { image 'node:22-alpine' }
            }
            steps {
                sh 'npm ci'
                sh 'npm test -- --ci'
            }
        }
        stage('Docker Build') {
            steps {
                script {
                    sh "docker build \
                        --build-arg VITE_API_URL=${BACKEND_URL} \
                        -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh "docker stop ${DOCKER_IMAGE} || true"
                    sh "docker rm ${DOCKER_IMAGE} || true"

                    sh """
                        docker run -d \\
                            --name ${DOCKER_IMAGE} \\
                            -p 80:80 \\
                            --restart unless-stopped \\
                            ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}