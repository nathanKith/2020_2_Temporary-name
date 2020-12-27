import {backend} from '../../modules/url'

export class Swipes {
    #parent
    xStart
    yStart
    xEnd
    yEnd
    data
    timeStart
    timeEnd

    constructor(parent) {
        this.#parent = parent;
    }

    control = () => {
        if (this.#parent) {
            this.#parent.addEventListener('touchstart', this.TouchStart.bind(this));
            this.#parent.addEventListener('touchmove', this.TouchMove.bind(this));
            this.#parent.addEventListener('touchend', this.TouchEnd.bind(this));
            // this.#parent.addEventListener('mousedown', this.TouchStart.bind(this));
            // this.#parent.addEventListener('mousemove', this.TouchMove.bind(this));
            // this.#parent.addEventListener('mouseup', this.TouchEnd.bind(this));
        }

    }

    TouchStart(evt) {
        const touch = evt.touches[0];
        this.timeStart = Date.now();
        console.log('время начала');
        console.log(this.timeStart);
        this.xStart = touch.clientX;
        this.yStart = touch.clientY;
    }

    TouchMove(evt) {
        const feedSection = document.getElementsByClassName('profile-person')[0];
        const like = document.getElementById('swipe-like');
        const dislike = document.getElementById('swipe-dislike');
        const swipe = document.getElementsByClassName('like-swipe')[0];
        // if (swipe) {
        //     feedSection.removeChild(swipe);
        // }
        if (!this.xStart || !this.yStart) {
            return;
        }

        this.xEnd = evt.touches[0].clientX;
        this.yEnd = evt.touches[0].clientY;

        let xDiff = this.xEnd - this.xStart;
        // console.log(xDiff);
        let yDiff = this.yEnd - this.yStart;

        if (Math.abs(xDiff)) {
            if (xDiff < -40) {
                console.log('свайп влево');
                if ( !(like || dislike) ) {
                    feedSection.insertAdjacentHTML('afterbegin', 
                    '<img src="./../../img/cancel.svg" class="like-swipe" id="swipe-dislike">');
                } else if (like) {
                    feedSection.removeChild(like);
                    feedSection.insertAdjacentHTML('afterbegin', 
                    '<img src="./../../img/cancel.svg" class="like-swipe" id="swipe-dislike">');
                }
          
            } else if (xDiff > 40) {
                console.log('свайп вправо');

                if ( !(like || dislike) ) {
                    feedSection.insertAdjacentHTML('afterbegin', 
                    '<img src="./../../img/like.svg" class="like-swipe" id="swipe-like">');
                } else if (dislike) {
                    feedSection.removeChild(dislike);
                    feedSection.insertAdjacentHTML('afterbegin', 
                    '<img src="./../../img/like.svg" class="like-swipe" id="swipe-like">');
                }
            } else {
                if (swipe) {
                    feedSection.removeChild(swipe);
                }
            }
            this.#parent.style.transform = `translate3d(${xDiff}px, 0px, 0px)`;
        }

    }

    TouchEnd(evt) {
        this.timeEnd =  Date.now();
        console.log('время end');
        console.log(this.timeEnd);
        console.log('differ');
        console.log(this.timeEnd - this.timeStart);
        console.log('заканчивай свой свайп!');
        this.#parent.style.transform = `translate3d(0px, 0px, 0px)`;
        console.log(this.xEnd - this.xStart);
        const feedSection = document.getElementsByClassName('profile-person')[0];
        const swipe = document.getElementsByClassName('like-swipe')[0];
        if (swipe) {
            feedSection.removeChild(swipe);
        }

        if (this.timeEnd - this.timeStart > 140) {
            const diff = this.xEnd - this.xStart;
    
            if (diff < -40) {
                this.data['likeDislikeAjax'](backend.dislike);
            } else if (diff > 40) {
                this.data['likeDislikeAjax'](backend.like);
            }
        }

        this.timeStart = null;
        this.timeEnd = null;
        this.xStart = 0;
        this.yStart = null;
        this.xEnd = 0;
        this.yEnd = null;
    }
}