
import { GoogleGenerativeAI } from '@google/generative-ai';
export class GeminiService {
 async analyze(text:string){
   return { emotion:'anxiety', risk:'low' };
 }
}
