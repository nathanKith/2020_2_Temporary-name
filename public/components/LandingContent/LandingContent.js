export default class LandingContent {
    #parent

    constructor(parent) {
        this.#parent = parent
    }

    render() {
        const main = document.createElement('main');
        main.classList.add('main');

        const innerDiv = document.createElement('div');
        innerDiv.classList.add('inner-main');

        innerDiv.appendChild(this.#createSpan('Find love'));
        innerDiv.appendChild(this.#createSpan('Find friends'));
        innerDiv.appendChild(this.#createSpan('Enjoy communications', 'text-heart'));
        innerDiv.appendChild(this.#createSpan('ANYTIME', 'pink-text-heart'));

        const signupLink = document.createElement('a');
        signupLink.href = '/signup';
        signupLink.dataset.section = 'signup';
        signupLink.innerHTML = 'Sign up';
        signupLink.classList.add('signup')
        innerDiv.append(signupLink);

        main.appendChild(innerDiv);

        this.#parent.appendChild(main);
    }

    #createSpan = (content, className = '') => {
        const span = document.createElement('span');
        span.innerHTML = content;

        if (className !== '') {
            span.classList.add(className);
        }

        return span;
    }
}
