FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAVA_OPTS
ENV JAVA_OPTS=$JAVA_OPTS
ADD target/schedule-0.0.1-SNAPSHOT.jar schedule.jar
EXPOSE 9003
ENTRYPOINT exec java $JAVA_OPTS -jar schedule.jar
# For Spring-Boot project, use the entrypoint below to reduce Tomcat startup time.
#ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar schedule.jar
