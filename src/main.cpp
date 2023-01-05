#include <Arduino.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include <WiFiClient.h>

#define WIFI_SSID "ARDUINO"
#define WIFI_PASSWORD "12345678"
#define echoPinSensor1  16
#define trigPinSensor1  4

float duration;
float distance;
HTTPClient http;
WiFiClient client;
unsigned long lastTime = 0;
unsigned long timerDelay = 5000;

float range_result() {
  // Clears the trigPin condition
  digitalWrite(trigPinSensor1, LOW);
  delayMicroseconds(2);
  // Sets the trigPin HIGH (ACTIVE) for 10 microseconds
  digitalWrite(trigPinSensor1, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPinSensor1, LOW);
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPinSensor1, HIGH);
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
  String url = "http://192.168.5.167:5000/add";
  WiFiClient client;
  HTTPClient http;  
  String response;

  StaticJsonDocument<200> buff;
  String jsonParams;

  float resultSensor = range_result();
  String result = String(resultSensor);
  buff["range"] = result;\
  serializeJson(buff, jsonParams);
  Serial.println(jsonParams);

  http.begin(client, url);
  http.addHeader("Content-Type", "application/json");
  http.POST(jsonParams);
  response = http.getString();
  Serial.println(response);
}

void setup() {
  Serial.begin(9600); // Port monitoring: 9600
  pinMode(trigPinSensor1, OUTPUT); // Sets the first sensor trigPin as an Output
  pinMode(echoPinSensor1, INPUT); // Sets the first sensor echoPin as an Input
  connectWifi(); // function for connect to the wifi (use fajar phone's wifi)
}

void loop() {
  delay(2000);
  postHttp();
}