
import React, { useEffect, useState } from 'react';
import { pipeline } from '@huggingface/transformers';

interface AudioAnalyzerProps {
  onThreatDetected: () => void;
}

const AudioAnalyzer: React.FC<AudioAnalyzerProps> = ({ onThreatDetected }) => {
  const [isListening, setIsListening] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [model, setModel] = useState<any>(null);
  const [modelLoading, setModelLoading] = useState(true);
  
  // Threat detection keywords
  const threatKeywords = ["help", "stop", "no", "don't", "please stop", "emergency", "danger"];

  // Load the audio classification model
  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log("Loading audio classification model...");
        // In a real app, we'd use a specific audio classification model 
        // For now, we'll simulate with a text classification model
        const classifier = await pipeline('text-classification', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
        setModel(classifier);
        setModelLoading(false);
        console.log("Model loaded successfully");
      } catch (error) {
        console.error("Error loading model:", error);
        // Fallback to simple keyword detection if model fails to load
        setModelLoading(false);
      }
    };

    loadModel();
  }, []);

  // Initialize audio recording
  useEffect(() => {
    if (modelLoading) return;

    const setupAudio = async () => {
      try {
        const context = new AudioContext();
        setAudioContext(context);

        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        setIsListening(true);
        
        const audioChunks: Blob[] = [];
        
        recorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };
        
        recorder.onstop = async () => {
          // Simulate audio processing to text (in a real app, this would be a speech-to-text service)
          const simulateAudioToText = () => {
            // Randomly select if we should simulate detecting a threat (for demo purposes)
            const shouldSimulateThreat = Math.random() > 0.95;
            if (shouldSimulateThreat) {
              const randomKeyword = threatKeywords[Math.floor(Math.random() * threatKeywords.length)];
              return `I need ${randomKeyword} right now`;
            }
            return "normal conversation with no threats";
          };
          
          const transcribedText = simulateAudioToText();
          console.log("Transcribed:", transcribedText);
          
          try {
            // Simple keyword-based threat detection
            const containsThreatKeyword = threatKeywords.some(keyword => 
              transcribedText.toLowerCase().includes(keyword)
            );
            
            // For demonstration: Use the model if available, otherwise use keyword detection
            let isThreatening = containsThreatKeyword;
            
            if (model) {
              // Use the model for more sophisticated detection
              const result = await model(transcribedText);
              console.log("Model result:", result);
              
              // In this demo, we're using a sentiment model where "NEGATIVE" might indicate distress
              // In a real app, you'd use a model specifically trained for threat detection
              if (result[0].label === "NEGATIVE" && result[0].score > 0.8) {
                isThreatening = true;
              }
            }
            
            if (isThreatening) {
              console.log("THREAT DETECTED!");
              onThreatDetected();
            }
          } catch (error) {
            console.error("Error processing audio:", error);
          }
          
          // Continue listening
          if (isListening && mediaRecorder) {
            startNewRecordingSession();
          }
        };
        
        startNewRecordingSession();
      } catch (error) {
        console.error("Error setting up audio:", error);
      }
    };
    
    const startNewRecordingSession = () => {
      if (mediaRecorder && isListening) {
        mediaRecorder.start();
        // Record for 5 seconds at a time
        setTimeout(() => {
          if (mediaRecorder.state === "recording") {
            mediaRecorder.stop();
          }
        }, 5000);
      }
    };
    
    setupAudio();
    
    return () => {
      setIsListening(false);
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
      }
    };
  }, [modelLoading, onThreatDetected]);

  return (
    <div className="bg-primary/10 rounded-lg p-4 flex items-center justify-between">
      <div>
        <h3 className="font-medium">Audio Monitoring</h3>
        <p className="text-sm text-muted-foreground">
          {modelLoading ? "Loading AI model..." : "Actively monitoring for threats"}
        </p>
      </div>
      <div className="relative">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <div className="absolute -inset-2 bg-green-500/30 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default AudioAnalyzer;
