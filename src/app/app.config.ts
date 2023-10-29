import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  InjectionToken,
  importProvidersFrom,
} from '@angular/core';
import {
  Firestore,
  connectFirestoreEmulator,
  getFirestore,
  initializeFirestore,
} from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { environment } from '@env/environment';
import { initializeApp } from 'firebase/app';
import { APP_ROUTES } from './app.routes';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

const app = initializeApp(environment.firebase);

export const AUTH = new InjectionToken('Firebase auth', {
  providedIn: 'root',
  factory: () => {
    const auth = getAuth();
    if (environment.useEmulators) {
      connectAuthEmulator(auth, 'http://localhost:9099', {
        disableWarnings: true,
      });
    }
    return auth;
  },
});

export const FIRESTORE = new InjectionToken('Firebase firestore', {
  providedIn: 'root',
  factory: () => {
    let firestore: Firestore;
    if (environment.useEmulators) {
      firestore = initializeFirestore(app, {});
      connectFirestoreEmulator(firestore, 'localhost', 8080);
    } else {
      firestore = getFirestore();
    }
    return firestore;
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(APP_ROUTES),
    importProvidersFrom([BrowserAnimationsModule]),
  ],
};
