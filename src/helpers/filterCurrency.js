import Fuse from 'fuse.js';

export default function filterCurrency(options) {
    const fuse = new Fuse(options, {
        keys: ['name', 'fullName', 'value'],
        threshold: 0.3
    });
    return (value) => {
        if (!value.length) {
            return options;
        }

        return fuse.search(value).map(data => data.item);
    };
}