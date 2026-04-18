export class Sonido {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  }

  _desbloquear() {
    if (this.ctx.state === "suspended") this.ctx.resume();
  }

  disparo() {
    this._desbloquear();
    const osc = this.ctx.createOscillator();
    const gan = this.ctx.createGain();
    osc.connect(gan);
    gan.connect(this.ctx.destination);

    osc.type = "square";
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.15);

    gan.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gan.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.15);
  }
}
