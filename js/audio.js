// 不使用 ES modules
class MorseAudioPlayer {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.dotDuration = 60; // 基本单位时长（毫秒）
    }

    async createTone(duration) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 600; // 设置频率
        oscillator.type = 'sine';
        
        const startTime = this.audioContext.currentTime;
        oscillator.start(startTime);
        oscillator.stop(startTime + duration / 1000);

        return new Promise(resolve => {
            setTimeout(resolve, duration);
        });
    }

    async playMorse(morseCode) {
        for (const symbol of morseCode) {
            switch (symbol) {
                case '.':
                    await this.createTone(this.dotDuration);
                    await this.pause(this.dotDuration);
                    break;
                case '-':
                    await this.createTone(this.dotDuration * 3);
                    await this.pause(this.dotDuration);
                    break;
                case ' ':
                    await this.pause(this.dotDuration * 3);
                    break;
            }
        }
    }

    pause(duration) {
        return new Promise(resolve => setTimeout(resolve, duration));
    }
}

// 重要：将类暴露到全局作用域
window.MorseAudioPlayer = MorseAudioPlayer; 