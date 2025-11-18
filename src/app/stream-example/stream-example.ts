import { Component } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { ChatResponse } from './interfaces/chat-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stream-example',
  imports: [CommonModule],
  templateUrl: './stream-example.html',
  styleUrl: './stream-example.scss',
})
export class StreamExample {
// Use httpResource to declaratively fetch data and manage state
  // It returns a resource object containing value, isLoading, and error signals.
  private chatResource = httpResource<ChatResponse>(() => '/api/chat');

  // Expose the signals to the template for easy binding
  public isLoading = this.chatResource.isLoading;
  public chatMessage = this.chatResource.value; // This is a signal that holds ChatResponse | undefined
  public error = this.chatResource.error; // This is a signal that holds HttpErrorResponse | undefined
  public statusCode = this.chatResource.statusCode;

  // You can also create a computed signal to extract just the message string
  // import { computed } from '@angular/core';
  // public messageString = computed(() => this.chatMessage()?.message);

}
