int sensor_pin = A0;
int input_value = 0;
int pump = 8;
int thresholdDown = 25;

void setup() {

  Serial.begin(9600);
  pinMode(sensor_pin, INPUT); //setup for the soil moisture sensor (INPUT)
  pinMode(pump, OUTPUT); //setup for the pump (OUTPUT)
  delay(1000); //1 second delay
}

void loop() {
  input_value = analogRead(sensor_pin);
  input_value = map(input_value,0,1023,0,100);
  
  //The block of code below, when uncommented and monitored on serial monitor shows the moisture percentage.
  //Serial.print("Moisture : ");
  //Serial.print(input_value);
  //Serial.println("%");
  //delay(60000); //delay of 5 minutes is recommended but here we will use 1 second delay for demonstration
  delay(1000);
  
  if (input_value <= thresholdDown) //if condition to check the moisture level
  {
    digitalWrite(pump, HIGH);
    Serial.println("pump on for 1 second");
    delay(1000);
    digitalWrite(pump, LOW);
    //delay(120000); //delay of 2 minutes is recommended but here we will use 1 second delay for demonstration
    delay(1000);
  }
  else if (input_value >= thresholdDown)
  {
    digitalWrite(pump, LOW);
    Serial.println("unadvised, pump off");
    delay(1000);
    //delay(300000); //delay of 5 minutes is recommended but here we will use 1 second delay for demonstration
  }

}
