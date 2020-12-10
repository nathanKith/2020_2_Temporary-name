const data = new Map([
    ['Январь', 31],
    ['Февраль',29],
    ['Март',31],
    ['Апрель',30],
    ['Май',31],
    ['Июнь', 30],
    ['Июль', 31],
    ['Август', 31],
    ['Сентябрь', 30],
    ['Октябрь',31],
    ['Ноябрь',30],
    ['Декабрь', 31],
]);

export class DateOfBirth {
    #div
    constructor() {
        this.#div = document.createElement('div');
        this.#div.classList.add('birthday');
    }

    render() {
        const month = this.createSelectMonth('month', 'Месяц', data.keys() );
        this.#div.appendChild(month);

        const day = this.createSelectDaysByMonth('day','День', data.get(month.value) );
        day.addEventListener('focus', (evt) => {
            day.innerHTML = '';
            for (let i = 0; i < data.get(month.value); ++i) {
                const option = document.createElement('option');
                const item = i + 1;
                option.value = item.toString();
                option.textContent = item.toString();
                day.appendChild(option);
            }
        });
        this.#div.appendChild(day);

        const year = this.createSelectYear('year', 'Год');
        this.#div.appendChild(year);

        return this.#div;
    }

    createSelectMonth(classSelect, name, values ) {
        const month = document.createElement('select');
        month.id = 'month';
        month.classList.add(classSelect);
        month.name = name;
        for (let item of values) {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            month.appendChild(option);
        }
        return month;
    }

    createSelectDaysByMonth(classSelect, name, month) {
        const day = document.createElement('select');
        day.id = 'day';
        day.classList.add(classSelect);
        day.name = name;
        for (let i = 0; i < month; ++i) {
            const option = document.createElement('option');
            const item = i + 1;
            option.value = item.toString();
            option.textContent = item.toString();
            day.appendChild(option);
        }
        return day;
    }

    createSelectYear (classSelect, name) {
        const year = document.createElement('select');
        year.classList.add(classSelect);
        year.name = name;
        year.id = 'year';

        for (let i = 2004; i > 1930; --i) {
            const option = document.createElement('option');
            const item = i;
            option.value = item.toString();
            option.textContent = item.toString();
            year.appendChild(option);
        }

        return year;
    }
}