
export class Swipes {
    #parent
    xStart
    yStart
    xEnd
    yEnd

    constructor(parent) {
        this.#parent = parent;
    }

    control = () => {
        this.#parent.addEventListener('touchstart', this.TouchStart);
        this.#parent.addEventListener('touchmove', this.TouchMove);
    }

    TouchStart(evt) {
        const touch = evt.touches[0];
        this.xStart = touch.clientX;
        this.yStart = touch.clientY;
    }

    TouchMove (evt) {
        if (!this.xStart || !this.yStart) {
            return;
        }

        this.xEnd = evt.touches[0].clientX;
        this.yEnd = evt.touches[0].clientY;

        let xDiff = this.xEnd - this.xStart;
        let yDiff = this.yEnd - this.yStart;

        if (Math.abs(xDiff)) {
            if (xDiff < 0) {
                console.log('свайп влево');
            } else {
                console.log('свайп вправо');
            }
        }

        this.xStart = null;
        this.yStart = null;
        this.xEnd = null;
        this.yEnd = null;
    }
}