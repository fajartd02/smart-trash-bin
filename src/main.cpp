#include <Arduino.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include <WiFiClient.h>

#define WIFI_SSID       "AndroidAP" // change with your wifi(should same with your laptop)
#define WIFI_PASSWORD   "idpg4761" // change with your wifi(should same with your laptop)
#define echoPinSensor1  16
#define echoPinSensor2  18
#define trigPinSensor1  4
#define trigPinSensor2  5
#define SERVO_PIN       13

float duration;
float distance;
HTTPClient http;
WiFiClient client;
Servo servoMotor;
unsigned long lastTime = 0;
unsigned long timerDelay = 5000;

float range_result(int trigPin, int echoPin) {
  // Clears the trigPin condition
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  // Sets the trigPin HIGH (ACTIVE) for 10 microseconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  // Calculating the distance
  distance = duration * 0.034 / 2; // Speed of sound wave divided by 2 (go and back)
  return distance;
}

void connectWifi() {
  Serial.println("Connecting to Wifi!");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while(WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("Wifi Connnected!");
  Serial.println(WiFi.localIP());
}

void postHttp() {
  /* 
    How url works:
    Use same wifi for arduino and your laptop/pc
    Use your IPv4 Address on properties
    And change the IP before :5000
    let say your ip4 is 192.55.55.1
    you should change to http://192.55.55.1:5000/add
  */
  String url = "http://192.168.43.226:5000/add";
  WiFiClient client;
  HTTPClient http;  
  String response;

  StaticJsonDocument<200> buff;
  String jsonParams;

  float resultSensor = range_result(trigPinSensor1, echoPinSensor1);
  String result = String(resultSensor);
  buff["range"] = result;
  serializeJson(buff, jsonParams);
  float percent = (15 - resultSensor) * 100 / 15;
  Serial.print("sensor1: ");
  Serial.print(percent);
  Serial.println("%");

  http.begin(client, url);
  http.addHeader("Content-Type", "application/json");
  http.POST(jsonParams);
  response = http.getString();
  Serial.println(response);
}

void setup() {
  servoMotor.attach(SERVO_PIN);
  servoMotor.write(0);
  Serial.begin(9600);
  pinMode(trigPinSensor1, OUTPUT);
  pinMode(echoPinSensor1, INPUT);
  pinMode(trigPinSensor2, OUTPUT);
  pinMode(echoPinSensor2, INPUT);
  connectWifi();
}

void automaticOpen() {
  float resultSensor = range_result(trigPinSensor2, echoPinSensor2);
  Serial.print("sensor2: ");
  Serial.print(resultSensor);
  Serial.println(" cm");
  if (resultSensor <= 10) {
    delay(1000);
    servoMotor.write(120);
    delay(1000);
  } else {
    delay(1000);
    servoMotor.write(0);
    delay(1000);
  }
}

void loop() {
  delay(1000);
  automaticOpen();
  postHttp();
}