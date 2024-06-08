# Gradle
FROM gradle:7.5.0-jdk17 as builder

WORKDIR /app

COPY build.gradle settings.gradle /app/
COPY src /app/src

RUN gradle build --no-daemon


# Java
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
