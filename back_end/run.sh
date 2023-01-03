#! /bin/bash

# 수정시 aws 서버에 scp로 전송

JAR_NAME=diabetes-0.0.1-SNAPSHOT.jar
JAR_PATH=$(pwd)/$JAR_NAME

echo "> 현재 구동 중인 jar 프로세스 확인"
CURR_PID=$(pgrep -f $JAR_NAME)

if [ -z $CURR_PID ]
then
  echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다."
else
  echo "> 현재 구동중인 애플리케이션 종료: kill -15 $CURR_PID" # 15는 정상 종료 옵션
  kill -15 $CURR_PID
  sleep 5
fi

echo "> NEW JAR 배포"
nohup java -jar -Dspring.config.location=./config/application-auth.yml,classpath:/application.yml -Dspring.profiles.active=prod $JAR_NAME &