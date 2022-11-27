node {
  env.NODEJS_HOME = "${tool 'Node'}"
  env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
  stage('SCM') {
    git 'https://github.com/18-5/team-together.git'
  }
  stage('SonarQube analysis') {
    def scannerHome = tool 'SonarScanner';
    withSonarQubeEnv('SonarQube') {
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }
}
