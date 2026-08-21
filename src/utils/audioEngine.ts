/**
 * Web Audio API synthesizer for serene background music
 * Supports Gamelan Jawa, Rindik Bali, Saluang Minang/Sunda flute, Romantic Piano & Acoustic Strings
 */

class WeddingAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private currentType: string = 'synth-gamelan';
  private masterGain: GainNode | null = null;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(type: 'synth-gamelan' | 'synth-rindik' | 'synth-saluang' | 'synth-piano' | 'synth-acoustic' | 'synth-strings' = 'synth-gamelan') {
    this.init();
    if (this.isPlaying && this.currentType === type) return;
    this.stop();
    this.currentType = type;
    this.isPlaying = true;
    this.startMelodyLoop();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(type?: 'synth-gamelan' | 'synth-rindik' | 'synth-saluang' | 'synth-piano' | 'synth-acoustic' | 'synth-strings') {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play(type || (this.currentType as 'synth-gamelan'));
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private startMelodyLoop() {
    if (!this.ctx || !this.masterGain) return;

    let step = 0;

    // Scale definition based on Indonesian Traditional & Modern Themes
    // Gamelan Pelog: 1(C#4), 2(D4), 3(E4), 4(G#4), 5(A4), 6(C#5)
    const pelogFreqs = [277.18, 293.66, 329.63, 415.30, 440.00, 554.37, 587.33];
    // Rindik Bali (Slendro 5 tones): 261.63(C4), 293.66(D4), 349.23(F4), 392.00(G4), 440.00(A4)
    const rindikFreqs = [261.63, 293.66, 349.23, 392.00, 440.00, 523.25, 587.33];
    // Romantic Piano (Major Pentatonic / Arpeggios): C4, E4, G4, B4, C5, D5, E5, G5
    const pianoFreqs = [261.63, 329.63, 392.00, 493.88, 523.25, 587.33, 659.25, 783.99];
    // Flute / Saluang: F#4, A4, B4, C#5, E5, F#5
    const fluteFreqs = [369.99, 440.00, 493.88, 554.37, 659.25, 739.99];

    const beatInterval = this.currentType === 'synth-rindik' ? 240 : 420;

    const playNote = (freq: number, duration: number, type: OscillatorType = 'sine', decay: number = 1.2) => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Instrument timbre nuances
      if (this.currentType === 'synth-gamelan') {
        // Bell metallic timbre with subtle detune
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + decay * 2.0);
      } else if (this.currentType === 'synth-rindik') {
        // Bamboo marimba resonance
        gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + decay * 0.8);
      } else if (this.currentType === 'synth-saluang') {
        // Soft breathy flute
        gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      } else {
        // Piano & Acoustic strings
        gain.gain.setValueAtTime(0.28, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + decay * 1.5);
      }

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    };

    this.timerId = window.setInterval(() => {
      if (!this.isPlaying) return;

      if (this.currentType === 'synth-gamelan') {
        // Authentic Gamelan rhythm: Gong every 16 steps, Kenong every 4 steps, Saron on beats
        const saronPattern = [0, 2, 4, 3, 2, 4, 5, 4, 3, 2, 0, 1, 3, 4, 2, 0];
        const noteIdx = saronPattern[step % saronPattern.length];
        playNote(pelogFreqs[noteIdx], 1.5, 'triangle', 1.8);

        // Gong ageng bass tone on beat 0
        if (step % 16 === 0) {
          playNote(138.59, 3.5, 'sine', 3.0); // C#3 Deep Gong
        }
        // Kenong chime
        if (step % 4 === 0) {
          playNote(pelogFreqs[4] * 1.5, 2.0, 'sine', 1.5);
        }
      } else if (this.currentType === 'synth-rindik') {
        // Kotekan bamboo interlocking
        const pattern = [0, 3, 1, 4, 2, 5, 3, 6, 4, 2, 5, 1, 3, 0, 2, 4];
        const noteIdx = pattern[step % pattern.length];
        playNote(rindikFreqs[noteIdx % rindikFreqs.length], 0.6, 'sine', 0.6);
        if (step % 2 === 0) {
          playNote(rindikFreqs[(noteIdx + 2) % rindikFreqs.length], 0.8, 'triangle', 0.8);
        }
      } else if (this.currentType === 'synth-saluang') {
        // Bamboo flute melodic phrase
        const saluangNotes = [0, 1, 2, 3, 4, 3, 2, 1, 2, 4, 5, 4, 2, 0];
        const note = fluteFreqs[saluangNotes[step % saluangNotes.length]];
        playNote(note, 1.2, 'sine', 1.2);
        if (step % 4 === 0) {
          playNote(220, 2.0, 'triangle', 2.0); // drone acoustic bass
        }
      } else {
        // Romantic Piano / Acoustic Strings Arpeggio
        const pianoSeq = [0, 2, 4, 7, 5, 3, 4, 1, 0, 3, 5, 7, 6, 4, 2, 0];
        const n = pianoFreqs[pianoSeq[step % pianoSeq.length] % pianoFreqs.length];
        playNote(n, 1.4, 'sine', 1.4);
        if (step % 8 === 0) {
          playNote(130.81, 3.0, 'sine', 2.5); // C3 bass
        }
      }

      step++;
    }, beatInterval);
  }
}

export const audioEngine = new WeddingAudioEngine();
