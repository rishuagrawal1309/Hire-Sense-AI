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

        stage('Kubernetes Validation') {

            steps {

                sh '''

                    echo "========== BEFORE LOAD ==========" > k8s-report.txt

                    kubectl get pods >> k8s-report.txt

                    kubectl get hpa >> k8s-report.txt

                    kubectl top pods >> k8s-report.txt

                    echo "\\n========== GENERATING LOAD ==========" >> k8s-report.txt

                    ab -n 50 -c 5 http://resume.local/ || true

                    sleep 20

                    echo "\\n========== AFTER LOAD ==========" >> k8s-report.txt

                    kubectl get pods >> k8s-report.txt

                    kubectl get hpa >> k8s-report.txt

                    kubectl top pods >> k8s-report.txt

                    cat k8s-report.txt

                '''
            }
        }

    }

    post {

        success {

            emailext(

                subject: "SUCCESS: Resume Parser Pipeline #${BUILD_NUMBER}",

                body: """

                Build Status: SUCCESS

                Project: Hire-Sense-AI

                Build Number: ${BUILD_NUMBER}

                Jenkins Job: ${JOB_NAME}

                Kubernetes deployment completed successfully.

                Kubernetes validation executed successfully.

                Check attached report for Kubernetes details.

                """,

                attachmentsPattern: 'k8s-report.txt',

                to: 'swayampalrecha6@gmail.com'

            )

            echo 'Pipeline executed successfully.'
        }

        failure {

            emailext(

                subject: "FAILED: Resume Parser Pipeline #${BUILD_NUMBER}",

                body: """

                Build Status: FAILED

                Project: Hire-Sense-AI

                Build Number: ${BUILD_NUMBER}

                Jenkins Job: ${JOB_NAME}

                Please check Jenkins logs for failure details.

                """,

                to: 'swayampalrecha6@gmail.com'

            )

            echo 'Pipeline failed.'
        }

        always {

            cleanWs()
        }
    }
}