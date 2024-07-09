import { Component, OnDestroy } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
  angle: number = 0;
  isTimerRunning: boolean = false;
  private timer: any;
  isDarkMode = false;
  sidebarItems = [
    'Dashboard',
    // 'Angle Calculator',
    // 'Trigonometry',
    // 'Unit Circle',
    // 'Angle Converter',
    // 'Practice Exercises',
    'Settings'
  ];

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }

  updateAngle(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.angle = Number(inputElement.value);
    this.angle = ((this.angle % 360) + 360) % 360;
  }

  toggleTimer() {
    if (this.isTimerRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    this.isTimerRunning = true;
    this.timer = setInterval(() => {
      this.angle = (this.angle + 1) % 360;
    }, 500);
  }

  stopTimer() {
    this.isTimerRunning = false;
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
    const start = this.polarToCartesian(x, y, radius, startAngle);
    const end = this.polarToCartesian(x, y, radius, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    const sweepFlag = "0";
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
  }

  polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = angleInDegrees * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY - (radius * Math.sin(angleInRadians))
    };
  }

  getQuadrant(): string {
    if (this.angle >= 0 && this.angle < 90) return "I";
    if (this.angle >= 90 && this.angle < 180) return "II";
    if (this.angle >= 180 && this.angle < 270) return "III";
    return "IV";
  }

  Math = Math;
}