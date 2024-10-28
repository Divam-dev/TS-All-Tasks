export class Modal {
    constructor(config = {
        animationDuration: 300,
        closeOnOutsideClick: true
    }) {
        this.config = config;
        this.modal = document.getElementById('myModal');
        this.modalContent = document.getElementById('modalContent');
        this.closeButton = document.getElementsByClassName('close')[0];
        this.init();
    }
    init() {
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.closeButton.onclick = () => this.hide();
        if (this.config.closeOnOutsideClick) {
            window.onclick = (event) => {
                if (event.target === this.modal) {
                    this.hide();
                }
            };
        }
    }
    show(content) {
        this.modalContent.innerHTML = content;
        this.modal.style.display = 'block';
        setTimeout(() => {
            this.modalContent.style.opacity = '1';
            this.modalContent.style.transform = 'translateY(0)';
        }, 0);
    }
    hide() {
        this.modalContent.style.opacity = '0';
        this.modalContent.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            this.modal.style.display = 'none';
        }, this.config.animationDuration);
    }
}
