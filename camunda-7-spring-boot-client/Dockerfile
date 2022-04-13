####
## run Maven build in Docker image layer and cache dependencies
####
FROM maven:3-jdk-8 as builder
# setup base dir
WORKDIR /usr/src/app
# copy files from project
COPY pom.xml pom.xml
COPY settings.xml settings.xml
COPY src/ src/
# COPY license.txt src/main/resources/camunda-license.txt
# run maven build and cache dependencies
#RUN mvn -s settings.xml dependency:resolve-plugins dependency:resolve clean package -DskipTests -Dhttps.protocols=TLSv1.1,TLSv1.2 --activate-profiles !default
RUN --mount=type=cache,target=/root/.m2 mvn -s settings.xml -DskipTests -Dmaven.test.skip clean package

####
## create another image layer and run the app that was built
####
FROM openjdk:8-jdk as process-application
# Create app directory
WORKDIR /usr/src/app
# copy the built jar to the new image
COPY --from=builder /usr/src/app/target/camunda-c7-client-1.0.0-SNAPSHOT.jar ${WORKDIR}
# run the application
ENTRYPOINT ["java","-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap","-Dspring.profiles.active=cors,prod","-Djava.security.egd=file:/dev/./urandom","-Dserver.port=${PORT}","-jar","/usr/src/app/camunda-c7-client-1.0.0-SNAPSHOT.jar"]
