import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Controller('receiver')
export class ReceiverController {
  private mqttClient: mqtt.MqttClient;

  constructor() {
    this.setupMqttClient();
  }

  private setupMqttClient() {
    const mqttOptions = {
      host: 'localhost',
      port: 1883, 
      username: 'Mansi',
      password: 'Shilpa@2001',
    };

    this.mqttClient = mqtt.connect(mqttOptions);

    this.mqttClient.on('connect', () => {
      console.log('Receiver MQTT client connected');
      this.subscribeToTopic();
    });

    this.mqttClient.on('error', (error) => {
      console.error('Receiver MQTT client error:', error);
    });

    this.mqttClient.on('message', (topic, message) => {
      this.handleMqttMessage(topic, message);
    });
  }

  private subscribeToTopic() {
    const topic = 'topic/cards';
    this.mqttClient.subscribe(topic, (err) => {
      if (!err) {
        console.log(`Subscribed to MQTT topic: ${topic}`);
      }
    });
  }

  private handleMqttMessage(topic: string, message: Buffer) {
    try {
      const data = JSON.parse(message.toString());


      if (data) {
        console.log('Received MQTT message:', data);
        
        this.publishAcknowledgment();
      }
    } catch (error) {
      console.error('Failed to process MQTT message:', error);
     
    }
  }

  private publishAcknowledgment() {
    const acknowledgmentPayload = JSON.stringify({
      message: 'Acknowledgment received',
    });
    const acknowledgmentTopic = 'topic/acknowledgment';
    this.mqttClient.publish(acknowledgmentTopic, acknowledgmentPayload, (err) => {
      if (!err) {
        console.log('Acknowledgment sent successfully');
      } else {
        console.error('Failed to send acknowledgment');
      }
    });
  }
}



