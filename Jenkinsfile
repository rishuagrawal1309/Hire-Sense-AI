pipeline {

    agent any

    environment {
        FRONTEND_IMAGE = "swayam614/resume-frontend:latest"
        BACKEND_IMAGE = "swayam614/resume-backend:latest"
    }

    stages {

        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        stage('Run Backend Tests') {
            steps {

                dir('backend') {

                    sh '''

                        python3 -m venv venv

                        source venv/bin/activate

                        python3 -m pip install --upgrade pip

                        pip install -r requirements.txt

                        pip install -r requirements-test.txt

                        export PYTHONPATH=.

                        pytest

                    '''
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {

                dir('backend') {

                    sh 'docker build -t $BACKEND_IMAGE .'

                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {

                dir('frontend') {

                    sh 'docker build -t $FRONTEND_IMAGE .'

                }
            }
        }

        stage('Push Backend Docker Image') {
            steps {

                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'

                    sh 'docker push $BACKEND_IMAGE'
                }
            }
        }

        stage('Push Frontend Docker Image') {
            steps {

                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'

                    sh 'docker push $FRONTEND_IMAGE'
                }
            }
        }

        stage('Deploy Using Ansible') {
            steps {

                dir('ansible') {

                    sh '''

                    ansible-playbook -i inventory.ini playbook.yml

                    '''
                }
            }
        }    

    }

    post {

        success {

            echo 'Pipeline executed successfully.'

        }

        failure {

            echo 'Pipeline failed.'

        }
    }
}