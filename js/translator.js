// 主应用类：处理所有转换器相关的功能
class TranslatorApp {
    // 构造函数：初始化应用
    constructor() {
        // 创建转换器和音频播放器实例
        this.translator = new MorseTranslator();
        this.player = new MorseAudioPlayer();
        
        // 初始化DOM元素和事件绑定
        this.initElements();
        this.bindEvents();
    }

    // 初始化所有需要的DOM元素引用
    initElements() {
        // 获取输入输出文本框
        this.input = document.getElementById('input');
        this.output = document.getElementById('output');
        
        // 获取所有按钮元素
        this.translateBtn = document.getElementById('translateBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.playBtn = document.getElementById('playBtn');
        this.copyBtn = document.getElementById('copyBtn');
        
        // 获取速度控制滑块
        this.speedControl = document.getElementById('speedControl');
    }

    // 绑定所有事件处理函数
    bindEvents() {
        // 转换按钮点击事件
        this.translateBtn.addEventListener('click', () => this.translate());
        
        // 清除按钮点击事件
        this.clearBtn.addEventListener('click', () => this.clear());
        
        // 播放按钮点击事件
        this.playBtn.addEventListener('click', () => this.play());
        
        // 复制按钮点击事件
        this.copyBtn.addEventListener('click', () => this.copy());
        
        // 输入框内容变化时自动转换
        this.input.addEventListener('input', () => this.autoTranslate());
        
        // 速度控制滑块变化事件
        this.speedControl.addEventListener('input', (e) => {
            // 根据滑块值调整播放速度
            this.player.dotDuration = 60 / e.target.value;
        });
    }

    // 执行转换操作
    translate() {
        // 获取并清理输入内容
        const input = this.input.value.trim();
        if (!input) return;  // 如果输入为空，直接返回

        // 判断输入是否为摩斯密码，并进行相应转换
        this.output.value = this.translator.isMorseCode(input)
            ? this.translator.morseToText(input)    // 如果是摩斯密码，转换为文本
            : this.translator.textToMorse(input);   // 如果是文本，转换为摩斯密码
    }

    // 自动转换功能（带防抖）
    autoTranslate() {
        // 清除之前的定时器
        clearTimeout(this._timeout);
        // 设置新的定时器，300ms后执行转换
        this._timeout = setTimeout(() => this.translate(), 300);
    }

    // 清除输入和输出内容
    clear() {
        this.input.value = '';
        this.output.value = '';
    }

    // 播放摩斯密码声音
    async play() {
        // 如果没有输出内容，直接返回
        if (!this.output.value) return;
        
        // 禁用播放按钮，防止重复点击
        this.playBtn.disabled = true;
        // 播放摩斯密码声音
        await this.player.playMorse(this.output.value);
        // 播放完成后启用按钮
        this.playBtn.disabled = false;
    }

    // 复制输出内容到剪贴板
    async copy() {
        try {
            // 尝试复制文本到剪贴板
            await navigator.clipboard.writeText(this.output.value);
            alert('已复制到剪贴板');
        } catch (err) {
            // 如果复制失败，在控制台输出错误
            console.error('复制失败:', err);
        }
    }
}

// 当DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', function() {
    // 创建应用实例
    new TranslatorApp();
}); 