import { ModalConfig } from '../types/types';

export class Modal {
    private readonly modal: HTMLElement;
    private readonly modalContent: HTMLElement;
    private readonly closeButton: HTMLElement;

    constructor(
        private readonly config: ModalConfig = {
            animationDuration: 300,
            closeOnOutsideClick: true
        }
    ) {
        this.modal = document.getElementById('myModal') as HTMLElement;
        this.modalContent = document.getElementById('modalContent') as HTMLElement;
        this.closeButton = document.getElementsByClassName('close')[0] as HTMLElement;
        this.init();
    }

    private init(): void {
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        this.closeButton.onclick = () => this.hide();

        if (this.config.closeOnOutsideClick) {
            window.onclick = (event: MouseEvent) => {
                if (event.target === this.modal) {
                    this.hide();
                }
            };
        }
    }

    public show(content: string): void {
        this.modalContent.innerHTML = content;
        this.modal.style.display = 'block';
        
        setTimeout(() => {
            this.modalContent.style.opacity = '1';
            this.modalContent.style.transform = 'translateY(0)';
        }, 0);
    }

    public hide(): void {
        this.modalContent.style.opacity = '0';
        this.modalContent.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            this.modal.style.display = 'none';
        }, this.config.animationDuration);
    }
}