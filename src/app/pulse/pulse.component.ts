import { Component, Input, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { DeviceService } from '../device/device.service';

@Component({
  selector: 'app-pulse',
  templateUrl: './pulse.component.html',
  styleUrls: ['./pulse.component.scss'],
})
export class PulseComponent {
  @Input() visitID = 0;
  socket: any;
  arduinoData: any;
  deviceId: any;
  currentBPM: number = 0;
  countDown: number = -1;
  axis_x: number = 0;
  axis_y: number = 75;
  last_BPM_TimeStamp = '';
  getBPMState=false;

  canvas: HTMLCanvasElement | any;
  context: CanvasRenderingContext2D | any;

  pulse: boolean = true;

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    // Connessione al server Socket.IO del backend
    this.socket = io('http://localhost:4000');
    console.log(this.visitID);
    this.deviceService.getIdDevicebyVisit(this.visitID).subscribe((resp) => {
      if (resp.status == 200) {
        this.deviceId = resp.body[0].id;
        this.socket.emit('visitconnection', this.deviceId);
        this.pulse = true;
      }
    });
    setInterval(() => this.myTimer(), 35); // Modifica l'intervallo di aggiornamento
    // Ascolta l'evento 'arduinoData' e aggiorna i dati ricevuti dall'Arduino
    this.socket.on('arduinodata', (data: any) => {
      this.arduino(data);
      
      
    });
    this.setupCanvas();
  }
  myTimer() {
    this.axis_x += 3;
   
    this.set_Axis_XY(this.axis_x, this.axis_y);
  }

  arduino(data: any) {
    let obj = JSON.parse(data);
    console.log(obj);
    this.updateBPM(obj);
    let getHeartbeatSignal = obj.heartbeat_Signal;
    let getBPMTimeStamp = obj.BPM_TimeStamp;
    let getBPMVal = obj.BPM_Val;
     this.getBPMState = obj.BPM_State;

    //console.log("segnale", getHeartbeatSignal);

    if (getHeartbeatSignal > 565) getHeartbeatSignal = 565;
    if (getHeartbeatSignal < 545) getHeartbeatSignal = 545;

    let axisY: number = this.map(getHeartbeatSignal, 545, 565, 150, 0); // 150 is the height of the canvas. Look at the canvas height in the "<body>" section.
    //console.log(axisY)
    this.axis_y = axisY;
    if (this.getBPMState) {
      const bpmShowElement = document.getElementById('bpm_Show');
      if (bpmShowElement) {
        bpmShowElement.innerHTML = '&nbsp;' + getBPMVal + ' BPM';
      } else {
        console.error("Element with id 'bpm_Show' not found.");
      }

      if (this.last_BPM_TimeStamp !== getBPMTimeStamp) {
        let myTextarea = document.getElementById(
          'log_BPM'
        ) as HTMLTextAreaElement;
        let lastLog = myTextarea.textContent;
        if (lastLog === '') {
          const logBPMElement = document.getElementById('log_BPM');
          if (logBPMElement) {
            logBPMElement.innerHTML =
              'Tempo,BPM\r\n' + getBPMTimeStamp + ',' + getBPMVal;
          } else {
            console.error("Element with id 'bpm_Show' not found.");
          }
        } else {
          const logBPMElement = document.getElementById('log_BPM');
          if (logBPMElement) {
            logBPMElement.innerHTML =
              lastLog + '\r\n' + getBPMTimeStamp + ',' + getBPMVal;
          } else {
            console.error("Element with id 'bpm_Show' not found.");
          }
        }
        myTextarea.scrollTop = myTextarea.scrollHeight;
      }

      this.last_BPM_TimeStamp = getBPMTimeStamp;
    } else {
      const bpmShowElement = document.getElementById('bpm_Show');
      if (bpmShowElement) {
        bpmShowElement.innerHTML = '&nbsp;0 BPM';
      } else {
        console.error("Element with id 'bpm_Show' not found.");
      }
    }
  }

  setupCanvas(): void {
    this.canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');
    this.drawGraph();
    this.context.beginPath();
    this.context.lineWidth = 1;
    this.context.strokeStyle = '#0583F2';
  }
  set_Axis_XY(x: any, y: any) {
    this.context.lineTo(x, y);
    this.context.stroke();
    if (this.axis_x > 300) {
      this.reset_Graph();
    }
  }
  reset_Graph() {
    this.axis_x = 0;
    this.context.clearRect(0, 0, 300, 150);
    this.context.closePath();
    this.drawGraph();
    this.context.beginPath();
    this.context.lineWidth = 1;
    this.context.strokeStyle = '#0583F2';
    this.context.moveTo(0, this.axis_y);
  }

  drawGraph(): void {
    this.context.moveTo(1, 150);
    this.context.lineTo(1, 0);
    this.context.moveTo(50, 150);
    this.context.lineTo(50, 0);
    this.context.moveTo(100, 150);
    this.context.lineTo(100, 0);
    this.context.moveTo(150, 150);
    this.context.lineTo(150, 0);
    this.context.moveTo(200, 150);
    this.context.lineTo(200, 0);
    this.context.moveTo(250, 150);
    this.context.lineTo(250, 0);
    this.context.moveTo(299, 150);
    this.context.lineTo(299, 0);

    this.context.moveTo(0, 1);
    this.context.lineTo(300, 1);
    this.context.moveTo(0, 25);
    this.context.lineTo(300, 25);
    this.context.moveTo(0, 50);
    this.context.lineTo(300, 50);
    this.context.moveTo(0, 75);
    this.context.lineTo(300, 75);
    this.context.moveTo(0, 100);
    this.context.lineTo(300, 100);
    this.context.moveTo(0, 125);
    this.context.lineTo(300, 125);
    this.context.moveTo(0, 149);
    this.context.lineTo(300, 149);

    this.context.lineWidth = 0.5;
    this.context.strokeStyle = '#DCDCDC';
    this.context.closePath();
    this.context.stroke();
  }

  updateBPM(data: any): void {
    this.currentBPM = data.BPM_Val;
    this.updateLog(data.BPM_TimeStamp, data.BPM_Val);
    
  }

  map(
    x: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ): number {
    console.log(x,inMin,inMax,outMin,outMax)
    return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  startStopMonitoring(): void {
    if (this.countDown < 0) {
      this.countDown = 3;
      this.sendButtonCommand('START');
      this.startCountDown();
    } else {
      this.sendButtonCommand('STOP');
    }
  }

  startCountDown(): void {
    const interval = setInterval(() => {
      this.countDown--;
      if (this.countDown < 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  updateLog(timestamp: string, bpm: number): void {
    const logTextArea = document.getElementById(
      'log_BPM'
    ) as HTMLTextAreaElement;
    const lastLog = logTextArea.value;
    const newLog = `${
      lastLog === '' ? 'Tempo,BPM' : lastLog + '\n'
    }${timestamp},${bpm}`;
    logTextArea.value = newLog;
    logTextArea.scrollTop = logTextArea.scrollHeight;
  }

  saveToCSV(): void {
    const logTextArea = document.getElementById(
      'log_BPM'
    ) as HTMLTextAreaElement;
    const csvData =
      'data:text/csv;charset=utf-8,' + encodeURIComponent(logTextArea.value);
    const link = document.createElement('a');
    link.setAttribute('href', csvData);
    link.setAttribute('download', 'BPMLog.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  clearBPMLog(): void {
    const dialogText = 'Sicuro di voler eliminare il log?';
    if (confirm(dialogText)) {
      const logTextArea = document.getElementById(
        'log_BPM'
      ) as HTMLTextAreaElement;
      logTextArea.value = '';
    }
  }

  sendButtonCommand(state: string): void {
    // Implement logic to send button command
  }
}
