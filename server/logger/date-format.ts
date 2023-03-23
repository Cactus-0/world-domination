const dateFormat = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
});

export const format = dateFormat.format.bind(dateFormat);
