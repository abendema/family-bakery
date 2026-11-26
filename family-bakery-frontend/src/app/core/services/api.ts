import { Injectable } from '@angular/core';

/**
 * URL of the Family Bakery backend.
 * In development the backend runs locally (uvicorn app.main:app)
 * Change the port if the backend runs on a different port.
 */
export const API_BASE_URL = 'http://127.0.0.1:8000';

@Injectable({
  providedIn: 'root',
})
export class Api {}
